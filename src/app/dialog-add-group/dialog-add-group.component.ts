import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
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
  groupsIds = [];
  // groupName;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private dialogRef: MatDialogRef<DialogAddGroupComponent>) {
    this.group = group;
    this.route.params.subscribe((params) => {
      this.currentUserId = params['id'];
    });
  }

  saveGroup() {
    if (this.group.headline !== '') {
      this.firestore.collection('groups').add(this.group).then((group) => {
        console.log(group.id);
        console.log(this.firestore.collection('users').doc(this.currentUserId).valueChanges());

        this.firestore.collection('users').doc(this.currentUserId).get().then( user => {
          this.groupsIds = user.messages.groups;
          this.groupsIds.push(group.id);
          // console.log(this.groupsIds);
          this.firestore.collection('users').doc(this.currentUserId).update({
            'messages.groups': this.groupsIds
          }).then((user) => {
            console.log('Hat funktioniert', this.groupsIds);
          })

        });








        this.dialogRef.close();
      });
    }
  }

  closeDialogGroup() {
    this.dialogRef.close();
  }

}
