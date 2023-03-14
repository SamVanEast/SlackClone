import { Component, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { NavbarService } from '../../services/navbar.service';


@Component({
  selector: 'app-dialog-members',
  templateUrl: './dialog-members.component.html',
  styleUrls: ['./dialog-members.component.scss']
})
export class DialogMembersComponent {
  allUsers = [];
  whichContentShouldLoad;

  constructor(public nav: NavbarService, private firestore: AngularFirestore, private dialogRef: MatDialogRef<DialogMembersComponent>) {
  }

  ngOnInit() {
    this.allUsers = [];
    this.firestore.collection(this.whichContentShouldLoad[0]).doc(this.whichContentShouldLoad[1]).valueChanges().subscribe((doc: any) => {
      doc.participants.forEach((participant: any) => {
        const participantIds = participant;

        this.firestore.collection('users').doc(participant).get().toPromise().then((doc: any) => {
          const user = doc.data();
          this.allUsers.push(user);
        });
      });
    });
  }

  showMemberProfile(user) {
    // this.firestore.collection('users').doc().get().toPromise().then((snap: any) => {
    //     // snap.forEach(doc => {
    //       console.log(snap);
    //       // console.log(doc.id);
    //     });
    //   // });
    console.log(user.userInfos.firstName);
    console.log(user.userInfos.lastName);
    console.log(user.userInfos.email);

    this.closeDialogMembers();
  }

  closeDialogMembers(){
    this.nav.toggle();
    this.dialogRef.close();
  }
}