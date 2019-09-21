package com.spring.callToBeers.callToBeersServer.bo;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.spring.callToBeers.callToBeersServer.constants.CallToBeersConstants;

@Service
public class BeerService {

	public Map<Integer, String> getBeerList() {

		return CallToBeersConstants.BEER_LIST;
	}
}
