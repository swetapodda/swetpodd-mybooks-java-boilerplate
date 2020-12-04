package com.stackroute.bookrecommendationservice.source;

import org.springframework.cloud.stream.annotation.Input;
import org.springframework.messaging.SubscribableChannel;


public interface RecommendationServiceSource {
	
	String CHANNEL = "addToFavouriteChannel";
	
	@Input(CHANNEL)
	SubscribableChannel getFromFavourite();
}
