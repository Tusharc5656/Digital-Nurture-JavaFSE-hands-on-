package com.cognizant.spring_learn.service;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;
import com.cognizant.spring_learn.Country;
import com.cognizant.spring_learn.exception.CountryNotFoundException;

@Service
public class CountryService {

	private static final Logger LOGGER = LoggerFactory.getLogger(CountryService.class);

	@SuppressWarnings("unchecked")
	public Country getCountry(String code) throws CountryNotFoundException {
		LOGGER.info("Inside getCountry() service method with code: {}", code);

		// Get country list from country.xml
		ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");
		List<Country> countries = (List<Country>) context.getBean("countryList");

		// Iterate through the country list using lambda expression and match case insensitively
		Country country = countries.stream()
				.filter(c -> c.getCode().equalsIgnoreCase(code))
				.findFirst()
				.orElseThrow(() -> {
					LOGGER.error("Country with code '{}' not found.", code);
					return new CountryNotFoundException("Country with code " + code + " not found");
				});

		// Close context to release resources
		((ClassPathXmlApplicationContext) context).close();

		return country;
	}
}
