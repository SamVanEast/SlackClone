import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { directMessage } from 'src/models/directMessage';

@Component({
  selector: 'app-dialog-add-team-member',
  templateUrl: './dialog-add-team-member.component.html',
  styleUrls: ['./dialog-add-team-member.component.scss']
})
export class DialogAddTeamMemberComponent {
  currentUserId;
  loading = false;
  directMessages;
  groupsIds = [];

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private dialogRef: MatDialogRef<DialogAddTeamMemberComponent>) {
    this.directMessages = directMessage;
    this.route.params.subscribe((params) => {
      this.currentUserId = params['id'];
    });
  }


  save() {
    if (this.directMessages.headline !== '') {
      this.loading = true;
      this.firestore.collection('directMessages').add(this.directMessages).then((docRef) => {
        const newDirectMessageId = docRef.id;
        this.firestore.collection('users').doc(this.currentUserId).get().toPromise().then((userDoc) => {
          const currentUser: any = userDoc.data();
          const currentDirectMessagesId = currentUser.messages.directMessages;
          currentDirectMessagesId.push(newDirectMessageId);
          this.firestore.collection('users').doc(this.currentUserId).update({
            'messages.directMessages': currentDirectMessagesId
          }).then(() => {
            this.loading = false;
            this.dialogRef.close();
          })
        });

      })
    }
    this.directMessages.headline = '';
  }

  closeDialogMember() {
    this.dialogRef.close();
  }

}
