package com.spring.callToBeers.callToBeersServer.rest;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BeerController {

	@GetMapping("/getBeerLists")
	public Map<Integer,String> getBeerLists(){
		Map<Integer,String> beerlists = new HashMap<>();
		
		beerlists.put(1, "Jerez");
		beerlists.put(2, "Huelva");
		beerlists.put(3, "Barcelona");
		beerlists.put(4, "Madrid");
		beerlists.put(5, "A Coruña");
		beerlists.put(6, "Milán");
		beerlists.put(7, "Palma de Mallorca");
		beerlists.put(8, "Zaragoza");
		
		
		return beerlists;
	}
}
