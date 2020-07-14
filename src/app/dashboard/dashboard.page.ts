import { Component, OnInit } from '@angular/core';
import { MyRestCallServiceService } from './../my-rest-call-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';
import { Login, Register } from './../login';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  dashboardCoreInfo;
  constructor(private service: MyRestCallServiceService,
    private af: AngularFireAuth, 
    private afs: AngularFirestore,
    public alert: AlertController,
    private route: Router) { }

  ngOnInit() {
    this.service.getReturnGeoCalls().subscribe((x) => {
      console.log(x)
    });
    // console.log(this.dashboardCoreInfo);
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
