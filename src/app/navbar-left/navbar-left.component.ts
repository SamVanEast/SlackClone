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
  cannels

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) {
    this.messages = user.messages
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.currentUserId = params['id'];
    });



    // const db = getFirestore();
    // const colRef = collection(db, 'todos'); 
    // this.messagesFromFirebase$ = collectionData(colRef);

    // this.messagesFromFirebase$.subscribe((message) => {
    //   console.log(message);
    // })


    // const docRef = doc(db, "channels", "REz7mkotTOrDEP60d4YQ");
    // const myDocRef = this.firestore.doc(`channels/REz7mkotTOrDEP60d4YQ`);
    // this.messagesFromFirebase$ = from(myDocRef.get());
    // this.messagesFromFirebase$.subscribe((doc) => {
    //   const myData = doc.data();
    //   console.log(doc); 
    // }, (error) => {
    //   console.log('Fehler beim Abrufen des Firestore-Dokuments:', error);
    // });
    // console.log(myDocRef);
    console.log(this.messages);


    this.loadMessagesFromFirestore();


    console.log(this.messages);

  }


  async loadMessagesFromFirestore() {
    await this.firestore.collection('users').doc(this.currentUserId).valueChanges().subscribe((user: any) => {
      this.messages = user.messages;
      // console.log(this.messages);
    });
  }
}
