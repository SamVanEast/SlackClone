import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {Router} from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router) {}

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
  hide = true;
  newUser = false;
  reset = false;
  pushNewUser = false;
  

  allUser: any = [{
    name:  "John",
    email: "leo@web.de",
    password: "123"
  }]


  // Var for create user
  @ViewChild('password') password:ElementRef;
  @ViewChild('userName') userName:ElementRef;
  @ViewChild('userMail') userMail:ElementRef;

  // var for Userlogin
  @ViewChild('loginEmail') loginEmail:ElementRef;
  @ViewChild('loginPassword') loginPassword:ElementRef;

  // var for push text 
 



  guestLogin() {
    this.router.navigateByUrl('/')
  }

  UserLogin() {
    let inputPassword = this.loginPassword.nativeElement.value
    let inputEmail = this.loginEmail.nativeElement.value 

      for (let i = 0; i < this.allUser.length; i++) {
        const email = this.allUser[i]['email'];
        const password = this.allUser[i]['password'];

        if(email === inputEmail && password === inputPassword) {
          this.router.navigateByUrl('/')
        } else {
          alert('wrong email or wrong password')
        }
        
      
    }  
  }

  resetOverview() {
    this.reset = true;
  }

  NewUserOverview() {
    this.newUser = true;
  }

  showLogin() {
    this.newUser = false;
    this.reset = false;
  }

  createNewUser() { 
    this.pushNewUser = true;
    this.newUser = false;

    setTimeout(()=>{
      this.pushNewUser = false;

    }, 3000);
    
    this.allUser.push({
    'name': this.userName.nativeElement.value, 
    'email': this.userMail.nativeElement.value,
    'password': this.password.nativeElement.value });

      
  }



}
