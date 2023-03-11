import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { group } from 'src/models/group';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-dialog-add-group',
  templateUrl: './dialog-add-group.component.html',
  styleUrls: ['./dialog-add-group.component.scss']
})
export class DialogAddGroupComponent {
  currentUserId;
  loading = false;
  group;
  groupsIds = [];

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private dialogRef: MatDialogRef<DialogAddGroupComponent>, private db: Firestore) {
    this.group = group;
    this.route.params.subscribe((params) => {
      this.currentUserId = params['id'];
    });
  }

  saveGroup() {



    if (this.group.headline !== '') {
      this.loading = true;
      // Add the new group to Firebase
      this.firestore.collection('groups').add(this.group).then((docRef) => {
        const newGroupId = docRef.id;
        console.log(newGroupId);

        // Get the current list of group IDs from the user's document
        this.firestore.collection('users').doc(this.currentUserId).get().toPromise().then((userDoc) => {
          const currentGroups = userDoc.get('messages.groups') || [];

          // Add the new group ID to the current list and update it in Firebase
          currentGroups.push(newGroupId);
          this.firestore.collection('users').doc(this.currentUserId).update({
            'messages.groups': currentGroups
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
  }


  closeDialogGroup() {
    this.dialogRef.close();
  }

}
