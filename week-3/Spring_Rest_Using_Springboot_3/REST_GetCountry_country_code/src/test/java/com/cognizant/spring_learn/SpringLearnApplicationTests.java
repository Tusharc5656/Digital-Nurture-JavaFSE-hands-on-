package com.cognizant.spring_learn;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class SpringLearnApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Test
	void contextLoads() {
	}

	@Test
	void testGetCountrySuccess() throws Exception {
		mockMvc.perform(get("/countries/IN"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.code").value("IN"))
				.andExpect(jsonPath("$.name").value("India"));
	}

	@Test
	void testGetCountryCaseInsensitive() throws Exception {
		mockMvc.perform(get("/countries/in"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.code").value("IN"))
				.andExpect(jsonPath("$.name").value("India"));
	}

	@Test
	void testGetCountryNotFound() throws Exception {
		mockMvc.perform(get("/countries/XYZ"))
				.andExpect(status().isNotFound());
	}
}
