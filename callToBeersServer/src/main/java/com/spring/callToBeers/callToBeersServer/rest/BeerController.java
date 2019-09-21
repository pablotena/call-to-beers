package com.spring.callToBeers.callToBeersServer.rest;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.callToBeers.callToBeersServer.bo.BeerService;

@RestController
@CrossOrigin(origins="*")
public class BeerController {

	@Autowired
	BeerService beerService;
	
	@GetMapping("/getBeerLists")
	public Map<Integer,String> getBeerLists(){
		return beerService.getBeerList();
	}
}
