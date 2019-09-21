import { Component, OnInit } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.page.html',
  styleUrls: ['./sites.page.scss'],
})
export class SitesPage implements OnInit {

  public items: any;
  public sitesList: any;
  pushes: any = [];
  subText = "Suscribirse a ";
  unSubText = "Desuscribirse de ";
  subscribedText = "Te has suscrito a ";
  unSubscribedText = "Te has desuscrito de ";
  
  constructor(public alertController: AlertController,  public httpClient: HttpClient, private storageService: StorageService, private fcm: FCM, public plt: Platform) {
    this.plt.ready()
      .then(() => {
        this.fcm.onNotification().subscribe(data => {
          if (data.wasTapped) {
            console.log("Received in background");
          } else {
            this.presentAlert('Notificación recibida', 'Acabas de recibir una notificación de tu suscripción');
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
    var url = "http://192.168.1.84:8080/getBeerLists";
    
    this.httpClient.get(url).subscribe(response => {
      this.items = response;

      this.storageService.get("suscripcion").then(result => {
        if (result != null) {
          this.setTextToElementById("subButton" + result, this.unSubText + this.items[result]);
        }
      }).catch(e => {
        console.log("error");
      });    

    });
  }

  subunsubfunction(item) {
    this.storageService.get("suscripcion").then(result => {
      if (result != null) {

        if (result != item.key) {

          var oldItem = {
            'key' : result,
            'value' : this.items[result]
          };

          // Sub to the new one.
          this.unsubscribeFromTopic(oldItem);
          this.subscribeToTopic(item);
        }
        else {
          this.unsubscribeFromTopic(item);
        }
      }
      else {
        this.subscribeToTopic(item);
      }
    }).catch(e => {
      console.log("error");
    });
  }

  subscribeToTopic(item) {
    
    this.storageService.set("suscripcion", item.key).then(result => {

      console.log("Suscripción guardada");
      this.setTextToElementById("subButton" + item.key, this.unSubText + item.value);

      this.fcm.subscribeToTopic(item.key);
      this.presentAlert('Operación realizada', this.subscribedText + item.value);

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

    this.storageService.remove("suscripcion");
    this.setTextToElementById("subButton" + item.key, this.subText + item.value);

    this.fcm.unsubscribeFromTopic(item.key);
    this.presentAlert('Operación realizada' ,this.unSubscribedText + item.value);
  }

  // ****************************************
  // Generic functions
  // ****************************************

  setTextToElementById(id, text) {
    document.getElementById(id).innerHTML = text;
  }

  async presentAlert(title, text) {
    const alert = await this.alertController.create({
      header: title,
      message: text,
      buttons: ['Vale']
    });

    await alert.present();
  }


}
