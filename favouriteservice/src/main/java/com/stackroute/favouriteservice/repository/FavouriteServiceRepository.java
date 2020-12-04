package com.stackroute.favouriteservice.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.favouriteservice.model.Book;

@Repository
public interface FavouriteServiceRepository extends MongoRepository<Book, String>  {
//	public List<Book> findByUsername(String username);
	
	public List<Book> findAllBooksByUsername(String username);

	public List<Book> findByUsernameAndBookID(String username,String bookId);
}
