package com.spring.callToBeers.callToBeersServer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableAutoConfiguration
@SpringBootApplication
public class CallToBeersServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CallToBeersServerApplication.class, args);
	}

}
