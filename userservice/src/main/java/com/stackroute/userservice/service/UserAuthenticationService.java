package com.stackroute.userservice.service;

import com.stackroute.userservice.exception.UserAlreadyExistsException;
import com.stackroute.userservice.exception.UserNotFoundException;
import com.stackroute.userservice.model.User;

public interface UserAuthenticationService {

    	/*
	 * Should not modify this interface. You have to implement these methods in
	 * corresponding Impl classes
	 */

    boolean saveUser(User user) throws UserAlreadyExistsException;

    public User findByEmailAndPassword(String email, String password) throws UserNotFoundException;
}
