import { Component, OnInit } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.page.html',
  styleUrls: ['./sites.page.scss'],
})
export class SitesPage implements OnInit {

  public items: any;
  public sitesList: any;
  pushes: any = [];
  
  constructor(private storageService: StorageService, private fcm: FCM, public plt: Platform, public httpClient: HttpClient) {
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
    this.getListSites();
  }

  getListSites() {
    var url = "http://calltobeer:8080/getBeerLists";
    
    this.httpClient.get(url).subscribe(response => {
      this.items = response;

      Object.entries(this.items).forEach(([key, value]) => {
        this.storageService.get("suscripcion" + key).then(result => {
          if (result != null) {
            document.getElementById("subButton" + result).innerHTML = "Desuscribirse de " + this.items[result];
          }
        }).catch(e => {
          console.log("error");
        });    
      });

    });
  }

  subunsubfunction(item) {
    this.storageService.get("suscripcion" + item.key).then(result => {
      if (result != null) {
        this.unsubscribeFromTopic(item);
      }
      else {
        this.subscribeToTopic(item);
      }
    }).catch(e => {
      console.log("error");
    });
  }

  subscribeToTopic(item) {
    
    this.storageService.set("suscripcion" + item.key, item.key).then(result => {

      console.log("Suscripción guardada");
      document.getElementById("subButton" + item.key).innerHTML = "Desuscribirse de " + item.value;
      document.getElementById("subButton" + item.key).style.background = "red";

      this.fcm.subscribeToTopic(item.key);
      alert("Te has suscrito a " + item.value);

    }).catch(e => {
      console.log("error: " + e);
    });
      
  }

  getToken() {
    this.fcm.getToken().then(token => {
      // Register your new token in your back-end if you want
      // backend.registerToken(token);
    });
  }

  unsubscribeFromTopic(item) {

    this.storageService.remove("suscripcion" + item.key);
    document.getElementById("subButton" + item.key).innerHTML = "Suscribirse a " + item.value;
    alert("Te has desuscrito de " + item.value);

    this.fcm.unsubscribeFromTopic(item.key);
  }

}
