package com.stackroute.favouriteservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.favouriteservice.exception.BookAlreadyAddedException;
import com.stackroute.favouriteservice.exception.BookNotFoundException;
import com.stackroute.favouriteservice.model.Book;
import com.stackroute.favouriteservice.repository.FavouriteServiceRepository;

@Service
public class FavouriteServiceImpl implements FavouriteService {

	private FavouriteServiceRepository bookRepository;

	@Autowired
	public FavouriteServiceImpl(FavouriteServiceRepository bookRepository) {
		this.bookRepository = bookRepository;
	}

	@Override
	public Book addBookToFavourateList(Book favourite) throws BookAlreadyAddedException {
		
		String tempBookID = favourite.getBookID();
		//System.out.println(tempBookID);
		if(tempBookID!=null && !tempBookID.isEmpty() ) {
			String strArr[] = tempBookID.split("/");
			if(strArr.length>0){
//				System.out.println(strArr[strArr.length-1]);
				favourite.setBookID(strArr[strArr.length-1]);
			}
			favourite.setFavouriteBookId(favourite.getUsername().concat("_").concat(favourite.getBookID()));
			return bookRepository.insert(favourite);
		}
		return null;
		
	}

	@Override
	public boolean deleteFavouriteBook(String username, String bookId) throws BookNotFoundException {
		try {
			String favId = username.concat("_").concat(bookId);
			System.out.println("favId");
			bookRepository.deleteById(favId);
			return true;
		} catch (Exception e) {
			throw new BookNotFoundException("Unknown Book");
		}
	}

	@Override
	public List<Book> findAllBooksByUsername(String username) throws BookNotFoundException {
		return bookRepository.findAllBooksByUsername(username);
	}

}
