package com.spring.callToBeers.callToBeersServer.domain;

import java.io.Serializable;

public class NotificationRequest implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7020524548307009435L;
	
	private String mobileID;
	private Integer listID;

	public String getMobileID() {
		return mobileID;
	}

	public void setMobileID(String mobileID) {
		this.mobileID = mobileID;
	}

	public Integer getListID() {
		return listID;
	}

	public void setListID(Integer listID) {
		this.listID = listID;
	}

	@Override
	public String toString() {
		return String.format("NotificationRequest [mobileID=%s, listID=%s]", mobileID, listID);
	}

}
