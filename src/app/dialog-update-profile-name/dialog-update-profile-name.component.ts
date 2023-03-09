import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dialog-update-profile-name',
  templateUrl: './dialog-update-profile-name.component.html',
  styleUrls: ['./dialog-update-profile-name.component.scss']
})
export class DialogUpdateProfileNameComponent {

  loading = false;
  public firstName;
  public lastName;
  currentUserId;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private dialogRef: MatDialogRef<DialogUpdateProfileNameComponent>) { }

  ngAfterViewInit(): void {
    this.firestore.collection('users').doc(this.currentUserId).valueChanges().subscribe((user: any) => {
      console.log(user);
      this.firstName = user.userInfos.firstName;
      this.lastName = user.userInfos.lastName;
    });
  }

  saveName() {
    this.loading = true;
    const userDocRef = this.firestore.collection('users').doc(this.currentUserId);
    userDocRef.update({
      'userInfos.firstName': this.firstName,
      'userInfos.lastName': this.lastName,
    }).then(() => {
      this.loading = false;
      this.dialogRef.close();
    }).catch((error) => {
      this.loading = false;
      console.log('Error updating user document:', error);
    });
  }

  closeDialogName() {
    this.dialogRef.close();
  }
}
