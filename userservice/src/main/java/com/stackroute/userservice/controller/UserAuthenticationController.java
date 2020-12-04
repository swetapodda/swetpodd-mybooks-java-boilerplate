
package com.stackroute.userservice.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.userservice.exception.UserAlreadyExistsException;
import com.stackroute.userservice.exception.UserNotFoundException;
import com.stackroute.userservice.model.User;
import com.stackroute.userservice.service.UserAuthenticationService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/*
 * As in this assignment, we are working on creating RESTful web service, hence annotate
 * the class with @RestController annotation. A class annotated with the @Controller annotation
 * has handler methods which return a view. However, if we use @ResponseBody annotation along
 * with @Controller annotation, it will return the data directly in a serialized 
 * format. Starting from Spring 4 and above, we can use @RestController annotation which 
 * is equivalent to using @Controller and @ResposeBody annotation
 * 
 * @CrossOrigin,@EnableFeignClients,@RibbonClient
 * 
 */
@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/v1/auth")
public class UserAuthenticationController {

	String BEARER_KEY = "BEARER_KEY:";
	String SECRET_KEY="SecretKey";
	/*
	 * Autowiring should be implemented for the UserAuthenticationService. (Use
	 * Constructor-based autowiring) Please note that we should not create an object
	 * using the new keyword
	 */

	@Autowired
	UserAuthenticationService service;

	public UserAuthenticationController(UserAuthenticationService authicationService) {
		this.service = authicationService;
	}

	/*
	 * Define a handler method which will create a specific user by reading the
	 * Serialized object from request body and save the user details in the
	 * database. This handler method should return any one of the status messages
	 * basis on different situations: 1. 201(CREATED) - If the user created
	 * successfully. 2. 409(CONFLICT) - If the userId conflicts with any existing
	 * user
	 * 
	 * This handler method should map to the URL "/api/v1/auth/register" using HTTP
	 * POST method
	 */
	@ApiOperation(value = "Will create a User by reading the object from request body and save the User object in database", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 201, message = "On successful creation of User."),
			@ApiResponse(code = 409, message = "In case of duplicate User") })
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody User user) {
		try {
			user.setUserAddedDate(new Date());
			service.saveUser(user);
			return new ResponseEntity<String>("Uer is created Successfully", HttpStatus.CREATED);
		} catch (UserAlreadyExistsException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}

	/*
	 * Define a handler method which will authenticate a user by reading the
	 * Serialized user object from request body containing the username and
	 * password. The username and password should be validated before proceeding
	 * ahead with JWT token generation. The user credentials will be validated
	 * against the database entries. The error should be return if validation is not
	 * successful. If credentials are validated successfully, then JWT token will be
	 * generated. The token should be returned back to the caller along with the API
	 * response. This handler method should return any one of the status messages
	 * basis on different situations: 1. 200(OK) - If login is successful 2.
	 * 401(UNAUTHORIZED) - If login is not successful
	 * 
	 * This handler method should map to the URL "/api/v1/auth/login" using HTTP
	 * POST method
	 */
	@ApiOperation(value = "Authenticate user by email and Password", response = ResponseEntity.class)
	@ApiResponses(value = {
			@ApiResponse(code = 201, message = "If user is successfully authenticated, and returns JWT Token"),
			@ApiResponse(code = 409, message = "If user authentication is failed") })
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user) {
		HttpHeaders headers = new HttpHeaders();
		try {
			User existingUser = service.findByEmailAndPassword(user.getEmail(), user.getPassword());
			existingUser.setPassword("XXXXXXX");
			Map map = new HashMap<String, Object>();
			map.put("JWT_TOKEN", getToken(user.getEmail(), user.getPassword()));
			map.put("USER_DATA", existingUser);

			return new ResponseEntity(map,headers, HttpStatus.OK);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(),headers, HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(),headers, HttpStatus.UNAUTHORIZED);
		}
	}

	// Generate JWT token
	public String getToken(String userId, String password) throws Exception {
		return Jwts.builder().setId(userId).setSubject(password).setIssuedAt(new Date())
				.signWith(SignatureAlgorithm.HS256, "secretkey").compact();

	}

	// Swagger -API Documentation - Injection-Starts
	@ApiOperation(value = "Validate given JWT Token set in Header Authorization . ", response = ResponseEntity.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "If the JWT Token is Valid"),
			@ApiResponse(code = 403, message = "If the JWT Token is InValid/Forbidden") })
	// Swagger -API Documentation - Injection-Starts

	@PostMapping("/isAuthenticated")
	public ResponseEntity<?> isAuthenticated(@RequestHeader("Authorization") String jwtTokenArg) {
		if (jwtTokenArg != null) {
			String jwtToken = jwtTokenArg.substring(BEARER_KEY.length());
			System.out.println("JWT Token:" + jwtToken);
			try {
				Claims claims = this.isValidJwt(jwtToken);
				HashMap<String, Object> map = new HashMap<>();
				map.clear();
				map.put("claims", claims);
				map.put("isAuthenticated", true);
				return new ResponseEntity<>(map, HttpStatus.OK);
			} catch (Exception e) {
				//log.error("Error Occured while validating JWT Token", e);
				return new ResponseEntity<>("Invalid Token", HttpStatus.FORBIDDEN);
			}
		} else {
			return new ResponseEntity<>("Invalid Token", HttpStatus.FORBIDDEN);
		}

	}

	
	private Claims isValidJwt(String jwtToken) {
		Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(jwtToken).getBody();
		System.out.println("Claims:" + claims);
		return claims;
	}

}
