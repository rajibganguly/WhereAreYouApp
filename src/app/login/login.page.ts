import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';
import { Login, Register } from './../login';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginPage: boolean = true;
  regPage: boolean = false;
  loginForm: FormGroup;
  registerForm: FormGroup;
  validation_messages = {
    'password': [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Password must be at least 8 characters long.' },
        { type: 'maxlength', message: 'Password cannot be more than 32 characters long.' },
        { type: 'pattern', message: 'Your password must contain only numbers, letters and special cherector.' }
      ],
    'phonenumber': [
        { type: 'required', message: 'Phone number is required.' },
        { type: 'minlength', message: 'Phone number must be at least 10 characters long.' },
        { type: 'maxlength', message: 'Phone number cannot be more than 10 characters long.' },
        { type: 'pattern', message: 'This phone number not correct.' },
        { type: 'validUsername', message: 'This phone number has already been taken.' }
      ],
    'emailid': [
        { type: 'required', message: 'Email id is required.' },
        { type: 'pattern', message: 'Your email is not valid email, please check.' }
      ],
    'confirmpassword': [
      { type: 'required', message: 'Confirm Password is required.' },
      { type: 'pattern', message: 'Confirm Password is not matched with password' }
    ]
  }

  constructor(
    private fb: FormBuilder, 
    private af: AngularFireAuth, 
    private afs: AngularFirestore,
    public alert: AlertController,
    private route: Router) {
    this.loginForm = this.fb.group({
      emailId: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')
      ])],
      password: ['', Validators.compose([
        Validators.maxLength(32),
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$') //this is for the letters (both uppercase and lowercase) and numbers validation
     ])]
    });

    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      emailId: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')
      ])],
      phoneNumber: ['', Validators.compose([
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$'),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.maxLength(32),
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$') //this is for the letters (both uppercase and lowercase) and numbers validation
     ])],
      confirmPassword: ['', Validators.compose([
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$'),
        Validators.required
      ])]
    })
   }

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

  
  // tabs on footer
  loginTab() {
    this.loginPage = true;
    this.regPage = false;
  }

  regTab() {   
    this.regPage = true; 
    this.loginPage = false;    
  }

  // login form
  loginFormValue() {
    const loginVerify = {
      emailid: this.loginForm.value.emailId,
      password: this.loginForm.value.password
    }
    this.af.signInWithEmailAndPassword(loginVerify.emailid, loginVerify.password).then(
      (success) => {
        sessionStorage.setItem('token', success.user.refreshToken);
        this.route.navigate(['/dashboard']);
      }
    ).catch(
      (error) => {
        this.presentAlert('Messages', error.message)
      }
    )
  }

  // Registration form
  registerFormValue() {
    const register = {
      fullname: this.registerForm.value.fullName,
      emailid: this.registerForm.value.emailId,
      phonenumber: this.registerForm.value.phoneNumber,
      password: this.registerForm.value.password,
      confirmpassword: this.registerForm.value.confirmPassword
    }
    const userDetails = {
      fullname: register.fullname,
      emailid: register.emailid,
      phonenumber: register.phonenumber,
    };
    localStorage.setItem('userdetails', JSON.stringify(userDetails));
    this.af.createUserWithEmailAndPassword(register.emailid, register.password);
    location.reload();
    this.route.navigate(['/login']);
  }

  signoutAction() {
    this.af.signOut().then((success) => {
      this.presentAlert('Signout', 'You are logout. Please login again.')
    })
  }

}
