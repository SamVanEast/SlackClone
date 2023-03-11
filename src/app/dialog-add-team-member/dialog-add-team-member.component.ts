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
      // Add the new group to Firebase
      this.firestore.collection('directMessages').add(this.directMessages).then((docRef) => {
        const newDirectMessageId = docRef.id;
        console.log(newDirectMessageId);

        // Get the current list of group IDs from the user's document
        this.firestore.collection('users').doc(this.currentUserId).get().toPromise().then((userDoc) => {
          const currentDirectMessagesId = userDoc.get('messages.directMessages') || [];

          // Add the new group ID to the current list and update it in Firebase
          currentDirectMessagesId.push(newDirectMessageId);
          this.firestore.collection('users').doc(this.currentUserId).update({
            'messages.directMessages': currentDirectMessagesId
          }).then(() => {
            console.log('Group saved successfully.');
            this.loading = false;
            this.dialogRef.close();
          }).catch((error) => {
            console.error('Error updating user data:', error);
            this.loading = false;
          });
        });

      }).catch((error) => {
        console.error('Error adding new group:', error);
        this.loading = false;
      });
    }
    this.directMessages.headline = '';
  }

  closeDialogMember() {
    this.dialogRef.close();
  }

}
