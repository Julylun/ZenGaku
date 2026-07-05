FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn -Dmaven.test.skip=true clean package

FROM tomcat:10.1-jdk21-temurin

RUN rm -rf /usr/local/tomcat/webapps/*

COPY --from=build /app/target/ZenGaku_Full-0.1-EarlyAccess.war /usr/local/tomcat/webapps/ZenGaku.war

EXPOSE 8080
