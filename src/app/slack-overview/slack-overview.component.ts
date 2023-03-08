import { Component, HostListener, ViewChild } from '@angular/core';
import { user } from 'src/models/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { channels } from 'src/models/channels';
import { groups } from 'src/models/groups';
import { directMessages } from 'src/models/direct-message';
import { ActivatedRoute, Router } from '@angular/router';
import { getFirestore } from "firebase/firestore";
import { collection, doc, getDoc, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-slack-overview',
  templateUrl: './slack-overview.component.html',
  styleUrls: ['./slack-overview.component.scss']
})
export class SlackOverviewComponent {
  @ViewChild('header') header;
  showNavbar = true;
  currentUserId;


  constructor(private router: Router, private firestore: AngularFirestore, private route: ActivatedRoute,) {
    this.router.navigateByUrl('jj4t8IgMOtkZR97thoti');

    this.route.params.subscribe((params) => {
      this.currentUserId = params['id'];
    });

    this.getAllIds();


    // this.firestore.collection('users').doc('').then(() => {

    // })
    // Object.keys(Films)


    this.firestore.collection('users').valueChanges({ idField: 'docId' }).subscribe((changes: any) => {
      // console.log(changes);
    })

    // this.firestore.collection('users').doc(this.currentUserId).update(user).then((user) => {
    // })


    // this.generateChannelDoc();
    // this.generateGoupsDoc();
    // this.generateDirectMesssageDoc();
    // this.generateUserDoc();
  }

  async getAllIds() {
    const db = getFirestore();
    const docRef = collection(db, 'users');
    const docSnap = await getDocs(docRef);

    // console.log(docSnap)
    docSnap.forEach((doc) => {
      // console.log(doc)

    })
  }

  @HostListener('window:click')

  onClick() {
    this.showNavbar = this.header.openNavbar;
  }








  generateChannelDoc() {
    this.firestore.collection('channels').add(channels).then((user) => {
    })
  }
  generateUserDoc() {
    this.firestore.collection('users').add(user).then((user) => {
    })
  }
  generateGoupsDoc() {
    this.firestore.collection('groups').add(groups).then((user) => {
    })
  }
  generateDirectMesssageDoc() {
    this.firestore.collection('directMessages').add(directMessages).then((user) => {
    })
  }
}
