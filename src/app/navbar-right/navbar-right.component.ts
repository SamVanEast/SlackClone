import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar-right',
  templateUrl: './navbar-right.component.html',
  styleUrls: ['./navbar-right.component.scss']
})
export class NavbarRightComponent implements OnInit{
  userId: string;
  public firstName;
  public lastName;
  public email;
  public phone;
  currentUserId;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentUserId = params['id'];
  
    this.firestore.collection('users').doc(this.currentUserId).valueChanges().subscribe((user:any) => {
      console.log(user);
      this.firstName = user.userInfos.firstName;
      this.lastName = user.userInfos.lastName;
      this.email = user.userInfos.email;
      this.phone = user.userInfos.phone;
    });
  });
  }
}
