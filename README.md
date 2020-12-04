# MyBooks - A Case Study

## Problem Statement

Build a system to search for a book title, show results, add books to favourite list and recommend most liked/favourite books to user.

## Requirements

1. The application needs to fetch book details from the following Open Library API.
https://openlibrary.org/developers/api

Refer the following URLs to explore more on the Books open library APIs.
https://openlibrary.org/dev/docs/api/search
https://openlibrary.org/dev/docs/api/books

2. A frontend where the user can register/login to the application, search books by string, title or author, get books details, add book to favourite list and view recommended books.
  - On launching the application the user should get the login page. The login page should have a link for registration using which the user should be able to register. On successful registration the user should be taken to the login page. Upon login, the user should be taken to the home page.
  - Proper navigation links for all the pages should be available within pages.
  - Error handling should be implemented across pages. Appropriate messages should be    displayed for the same. Success messages should be displayed for the User Registration.
  - Logout feature should be implemented.

3. User can add a book to favourite list and should be able to view the favourite list.

4. A recommendation service should be able to store all the unique favourite books from all the users and maintain counter for number of users added a particular book into favourite list.Any book added to the Favourites should be consumed by the Recommendation service using the Rabbit-MQ messaging service.

5. An option to view recommended books should be available on frontend. 

## Microservices/Modules
- UI (User interface) -  should be able to
    - Search a book by string, title or author
    - View book details
    - Add a book to favourite list
    - should be able to view favourite books
    - should be able to view recommended books
    - UI should be responsive which can run smoothly on various devices 
    - UI is appealing and user friendly.

- UserService - should be able to manage user accounts.
- FavouriteService - should be able to store and retrieve all the favourite books for a user
- BookRecommendationService - should be able to store all the unique favourite books from all the users and maintain counter for number of users added a particular book into favourite list.

## Tech Stack
- Spring Boot
- MySQL, MongoDB
- Zuul API Gateway
- Eureka Server
- Message Broker (RabbitMQ)
- Angular
- CI (Gitlab Runner)
- Docker, Docker Compose

## Flow of Modules

### Building frontend:
  1. Building responsive views:
  - Register/Login
  - Search for a book
  - Book list - populating from external API
  - Build a view to show favourite books
  - Build a view to show recommended books
  2. Using Services to populate these data in views
  3. Stitching these views using Routes and Guards
  4. Making the UI Responsive
  5. Unit Tests should be created for the Components and Services
  6. E2E scripts using protractor should be created for the functional flows
  7. Implement CI - continuous Integration ( use .gitlab-ci.yml)
  8. Dockerize the frontend (create dockerfile, docker-compose.yml and get it executed through docker compose)

### Note: FrontEnd and all the backend services should be dockerized and run through docker-compose

### Building the UserService
  1. Creating a server in Spring Boot to facilitate user registration and login with MySQL as backend. Upon login, JWT token has to be generated. It has to be used in the Filters set in other services.
  2. Writing swagger documentation
  3. Unit Testing of the entire code which involves the positive and negative scenarios
  4. Implement continuous Integration CI ( use .gitlab-ci.yml)
  5. Dockerize the UserService (create dockerfile, docker-compose.yml and get it executed through docker compose)

### Create an API Gateway (Zuul) which can serve UI and API Request from same host. 

### Apply JWT Authentication in the API Gateway for all the incoming requests

### Building the Favourite Service
  1. Building a server in Spring Boot to facilitate CRUD operation over favourite books    stored in MongoDB
  2. Writing Swagger Documentation
  3. Build a Producer for RabbitMQ which
    i. Produces events like what user added to favourite list
  4. Write Unit Test Cases and get it executed.
  5. Implement CI - continuous Integration ( use .gitlab-ci.yml)
  6. Dockerize the service(create dockerfile and update the docker-compose.yml)

### Building the Book Recommendation Service
  1. Building a Consumer for RabbitMQ
      - On a new event generated update the recommendations in the system. Store the        recommendation list in MongoDB.
      - Maintain list of unique recommended books based on what user added into             favourite list and keep counter for number of users added a particular book         into favourite list
  2. Build an API to get Recommendations
  3. Writing Swagger Documentation
  4. Write Unit Test Cases and get it executed.
  5. Implement CI - continuous Integration ( use .gitlab-ci.yml)
  6. Dockerize the service(create dockerfile and update the docker-compose.yml)
  7. Update the API Gateway

### Create Eureka server and make other services as client

### Demonstrate the entire application
    1. Make sure all the functionalities are implemented
    2. Make sure both the UI (Component and Services) and server side (For all layers) codes are unit tested. 
    3. All the Services are up and running using docker (Dockercompose should be used for running them)
    4. Eureka server should be running and all the required services are registered and started
    5. Rabbit-MQ service should be running ( check whether exchanges are created)
    6. E2E tests should have been created and can be executed successfully
    7. Application is completely responsive in nature