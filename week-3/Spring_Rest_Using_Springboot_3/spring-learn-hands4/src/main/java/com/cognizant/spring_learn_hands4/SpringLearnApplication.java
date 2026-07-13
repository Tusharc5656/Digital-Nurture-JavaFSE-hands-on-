package com.cognizant.spring_learn_hands4;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SpringLearnApplication {

	private static final Logger LOGGER = LoggerFactory.getLogger(SpringLearnApplication.class);

	public static void displayCountry() {

		ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");

		Country country = context.getBean("country", Country.class);

		LOGGER.debug("Country : {}", country);

		((ClassPathXmlApplicationContext) context).close();
	}

	public static void main(String[] args) {

		displayCountry();

	}
}