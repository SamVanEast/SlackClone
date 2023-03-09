import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dialog-update-profile-name',
  templateUrl: './dialog-update-profile-name.component.html',
  styleUrls: ['./dialog-update-profile-name.component.scss']
})
export class DialogUpdateProfileNameComponent {

  loading = false;
  currentUserId;

  firstNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z]+$/),
  ]);
  lastNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z]+$/),
  ]);

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private dialogRef: MatDialogRef<DialogUpdateProfileNameComponent>) { }

  ngAfterViewInit(): void {
    this.firestore.collection('users').doc(this.currentUserId).valueChanges().subscribe((user: any) => {
      console.log(user);
      this.firstNameFormControl.setValue(user.userInfos.firstName);
      this.lastNameFormControl.setValue(user.userInfos.lastName);
    });
  }

  saveName() {
    if (this.firstNameFormControl.valid && this.lastNameFormControl.valid) {
      this.loading = true;
      this.firestore.collection('users').doc(this.currentUserId).update({
        'userInfos.firstName': this.firstNameFormControl.value,
        'userInfos.lastName': this.lastNameFormControl.value,
      }).then(() => {
        this.loading = false;
        this.dialogRef.close();
      });
    }
  }

  closeDialogName() {
    this.dialogRef.close();
  }
}
