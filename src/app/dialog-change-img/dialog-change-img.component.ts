import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogUpdateContactComponent } from '../dialog-update-contact/dialog-update-contact.component';

@Component({
  selector: 'app-dialog-change-img',
  templateUrl: './dialog-change-img.component.html',
  styleUrls: ['./dialog-change-img.component.scss']
})
export class DialogChangeImgComponent {
  loading = false;
  public selectedImageId;

  public images = [
    {
      img: 'assets/img/blank-profile.png',
    },
    {
      img: 'assets/img/pingu.png',
    },
    {
      img: 'assets/img/female1.png',
    },
    {
      img: 'assets/img/female2.png',
    },
    {
      img: 'assets/img/male1.png',
    },
    {
      img: 'assets/img/male2.png',
    },
  ];

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private dialogRef: MatDialogRef<DialogUpdateContactComponent>) { }

  setSelectedImageId(imageId) {
    this.selectedImageId = imageId;
  }

  saveImage() {
    this.dialogRef.close(this.selectedImageId);
  }

  closeDialogImage() {
    this.dialogRef.close();
  }
}
