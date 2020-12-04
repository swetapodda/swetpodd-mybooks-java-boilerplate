package com.stackroute.favouriteservice.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.integration.support.MessageBuilder;
import org.springframework.messaging.MessageChannel;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.favouriteservice.exception.BookAlreadyAddedException;
import com.stackroute.favouriteservice.exception.BookNotFoundException;
import com.stackroute.favouriteservice.model.Book;
import com.stackroute.favouriteservice.service.FavouriteService;
import com.stackroute.favouriteservice.source.FavouriteServiceSource;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/*
 * As in this assignment, we are working with creating RESTful web service, hence annotate
 * the class with @RestController annotation.A class annotated with @Controller annotation
 * has handler methods which returns a view. However, if we use @ResponseBody annotation along
 * with @Controller annotation, it will return the data directly in a serialized 
 * format. Starting from Spring 4 and above, we can use @RestController annotation which 
 * is equivalent to using @Controller and @ResposeBody annotation
 */

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/v1")
@EnableBinding(FavouriteServiceSource.class)
public class FavouriteServiceController {

	FavouriteService favouriteService;

	private MessageChannel greet;

	@Autowired
	FavouriteServiceSource favouriteServiceSource;

	@Autowired
	FavouriteServiceController(FavouriteService favouriteService) {
		this.favouriteService = favouriteService;
	}

	@ApiOperation(value = "Add Book to Favourites. (Note: Message will be posted to RabbitMQ Server for external Micro Service to increase Recommendation Count) ", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 201, message = "Returns Created Book Object"),
			@ApiResponse(code = 409, message = "If Could not Insert into Favourties") })

	@PostMapping("/addFavourite")
	public ResponseEntity<?> addToFavourite(@RequestBody Book book) {

//	@RequestHeader Map<String,String> headers,
//		headers.forEach((key,value) ->{
//	            System.out.println("Header Name: "+key+" Header Value: "+value);
//	        });
		Book insertBook = null;
		List<Book> favouriteList = null;
		System.out.println(":::::::: " + book);
		try {
			favouriteList = this.favouriteService.findAllBooksByUsername(book.getUsername());
			if (null != favouriteList && favouriteList.size() > 0) {
				for (Book favourite2 : favouriteList) {
					if (favourite2.getBookID().equalsIgnoreCase(book.getBookID())) {
						return new ResponseEntity<String>("Already, added in your favourite list.", HttpStatus.CONFLICT);
					}
				}
			}
			insertBook = favouriteService.addBookToFavourateList(book);
			// Add Queue Code Here..
			if(null !=insertBook) {
				boolean isMsgSend = favouriteServiceSource.addToFavourite()
						.send(MessageBuilder.withPayload(insertBook).build());
				HttpHeaders headers = new HttpHeaders();
				return new ResponseEntity<Book>(insertBook, headers, HttpStatus.CREATED);
			}else {
				HttpHeaders headers = new HttpHeaders();
				return new ResponseEntity<Book>(book, headers, HttpStatus.BAD_REQUEST);
			}

		} catch (BookAlreadyAddedException | BookNotFoundException e) {
			return new ResponseEntity<Book>(insertBook, HttpStatus.CONFLICT);
		}
	}

	// Swagger -API Documentation - Injection-Starts

	@ApiOperation(value = "Returns all Favourtes Books of the Logged In User. ", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Returns List of Books (Favourite Books)"),
			@ApiResponse(code = 409, message = "If No Favouite Book found") })

	// Swagger -API Documentation - Injection-Ends

	@GetMapping("/favourite/{username}")
	public ResponseEntity<List<Book>> findAllFavourateBooksByUserId(@PathVariable("username") String username) {
		HttpHeaders headers = new HttpHeaders();
		List<Book> favouriteList = new ArrayList<Book>();
		try {
			favouriteList = this.favouriteService.findAllBooksByUsername(username);
//			System.out.println(favouriteList);
			if (null != favouriteList && favouriteList.size() > 0) {
				headers.add("Total Favourate Articles Found: ", String.valueOf(favouriteList.size()));
				return new ResponseEntity<List<Book>>(favouriteList, headers, HttpStatus.OK);
			} else {
				return new ResponseEntity<List<Book>>(favouriteList, headers, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<List<Book>>(favouriteList, headers, HttpStatus.NOT_FOUND);
		}
	}

	@ApiOperation(value = "Remove Books from Favourites.", response = ResponseEntity.class)
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Returns Sucecss message if successfully removed from favouirtes List"),
			@ApiResponse(code = 409, message = "Failure message if could not remove from favourites. ") })
	@DeleteMapping("/favourite/{username}/{bookID}")
	public ResponseEntity<?> deleteFavourateBook(@PathVariable("username") String username,
			@PathVariable("bookID") String bookID) {
		HttpHeaders headers = new HttpHeaders();
		boolean isDeleted = Boolean.FALSE;
		try {
			isDeleted = this.favouriteService.deleteFavouriteBook(username, bookID);
			// System.out.println("isDeleted:::::::: " + isDeleted);
		} catch (Exception e) {
			return new ResponseEntity<>(isDeleted, headers, HttpStatus.OK);
		}
		return new ResponseEntity<>(isDeleted, headers, HttpStatus.OK);
	}

}
