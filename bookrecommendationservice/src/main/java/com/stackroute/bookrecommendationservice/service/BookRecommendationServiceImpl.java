package com.stackroute.bookrecommendationservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.stackroute.bookrecommendationservice.model.Recommendation;
import com.stackroute.bookrecommendationservice.repository.BookRecommendationRepository;

@Service
public class BookRecommendationServiceImpl implements BookRecommendationService {

	private BookRecommendationRepository bookRecommendationRepository;

	@Autowired
	public BookRecommendationServiceImpl(BookRecommendationRepository bookRecommendationRepository) {
		this.bookRecommendationRepository = bookRecommendationRepository;
	}

	@Override
	public Recommendation findByBookID(String bookID) {
		return bookRecommendationRepository.findByBookID(bookID);
	}

	@Override
	public List<Recommendation> findAll() {
		Sort sort = new Sort(Sort.Direction.DESC, "recommendationCount");
		return bookRecommendationRepository.findAll(sort);
	}

	@Override
	public Recommendation saveRecommendation(Recommendation recommendation) {
		return bookRecommendationRepository.insert(recommendation);
	}

	@Override
	public Recommendation findByBookTitle(String bookTitle) {
		return bookRecommendationRepository.findByBookTitle(bookTitle);
	}

	@Override
	public void deleteByBookID(String bookID) {
		bookRecommendationRepository.deleteById(bookID);
		
	}

}
