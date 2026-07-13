package com.cognizant.spring_learn_hands4;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Country {

	private static final Logger LOGGER = LoggerFactory.getLogger(Country.class);

	private String code;
	private String name;

	// Empty Constructor
	public Country() {
		LOGGER.debug("Inside Country Constructor.");
	}

	// Getter for Code
	public String getCode() {
		LOGGER.debug("Inside getCode()");
		return code;
	}

	// Setter for Code
	public void setCode(String code) {
		LOGGER.debug("Inside setCode()");
		this.code = code;
	}

	// Getter for Name
	public String getName() {
		LOGGER.debug("Inside getName()");
		return name;
	}

	// Setter for Name
	public void setName(String name) {
		LOGGER.debug("Inside setName()");
		this.name = name;
	}

	@Override
	public String toString() {
		return "Country [code=" + code + ", name=" + name + "]";
	}
}