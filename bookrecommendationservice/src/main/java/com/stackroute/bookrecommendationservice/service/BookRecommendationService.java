package com.stackroute.bookrecommendationservice.service;

import java.util.List;

import com.stackroute.bookrecommendationservice.model.Recommendation;

public interface BookRecommendationService {

	public Recommendation findByBookID(String bookID);

	public List<Recommendation> findAll();

	public Recommendation saveRecommendation(Recommendation recommendation);

	public Recommendation findByBookTitle(String bookID);

	public void deleteByBookID(String bookID);

}
