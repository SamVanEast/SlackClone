import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dialog-add-member-to-group',
  templateUrl: './dialog-add-member-to-group.component.html',
  styleUrls: ['./dialog-add-member-to-group.component.scss']
})
export class DialogAddMemberToGroupComponent {

  currentUserId;
  allUsers = [];
  memberId;
  whichContentShouldLoad;
  constructor(private dialogRef: MatDialogRef<DialogAddMemberToGroupComponent>, private route: ActivatedRoute, private firestore: AngularFirestore) {

  }

  loading = false;


  ngOnInit(): void {

      this.firestore.collection('users').valueChanges({ idField: 'docId' }).subscribe((users: any) => {
        this.allUsers = users;
      });

      // this.firestore.collection('users').doc(this.currentUserId).get().subscribe((doc) => {
      //   const user: any = doc.data();
      //   this.profileImgSrc = user.userInfos.profileImg;
      // });
  }


  ngOnChanges() {
    
  }

  save() { 
    this.firestore.collection(this.whichContentShouldLoad[0]).doc(this.whichContentShouldLoad[1]).get().toPromise().then((doc: any) => {
      const docData = doc.Data();
      docData.participants.push(this.memberId);
    });
  }

  closeDialogAddMember() {
    this.dialogRef.close();
  }

  updateCommunicationSections() {
    this.firestore.collection(this.whichContentShouldLoad[0]).doc(this.whichContentShouldLoad[1]).update({
     
    });
  }

}
