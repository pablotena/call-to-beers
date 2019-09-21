import { Component } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public httpClient: HttpClient, public alertController: AlertController, private storageService: StorageService) {}

  sendNotification() {

    this.storageService.get("suscripcion").then(result => {
      if (result != null) {
        const url = 'http://192.168.1.84:8080/sendNotification';
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        };
    
        var body = {
          'topicId' : result
        };

        this.httpClient.post(url, body, httpOptions).subscribe();

        this.presentAlert();
      }
    }).catch(e => {
      console.log("error");
    });    
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Notificación enviada',
      message: '¡Se ha enviado la notificación!',
      buttons: ['Perfecto']
    });

    await alert.present();
  }
}
