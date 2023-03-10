import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/compat';
import { group } from 'src/models/group';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-dialog-add-group',
  templateUrl: './dialog-add-group.component.html',
  styleUrls: ['./dialog-add-group.component.scss']
})
export class DialogAddGroupComponent {
  // communicationSections
  currentUserId;
  loading = false;
  group;
  // groupsIds = [];
  // groupName;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private dialogRef: MatDialogRef<DialogAddGroupComponent>) {
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
        
        // Update the user's groups list in Firebase
        this.firestore.collection('users').doc(this.currentUserId).update({
          'messages.groups': newGroupId
        }).then(() => {
          console.log('Group saved successfully.');
          this.loading = false;
          this.dialogRef.close();
        }).catch((error) => {
          console.error('Error updating user data:', error);
          this.loading = false;
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
