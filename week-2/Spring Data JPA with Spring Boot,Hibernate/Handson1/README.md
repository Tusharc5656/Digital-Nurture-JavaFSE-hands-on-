Spring Data JPA - Handson 1
A quick demo project for using Spring Data JPA with Hibernate and MySQL.

🛠️ Tech Stack
Java 19
Spring Boot 2.7.5
MySQL 8.0
Maven
Hibernate JPA
🚀 Steps to Run
Create Project:
Use Spring Initializr
Group: com.cognizant
Artifact: orm-learn
Add dependencies: Spring Boot DevTools, Spring Data JPA, MySQL Driver
Set Up Database:
sql
create schema ormlearn;
use ormlearn;
create table country (code varchar(2) primary key, name varchar(50));
insert into country values ('IN', 'India'), ('US', 'United States of America');
Update application.properties:

properties

spring.datasource.url=jdbc:mysql://localhost:3306/ormlearn
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL5Dialect
Create Classes:

Country entity (@Entity, @Table)

CountryRepository extends JpaRepository

CountryService with getAllCountries() method

Update OrmLearnApplication.java:

Get CountryService bean from context

Call and log result from testGetAllCountries()

Run App:

bash

mvn spring-boot:run