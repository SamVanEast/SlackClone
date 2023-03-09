import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dialog-update-contact',
  templateUrl: './dialog-update-contact.component.html',
  styleUrls: ['./dialog-update-contact.component.scss']
})
export class DialogUpdateContactComponent {

  loading = false;
  public email;
  public phone;
  currentUserId;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private dialogRef: MatDialogRef<DialogUpdateContactComponent>) { }

  ngAfterViewInit(): void {
    this.firestore.collection('users').doc(this.currentUserId).valueChanges().subscribe((user: any) => {
      console.log(user);
      this.email = user.userInfos.email;
      this.phone = user.userInfos.phone;
    });
  }

  saveContact() {
    this.loading = true;
    this.firestore.collection('users').doc(this.currentUserId).update({
      'userInfos.email': this.email,
      'userInfos.phone': this.phone,
    }).then(() => {
      this.loading = false;
      this.dialogRef.close();
    });
  }

  closeDialogContact() {
    this.dialogRef.close();
  }
}
