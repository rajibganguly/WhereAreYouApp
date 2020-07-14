import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import html2canvas from 'html2canvas';

const { Camera } = Plugins;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit, AfterViewInit {
  photos: SafeResourceUrl;
  allImages;
  tim;

  imgValDraw;
  imgVal;  
  image1;
  image2;
  image = new Image();
  compositeImage;

  @ViewChild('canvasId') canvasEl: ElementRef;
  

  constructor(
    private sanitize: DomSanitizer,
    private af: AngularFireAuth, 
    private afs: AngularFirestore,
    public alert: AlertController ) {
      
    this.allImages = [
      {
        name: 'Logo',
        source: './assets/img/logo2.png'
      },
      {
        name: 'WHO',
        source: './assets/img/WHO.png'
      },
      {
        name: 'KFC',
        source: './assets/img/KFC.png'
      }
    ]
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.loadCompeteImage();
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


 // Photo function
  async takeAPicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    })
    this.imgVal = image.dataUrl;
    // this.photos = this.sanitize.bypassSecurityTrustResourceUrl(value: image && (image.dataUrl));
    // this.photos = this.sanitize.bypassSecurityTrustUrl(ValueAccessor);
    // console.log(this.imgVal);

  }

  changeImg(x) {
    // console.log(x.detail.value.source);
    this.imgValDraw = x.detail.value.source;
    this.image1 = this.imgValDraw;
  }

  loadCompeteImage() {
    // const element = this.canvasEl.nativeElement;
    // html2canvas(element, { allowTaint : true }).then((canvas) =>
    // {
    //   const context = canvas.getContext('2d');
    //   const img = new Image();
    //   img.src = this.image1;
    //   const photo = new Image();
    //   photo.src = this.imgVal;
    //   context.drawImage(photo, 0, 0);
    //   context.drawImage(img, 10, 10);
    //   context.font = "12px Arial";
    //   this.tim = new Date().toString();
    //   context.fillText(this.tim, 5, 5);
      
    //   const imagica = canvas.toDataURL('image/jpeg', 1.0);
    //   console.log(imagica);
    // })
  }

  signoutAction() {
    console.log('test');
    // this.af.signOut().then((success) => {
    //   this.presentAlert('Signout', 'You are logout. Please login again.')
    // })
  }

  



}
