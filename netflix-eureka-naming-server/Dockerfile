FROM java:8-jre
WORKDIR usr/src/

# My SQL Property need to set in Docker Compose file

ADD ./target/netflix-eureka-naming-server-1.0.jar /usr/src/netflix-eureka-naming-server-1.0.jar
ENTRYPOINT ["java","-jar","netflix-eureka-naming-server-1.0.jar"]

