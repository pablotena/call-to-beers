import { Component, OnInit } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.page.html',
  styleUrls: ['./sites.page.scss'],
})
export class SitesPage implements OnInit {

  public items: Array<any>;
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

  ngOnInit() {
    this.items = [
      { title: 'Jerez' },
      { title: 'Madrid' },
      { title: 'Barcelona' },
      { title: 'Sevilla' }
    ];
  }

  subscribeToTopic(item) {
    alert("Te has suscrito a " + item.title);
    this.fcm.subscribeToTopic('enappd');
  }

  getToken() {
    this.fcm.getToken().then(token => {
      // Register your new token in your back-end if you want
      // backend.registerToken(token);
    });
  }

  unsubscribeFromTopic(item) {
    alert("Te has desuscrito de " + item.title);
    this.fcm.unsubscribeFromTopic('enappd');
  }

}
