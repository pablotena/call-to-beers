import { Component } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public httpClient: HttpClient) {}

  sendNotification() {
    const url = 'https://fcm.googleapis.com/fcm/send';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'key=ID'
      })
    };

    var notification = {
      "notification": {
          "title": "Ionic 4 Notification",
          "body": "This notification sent from POSTMAN using Firebase HTTP protocol",
          "sound": "default",
          "click_action": "FCM_PLUGIN_ACTIVITY",
          "icon": "fcm_push_icon"
      },
      "data": {
          "landing_page": "home"
      },
      "to": "/topics/1",
      "priority": "high",
      "restricted_package_name": ""
    };

    this.httpClient.post(url, notification, httpOptions).subscribe();
  }
}
