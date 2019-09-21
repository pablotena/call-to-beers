package com.spring.callToBeers.callToBeersServer.rest;

import java.net.URI;
import java.net.URISyntaxException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.spring.callToBeers.callToBeersServer.constants.CallToBeersConstants;
import com.spring.callToBeers.callToBeersServer.domain.FirebaseNotification;
import com.spring.callToBeers.callToBeersServer.domain.Notificacion;
import com.spring.callToBeers.callToBeersServer.domain.NotificationData;
import com.spring.callToBeers.callToBeersServer.domain.NotificationRequest;

@RestController
@CrossOrigin(origins="*")
public class NotificationsController {

	private Logger logger = LoggerFactory.getLogger(getClass());
	
	@Value("${ionic.notification.key}")
	private String notificationKey;
	
	@PostMapping
	public void sendNotification(@RequestBody NotificationRequest request) throws URISyntaxException {
		RestTemplate restTemplate = new RestTemplate();
	     
	    final String baseUrl = "https://fcm.googleapis.com/fcm/send";
	    URI uri = new URI(baseUrl);
	     
	    FirebaseNotification notification = buildFirebaseNotification(request.getTopicId());
	    
	    HttpHeaders headers = new HttpHeaders();
	    headers.set("Content-Type", "application/json");   
	    headers.set("Authorization", "key="+notificationKey);     
	 
	    HttpEntity<FirebaseNotification> requestPost = new HttpEntity<>(notification, headers);
	 
	    ResponseEntity<String> result = restTemplate.postForEntity(uri, requestPost, String.class);
	    
	    logger.info(Integer.toString(result.getStatusCodeValue()));
	}
	
	private FirebaseNotification buildFirebaseNotification(Integer topicId) {
		
FirebaseNotification notification = new FirebaseNotification();
	    
	    Notificacion notificationChild = new Notificacion();
	    notificationChild.setTitle(CallToBeersConstants.TITLE);
	    notificationChild.setBody(String.format(CallToBeersConstants.BODY, CallToBeersConstants.BEER_LIST.get(topicId)));
	    notificationChild.setSound(CallToBeersConstants.SOUND);
	    notificationChild.setClick_action(CallToBeersConstants.CLICK_ACTION);
	    notificationChild.setIcon(CallToBeersConstants.ICON);
	    
	    notification.setNotification(notificationChild);
	    
	    NotificationData data = new NotificationData();
	    data.setLanding_page(CallToBeersConstants.LANDING);
	    
	    notification.setData(data);
	    
	    notification.setTo(CallToBeersConstants.TO+topicId);
	    notification.setPriority(CallToBeersConstants.PRIORITY);
	    notification.setRestrictedPackageName(CallToBeersConstants.PACKAGE);
	    
	    return notification;
	}
}
