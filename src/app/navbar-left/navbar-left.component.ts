import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { collection, doc, Firestore, getFirestore } from '@firebase/firestore';
import { from, Observable } from 'rxjs';
import { user } from 'src/models/user';

@Component({
  selector: 'app-navbar-left',
  templateUrl: './navbar-left.component.html',
  styleUrls: ['./navbar-left.component.scss']
})
export class NavbarLeftComponent {
  drawer = true;
  currentUserId;
  messagesFromFirebase$: Observable<any>;
  public messages;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) {
    this.messages = user.messages
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.currentUserId = params['id'];
    });

    this.firestore.collection('users').doc(this.currentUserId).valueChanges().subscribe((user: any) => {
      this.messages = user.messages;
      console.log(this.messages);
    });

    console.log(this.messages);

  }


  async loadMessagesFromFirestore() {
    await this.firestore.collection('users').doc(this.currentUserId).valueChanges().subscribe((user: any) => {
      this.messages = user.messages;
      // console.log(this.messages);
    });
  }
}
