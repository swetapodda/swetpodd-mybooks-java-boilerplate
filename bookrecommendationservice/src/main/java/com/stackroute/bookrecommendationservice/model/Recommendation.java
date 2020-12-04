package com.stackroute.bookrecommendationservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Recommendation {

	@Id
	private String recommendedBookId;
	private String username;
	private String bookTitle;
	private String bookID;
	private String bookURL;
	private String bookGenre;
	private String bookAuthor;
	private int recommendationCount;

	public Recommendation() {
		super();
	}

	public Recommendation(String recommendedBookId, String username, String bookTitle, String bookID, String bookURL,String bookGenre,String bookAuthor) {

		this.recommendedBookId = recommendedBookId;
		this.username = username;
		this.bookTitle = bookTitle;
		this.bookID = bookID;
		this.bookURL = bookURL;
		this.bookGenre = bookGenre;
		this.bookAuthor = bookAuthor;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getBookGenre() {
		return bookGenre;
	}

	public void setBookGenre(String bookGenre) {
		this.bookGenre = bookGenre;
	}

	public String getBookTitle() {
		return bookTitle;
	}

	public void setBookTitle(String bookTitle) {
		this.bookTitle = bookTitle;
	}

	public String getBookID() {
		return bookID;
	}

	public void setBookID(String bookID) {
		this.bookID = bookID;
	}

	public String getBookURL() {
		return bookURL;
	}

	public void setBookURL(String bookURL) {
		this.bookURL = bookURL;
	}

	public String getRecommendedBookId() {
		return recommendedBookId;
	}

	public void setRecommendedBookId(String recommendedBookId) {
		this.recommendedBookId = recommendedBookId;
	}

	public int getRecommendationCount() {
		return recommendationCount;
	}

	public void setRecommendationCount(int recommendationCount) {
		this.recommendationCount = recommendationCount;
	}
	
	public String getBookAuthor() {
		return bookAuthor;
	}

	public void setBookAuthor(String bookAuthor) {
		this.bookAuthor = bookAuthor;
	}

	@Override
	public String toString() {
		return String.format(
				"Recommendation [recommendedBookId=%s, username=%s, bookTitle=%s, bookID=%s, bookURL=%s, bookGenre=%s, bookAuthor=%s, recommendationCount=%s]",
				recommendedBookId, username, bookTitle, bookID, bookURL, bookGenre, bookAuthor, recommendationCount);
	}

}
