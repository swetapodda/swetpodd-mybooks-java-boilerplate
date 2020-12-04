package com.stackroute.bookrecommendationservice.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
//import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.bookrecommendationservice.model.Recommendation;
import com.stackroute.bookrecommendationservice.service.BookRecommendationService;
import com.stackroute.bookrecommendationservice.source.RecommendationServiceSource;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/v1")
@EnableBinding(RecommendationServiceSource.class)
public class BookRecommendationController {

	private BookRecommendationService bookRecommendationService;

	@Autowired
	private RecommendationServiceSource recommendationServiceSource;

	@Autowired
	public BookRecommendationController(BookRecommendationService bookRecommendationService) {
		this.bookRecommendationService = bookRecommendationService;
	}

	@ApiOperation(value = "Returns all Recomeneded Books based on Favourites Count.  ", response = ResponseEntity.class)
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "Returns all Favourites Book Recomendation. If no favourites added then this will be empty") })

	@GetMapping("/recommended")
	public ResponseEntity<List<Recommendation>> getRecommendationList() {
		HttpHeaders headers = new HttpHeaders();
		List<Recommendation> recommendatedList = new ArrayList<Recommendation>();
		try {
			recommendatedList = bookRecommendationService.findAll();
			if (null != recommendatedList && recommendatedList.size() > 0) {
				headers.add("Total Recommendate Articles Found: ", String.valueOf(recommendatedList.size()));

				return new ResponseEntity<List<Recommendation>>(recommendatedList, headers, HttpStatus.OK);
			} else {
				return new ResponseEntity<List<Recommendation>>(recommendatedList, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<List<Recommendation>>(recommendatedList, HttpStatus.NOT_FOUND);
		}
	}

	@StreamListener(target = RecommendationServiceSource.CHANNEL)
	public void addBookToRecommendation(Recommendation recommendation) {
		// System.out.println("recommendation::::::::::\t " + recommendation);
		Recommendation recommendationDB = this.bookRecommendationService.findByBookTitle(recommendation.getBookTitle());
		// System.out.println("recommendationDB ::::::::::\t " + recommendationDB);
		if (null != recommendationDB && recommendationDB.getRecommendationCount() > 0) {
			this.bookRecommendationService.deleteByBookID(recommendationDB.getRecommendedBookId());
			recommendationDB.setRecommendationCount(recommendationDB.getRecommendationCount() + 1);
			this.bookRecommendationService.saveRecommendation(recommendationDB);
		} else {
			recommendation.setRecommendationCount(1);
			this.bookRecommendationService.saveRecommendation(recommendation);
		}
	}

}
