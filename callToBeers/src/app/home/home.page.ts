import { Component } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pushes: any = [];
  constructor(private fcm: FCM, public plt: Platform, public httpClient: HttpClient) {
    this.plt.ready()
      .then(() => {
        this.fcm.onNotification().subscribe(data => {
          if (data.wasTapped) {
            console.log("Received in background");
          } else {
            alert("Received in foreground");
            console.log("Received in foreground");
          };
        });

        this.fcm.onTokenRefresh().subscribe(token => {
          // Register your new token in your back-end if you want
          // backend.registerToken(token);
        });
      })
  }
  subscribeToTopic() {
    this.fcm.subscribeToTopic('enappd');
  }
  getToken() {
    this.fcm.getToken().then(token => {
      // Register your new token in your back-end if you want
      // backend.registerToken(token);
    });
  }
  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('enappd');
  }

  sendNotification() {
    const url = 'https://fcm.googleapis.com/fcm/send';
    this.getFcmKey();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'key=AAAAAyfKrFw:APA91bEtIRek3BldTRF7iEIgIsXVsM00UL3JBzS01wfpxAJAPhdWoazn1ui2hj2Re6DlsuLTbxas4WF-DvJhYV1mI8ReEb4I5ClmdcLA8lqrFuyd4WDWV9vTjJomUKrYY4S3WENCBBal'
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
      "to": "/topics/enappd",
      "priority": "high",
      "restricted_package_name": ""
    };

    this.httpClient.post(url, notification, httpOptions).subscribe();
  }

  getFcmKey() {
    alert(this.httpClient.get('./local/fcm_key').subscribe(data => data["results"]));
  }
}
