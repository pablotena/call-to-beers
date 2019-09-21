package com.spring.callToBeers.callToBeersServer.constants;

import java.util.HashMap;
import java.util.Map;

public class CallToBeersConstants {

	private CallToBeersConstants() {}
	
	public static final Map<Integer, String> BEER_LIST = new HashMap<Integer, String>() {
		/**
		 * 
		 */
		private static final long serialVersionUID = 1L;

		{
			put(1, "Jerez");
			put(2, "Huelva");
			put(3, "Barcelona");
			put(4, "Madrid");
			put(5, "A Coruña");
			put(6, "Milán");
			put(7, "Palma de Mallorca");
			put(8, "Zaragoza");
		}
	};

	public static final String TITLE = "Acude a la llamada";
	public static final String BODY = "En la oficina de %s van a ir a tomar cervezas. ¿Te apuntas?";
	public static final String SOUND = "default";
	public static final String CLICK_ACTION = "FCM_PLUGIN_ACTIVITY";
	public static final String ICON = "fcm_push_icon";
	public static final String LANDING = "home";
	public static final String TO= "/topics/";
	public static final String PRIORITY = "high";
	public static final String PACKAGE = "";
	
}
