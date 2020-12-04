package com.stackroute.favouriteservice.source;

import org.springframework.cloud.stream.annotation.Output;
import org.springframework.messaging.MessageChannel;


public interface FavouriteServiceSource {
	@Output("addToFavouriteChannel")
	MessageChannel addToFavourite();
}
