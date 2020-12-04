package com.stackroute.userservice.jwtfilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.GenericFilterBean;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

/* This class implements the custom filter by extending org.springframework.web.filter.GenericFilterBean.  
 * Override the doFilter method with ServletRequest, ServletResponse and FilterChain.
 * This is used to authorize the API access for the application.
 */

public class JwtFilter extends GenericFilterBean {

	/*
	 * Override the doFilter method of GenericFilterBean. Retrieve the
	 * "authorization" header from the HttpServletRequest object. Retrieve the
	 * "Bearer" token from "authorization" header. If authorization header is
	 * invalid, throw Exception with message. Parse the JWT token and get claims
	 * from the token using the secret key Set the request attribute with the
	 * retrieved claims Call FilterChain object's doFilter() method
	 */
	
	public static List<String> excludeURI = new ArrayList<>();

	static {
		generateExclueURIs();
	}
	
	public static void generateExclueURIs() {
		//addEndSlash("/api/v1/auth/");
		addEndSlash("/api/v1/auth/login");
		addEndSlash("/api/v1/auth/register");
		addEndSlash("/api/v1/auth/isAuthenticated");
	}

	public static void addEndSlash(String arg) {
		excludeURI.add(arg.toLowerCase());
		excludeURI.add(arg.toLowerCase() + "/");
	} 
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;

		String auth_key = "AUTHORIZATION";
		final String authHeader = req.getHeader(auth_key);
		String requestURI = req.getRequestURI();
		System.out.println(requestURI.toLowerCase());
		System.out.println(authHeader);
//		System.out.println(excludeURI.contains(requestURI.toLowerCase()));
		if (excludeURI.contains(requestURI.toLowerCase())) {// Exclude UnAuthorized URLs. For ex: / should return
			System.out.println("Inside Exclude URI");											// "Service Info"
			chain.doFilter(req, res);
		}else {
		if ("OPTIONS".equals(req.getMethod())) {
			res.setStatus(HttpServletResponse.SC_OK);
			chain.doFilter(req, res);
		} else {
			if (authHeader == null || !authHeader.startsWith("BEARER_KEY: ")) {
				System.out.println("Inside authHeader check..");
				String errorMessage = "Authorization Header is Missing, Please Login again.";
				((HttpServletResponse) response).setHeader("X-Error-Message", errorMessage);
				((HttpServletResponse) response).sendError(HttpServletResponse.SC_FORBIDDEN, errorMessage);
			}else {
				final String token = authHeader.split(":")[1];
				final Claims claims = Jwts.parser().setSigningKey("secretkey").parseClaimsJws(token).getBody();
				request.setAttribute("claims", claims);
				chain.doFilter(req, res);
			}		
		}
	}
	}

	
}
