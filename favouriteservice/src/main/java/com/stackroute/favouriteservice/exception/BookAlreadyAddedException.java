package com.stackroute.favouriteservice.exception;

public class BookAlreadyAddedException extends Exception {
	
	private static final long serialVersionUID = 1L;

	public BookAlreadyAddedException(String message) {
        super(message);
    }
}
