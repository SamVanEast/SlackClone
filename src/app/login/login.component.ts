import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {Router} from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { user } from 'src/models/user';
import { Observable } from 'rxjs';



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

  constructor(private router: Router, private firestore: AngularFirestore) {
    this.user = user;
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  allUser = [];

  matcher = new MyErrorStateMatcher();
  hide = true;
  newUser = false;
  reset = false;
  pushNewUser = false;
  toggle = false;
  userId: string;
  user;

  

  // Var for create user
  @ViewChild('password') password:ElementRef;
  @ViewChild('passwordRepeat') passwordRepeat:ElementRef;
  @ViewChild('userFirstName') userFirstName:ElementRef;
  @ViewChild('userLastName') userLastName:ElementRef;
  @ViewChild('userMail') userMail:ElementRef;
  @ViewChild('phoneNumber') phoneNumber:ElementRef;

  // Var for Login 
  @ViewChild('loginEmail') loginEmail:ElementRef;
  @ViewChild('loginPassword') loginPassword:ElementRef;

  // var for reset Password
  @ViewChild('resetPw') resetPw:ElementRef;
  @ViewChild('resetPwRepeat') resetPwRepeat:ElementRef;
  @ViewChild('resetEmail') resetEmail:ElementRef;

  // var for push text 
 



  ngOnInit() {
    this.firestore.collection('users').valueChanges({ idField: 'docId' }).subscribe((user: any) => {
      this.allUser = user;
      console.log(user)
    });

  }


  generateUserDoc() {

    if(this.password.nativeElement.value == this.passwordRepeat.nativeElement.value) {

      	this.firestore.collection('users').add(this.user).then((user) => {
        
      })
      this.pushNewUser = true;
      this.newUser = false;
      setTimeout(()=>{
            this.pushNewUser = false;
          }, 3000);
      }else {
        this.toggle = true;
        setTimeout(()=> {
          this.toggle = false;
        }, 3000);
      }
}



  

  guestLogin() {
    this.router.navigateByUrl('/')
  }

   UserLogin() {
   let inputPassword = this.loginPassword.nativeElement.value
    let inputEmail = this.loginEmail.nativeElement.value 

      for (let i = 0; i < this.allUser.length; i++) {
        const email = this.allUser[i]['userInfos']['email'];
        const password = this.allUser[i]['userInfos']['password'];

        if(email === inputEmail && password === inputPassword) {
          this.router.navigateByUrl('/')
        } else {
          this.toggle = true;
      setTimeout(()=>{
        this.toggle = false;
      }, 3000);
        }      
    }  
   }

   resetPassword() {
    let inputEmail = this.resetEmail.nativeElement.value

    for (let i = 0; i < this.allUser.length; i++) {
      const email = this.allUser[i]['userInfos']['email'];
      const id = this.allUser[i]['docId'];
      
      if(inputEmail === email){
        this.changePassword(id);
      } else if (i === this.allUser.length - 1){
        alert('Email Doesnt exist')
      }  
    }
   }

   changePassword(id: string) {
    let password = this.resetPw.nativeElement.value;
    let repPassword = this.resetPwRepeat.nativeElement.value;

    if(password === repPassword){
      this.firestore.collection('users').doc(id).update({
        'userInfos.password': this.resetPw.nativeElement.value,});
    } else {
      this.toggle = true;
      setTimeout(()=> {
        this.toggle = false;
      }, 3000);
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



}
