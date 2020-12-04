package com.stackroute.favouriteservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Book {

	@Id
	private String favouriteBookId;
	private String username;
	private String bookTitle;
	private String bookID;
	private String bookURL;
	private String bookGenre;
	private String bookAuthor;

	public Book() {
		super();
	}

	public Book(String favouriteBookId, String username, String bookTitle, String bookID, String bookURL,String bookGenre,String bookAuthor) {

		this.favouriteBookId = favouriteBookId;
		this.username = username;
		this.bookTitle = bookTitle;
		this.bookID = bookID;
		this.bookURL = bookURL;
		this.bookGenre = bookGenre;
		this.setBookAuthor(bookAuthor);
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

	public String getFavouriteBookId() {
		return favouriteBookId;
	}

	public void setFavouriteBookId(String favouriteBookId) {
		this.favouriteBookId = favouriteBookId;
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
				"Book [favouriteBookId=%s, username=%s, bookTitle=%s, bookID=%s, bookURL=%s, bookGenre=%s, bookAuthor=%s]",
				favouriteBookId, username, bookTitle, bookID, bookURL, bookGenre, bookAuthor);
	}
}
