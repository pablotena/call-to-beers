package com.spring.callToBeers.callToBeersServer.domain;

import java.io.Serializable;

public class NotificationRequest implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7020524548307009435L;
	
	private Integer topicId;


	public Integer getTopicId() {
		return topicId;
	}

	public void setetTopicId(Integer topicId) {
		this.topicId = topicId;
	}

	@Override
	public String toString() {
		return String.format("NotificationRequest [topicId=%s]", topicId);
	}

}
