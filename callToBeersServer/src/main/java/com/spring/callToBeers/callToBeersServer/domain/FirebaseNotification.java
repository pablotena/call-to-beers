package com.spring.callToBeers.callToBeersServer.domain;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonAlias;

public class FirebaseNotification implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Notificacion notification;
	private NotificationData data;
	private String to;
	private String priority;
	
	@JsonAlias("restricted_package_name")
	private String restrictedPackageName;

	public Notificacion getNotification() {
		return notification;
	}

	public void setNotification(Notificacion notification) {
		this.notification = notification;
	}

	public NotificationData getData() {
		return data;
	}

	public void setData(NotificationData data) {
		this.data = data;
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public String getRestrictedPackageName() {
		return restrictedPackageName;
	}

	public void setRestrictedPackageName(String restrictedPackageName) {
		this.restrictedPackageName = restrictedPackageName;
	}

	@Override
	public String toString() {
		return String.format(
				"NotificationFirebase [notification=%s, data=%s, to=%s, priority=%s, restrictedPackageName=%s]",
				notification, data, to, priority, restrictedPackageName);
	}

}
