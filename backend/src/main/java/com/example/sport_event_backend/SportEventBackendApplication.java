package com.example.sport_event_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class SportEventBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SportEventBackendApplication.class, args);
	}

}
