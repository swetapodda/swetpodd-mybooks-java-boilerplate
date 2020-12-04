FROM java:8-jre
WORKDIR usr/src
EXPOSE 8079
ADD ./target/netflix-zuul-api-gateway-server-1.0.jar /usr/src/netflix-zuul-api-gateway-server-1.0.jar
ENTRYPOINT ["java", "-jar", "netflix-zuul-api-gateway-server-1.0.jar"]