import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dialog-add-group',
  templateUrl: './dialog-add-group.component.html',
  styleUrls: ['./dialog-add-group.component.scss']
})
export class DialogAddGroupComponent {
  currentUserId;
  loading = false;
  groupName;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private dialogRef: MatDialogRef<DialogAddGroupComponent>) { }

  saveGroup() {
    this.firestore.collection('groups').add({
      group: '',
      headline: this.groupName
    })
    .then(() => {
      console.log('Works');
      this.dialogRef.close();
    });
  }

  closeDialogGroup() {
    this.dialogRef.close();
  }

}
