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
  

  allUser: any = [{
    name:  "John",
    email: "leo@web.de",
    password: "123"
  }]


  @ViewChild('password') password:ElementRef;
  @ViewChild('userName') userName:ElementRef;
  @ViewChild('userMail') userMail:ElementRef;





  guestLogin() {
    this.router.navigateByUrl('/')
  }

  NewUserOverview() {
    this.newUser = true;
  }

  showLogin() {
    this.newUser = false;
  }

  createNewUser() {
    
    this.allUser.push({
    'name': this.userName.nativeElement.value, 
    'email': this.userMail.nativeElement.value,
    'password': this.password.nativeElement.value });
  }


}
