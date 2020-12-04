FROM java:8-jre
WORKDIR usr/src/

# My SQL Property need to set in Docker Compose file

ADD ./target/bookrecommendationservice-1.0.jar /usr/src/bookrecommendationservice-1.0.jar
ENTRYPOINT ["java","-jar","bookrecommendationservice-1.0.jar"]

