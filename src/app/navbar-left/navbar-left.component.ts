import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { collection, doc, Firestore, getFirestore } from '@firebase/firestore';
import { Observable } from 'rxjs';
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
    // const coll = collection(firestore, 'todos');
    // this.messagesFromFirebase$ = collectionData(coll);
    this.messages = user.messages
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentUserId = params['id'];
    });



    const db = getFirestore();
    const colRef = collection(db, 'todos'); 
    this.messagesFromFirebase$ = collectionData(colRef);

    this.messagesFromFirebase$.subscribe((message) => {
      console.log(message);
    })


    // this.messagesFromFirebase$ = doc(db, "cities", "2l3bcSGs2vZBIc3RODwp");



    this.firestore.collection('users').doc(this.currentUserId).valueChanges().subscribe((user: any) => {
      this.messages = user.messages;
      // console.log(this.messages);
    });







    // this.messages.channels.forEach(element => {
    //   console.log(element);
    //   this.firestore.collection('directMessages').doc(this.currentUserId).valueChanges().subscribe((user: any) => {
    //   });
    // });



  }
}
