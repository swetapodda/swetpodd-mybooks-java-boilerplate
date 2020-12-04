package com.stackroute.bookrecommendationservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.common.base.Predicate;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
import static springfox.documentation.builders.PathSelectors.regex;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
	private static final String API_NAME = "Recommendation Service API";
	private static final String PACKAGE_SCAN = "com.stackroute.bookrecommendationservice.controller";

	/*
	 * Annotate this method with @Bean . This method will return an Object of
	 * Docket. This method will implement logic for swaggers
	 */
	@Bean
	public Docket productApi() {
		return new Docket(DocumentationType.SWAGGER_2).select().apis(RequestHandlerSelectors.basePackage(PACKAGE_SCAN))
				.paths(PathSelectors.any()).build().apiInfo(apiMetaInfo());
	}

	private ApiInfo apiMetaInfo() {
		return new ApiInfoBuilder().title(API_NAME).description("Recommendation Service for Book API")
				.termsOfServiceUrl("http://in.ibm.com").contact("swetpodd@in.ibm.com").license("@IBM License")
				.licenseUrl("swetpodd@in.ibm.com").version("1.0").build();
	}

	private Predicate<String> postPath() {
		return regex("/api/");
	}
}