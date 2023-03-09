import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { collection, doc, Firestore, getFirestore } from '@firebase/firestore';
import { from, Observable } from 'rxjs';
import { user } from 'src/models/user';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { DialogAddGroupComponent } from '../dialog-add-group/dialog-add-group.component';
import { DialogAddTeamMemberComponent } from '../dialog-add-team-member/dialog-add-team-member.component';

@Component({
  selector: 'app-navbar-left',
  templateUrl: './navbar-left.component.html',
  styleUrls: ['./navbar-left.component.scss']
})
export class NavbarLeftComponent implements OnInit{
  drawer = true;
  currentUserId;
  messagesFromFirebase$: Observable<any>;
  public messages;
  cannels

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {
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

  openDialogChannel(){
    const dialogChannel = this.dialog.open(DialogAddChannelComponent);
    dialogChannel.componentInstance.currentUserId = this.currentUserId;
  }

  openDialogGroups(){
    const dialogGroup = this.dialog.open(DialogAddGroupComponent);
    dialogGroup.componentInstance.currentUserId = this.currentUserId;
  }

  openDialogMember(){
    const dialogMember = this.dialog.open(DialogAddTeamMemberComponent);
    dialogMember.componentInstance.currentUserId = this.currentUserId;
  }
}
