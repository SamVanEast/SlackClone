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

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private dialogRef: MatDialogRef<DialogAddGroupComponent>) {
    this.group = group;
    this.route.params.subscribe((params) => {
      this.currentUserId = params['id'];
    });
  }

  saveGroup() {
    if (this.group.headline !== '') {
      this.loading = true;
      this.firestore.collection('groups').add(this.group).then((docRef) => {
        const newGroupId = docRef.id;
        this.firestore.collection('users').doc(this.currentUserId).get().toPromise().then((userDoc) => {
          const currentUser: any = userDoc.data();
          const currentGroups = currentUser.messages.groups;
          currentGroups.push(newGroupId);
          this.firestore.collection('users').doc(this.currentUserId).update({
            'messages.groups': currentGroups
          }).then(() => {
            this.loading = false;
            this.dialogRef.close();
          })
        });
      })
    }
    this.group.headline = '';
  }


  closeDialogGroup() {
    this.dialogRef.close();
  }

}
