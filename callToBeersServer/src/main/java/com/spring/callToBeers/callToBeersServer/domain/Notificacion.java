package com.spring.callToBeers.callToBeersServer.domain;

import java.io.Serializable;

public class Notificacion implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String title;
	private String body;
	private String sound;
	private String click_action;
	private String icon;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public String getSound() {
		return sound;
	}

	public void setSound(String sound) {
		this.sound = sound;
	}

	public String getClick_action() {
		return click_action;
	}

	public void setClick_action(String click_action) {
		this.click_action = click_action;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	@Override
	public String toString() {
		return String.format("Notificacion [title=%s, body=%s, sound=%s, click_action=%s, icon=%s]", title, body, sound,
				click_action, icon);
	}

}
