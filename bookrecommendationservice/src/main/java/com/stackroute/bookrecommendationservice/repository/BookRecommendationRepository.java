package com.stackroute.bookrecommendationservice.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.stackroute.bookrecommendationservice.model.Recommendation;

@Repository
public interface BookRecommendationRepository extends MongoRepository<Recommendation, String> {

	public Recommendation findByBookID(String bookID);

	public Recommendation findByBookTitle(String bookTitle);

	@Query("{ 'recommendationCount': ?0}")
	public List<Recommendation> findAll();

	public void deleteByBookID(String bookID);
}