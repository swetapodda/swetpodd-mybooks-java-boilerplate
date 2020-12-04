package com.stackroute.userservice.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.userservice.exception.UserAlreadyExistsException;
import com.stackroute.userservice.exception.UserNotFoundException;
import com.stackroute.userservice.model.User;
import com.stackroute.userservice.repository.UserAutheticationRepository;

/*
* Service classes are used here to implement additional business logic/validation 
* This class has to be annotated with @Service annotation.
* @Service - It is a specialization of the component annotation. It doesn't currently 
* provide any additional behavior over the @Component annotation, but it's a good idea 
* to use @Service over @Component in service-layer classes because it specifies intent 
* better. Additionally, tool support and additional behavior might rely on it in the 
* future.
* */

@Service

public class UserAuthenticationServiceImpl implements UserAuthenticationService {

    /*
	 * Autowiring should be implemented for the UserAuthenticationRepository. (Use
	 * Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword.
	 */

	@Autowired
	UserAutheticationRepository repository;

	public UserAuthenticationServiceImpl(UserAutheticationRepository repository) {
		this.repository = repository;
	}

     /*
	 * This method should be used to validate a user using userId and password.
	 *  Call the corresponding method of Respository interface.
	 * 
	 */
    @Override
    public User findByEmailAndPassword(String email, String password) throws UserNotFoundException {

		User user = repository.findByEmailAndPassword(email, password);
		if (user == null) {
			throw new UserNotFoundException("Username Or Password doesnot exists.");
		}
		return user;
	}


	/*
	 * This method should be used to save a new user.Call the corresponding method
	 * of Respository interface.
	 */

    @Override
    public boolean saveUser(User user) throws UserAlreadyExistsException {
       
		Optional<User> optional=repository.findById(user.getEmail());
		if(optional.isPresent()){
			throw new UserAlreadyExistsException("User already Exists");
		}
		repository.save(user);
		return Boolean.TRUE;
    }

	
}
