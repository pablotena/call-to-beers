package com.spring.callToBeers.callToBeersServer.domain;

import java.io.Serializable;

public class NotificationData implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String landing_page;

	public String getLanding_page() {
		return landing_page;
	}

	public void setLanding_page(String landing_page) {
		this.landing_page = landing_page;
	}

	@Override
	public String toString() {
		return String.format("NotificationData [landing_page=%s]", landing_page);
	}

}
