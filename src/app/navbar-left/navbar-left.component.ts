import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar-left',
  templateUrl: './navbar-left.component.html',
  styleUrls: ['./navbar-left.component.scss']
})
export class NavbarLeftComponent {
  drawer = true;
  currentUserId;
  messages;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(this.route.params);
      this.currentUserId = params['id'];
    });

      this.firestore.collection('users').doc(this.currentUserId).valueChanges().subscribe((user: any) => {
        this.messages = user.messages;
        console.log(this.messages);
      });
  }
}
