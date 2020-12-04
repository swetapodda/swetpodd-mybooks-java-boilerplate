package com.stackroute.favouriteservice.service;

import java.util.List;

import com.stackroute.favouriteservice.exception.BookAlreadyAddedException;
import com.stackroute.favouriteservice.exception.BookNotFoundException;
import com.stackroute.favouriteservice.model.Book;

public interface FavouriteService {

	public List<Book> findAllBooksByUsername(String username) throws BookNotFoundException;

	public boolean deleteFavouriteBook(String username, String bookID)  throws BookNotFoundException ;

	public Book addBookToFavourateList(Book favourite) throws BookAlreadyAddedException;
}
