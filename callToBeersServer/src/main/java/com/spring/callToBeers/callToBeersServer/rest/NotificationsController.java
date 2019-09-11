package com.spring.callToBeers.callToBeersServer.rest;

import java.net.URI;
import java.net.URISyntaxException;

import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.spring.callToBeers.callToBeersServer.domain.NotificationRequest;

@RestController
public class NotificationsController {

	@PostMapping
	public void sendNotification(@RequestBody NotificationRequest request) throws URISyntaxException {
		RestTemplate restTemplate = new RestTemplate();
	     
	    final String baseUrl = "http://localhost:80/employees/";
	    URI uri = new URI(baseUrl);
	     
//	    Employee employee = new Employee(null, "Adam", "Gilly", "test@email.com");
	    HttpHeaders headers = new HttpHeaders();
	    headers.set("X-COM-PERSIST", "true");   
	    headers.set("X-COM-LOCATION", "USA");     
	 
//	    HttpEntity<Employee> request = new HttpEntity<>(employee, headers);
	 
//	    ResponseEntity<String> result = restTemplate.postForEntity(uri, employee, String.class);
	}
}
