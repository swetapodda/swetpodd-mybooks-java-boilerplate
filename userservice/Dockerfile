FROM java:8-jre
WORKDIR usr/src/

# My SQL Property need to set in Docker Compose file

ADD ./target/userservice-1.0.jar /usr/src/userservice-1.0.jar
ENTRYPOINT ["java","-jar","userservice-1.0.jar"]

