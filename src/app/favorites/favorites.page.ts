import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  constructor(
    private af: AngularFireAuth, 
    private afs: AngularFirestore,
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  // alert function
  async presentAlert(header, messages) {
    const alert = await this.alert.create({
      cssClass: 'alert-class',
      header: header,
      message: messages,
      buttons: ['CLOSE']
    });

    await alert.present();
  }

  signoutAction() {
    this.af.signOut().then((success) => {
      this.presentAlert('Signout', 'You are logout. Please login again.')
    })
  }

}
