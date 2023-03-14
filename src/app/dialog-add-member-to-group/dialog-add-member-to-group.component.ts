import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-dialog-add-member-to-group',
  templateUrl: './dialog-add-member-to-group.component.html',
  styleUrls: ['./dialog-add-member-to-group.component.scss']
})
export class DialogAddMemberToGroupComponent {
  allUsers = [];
  memberId;
  groupDoc;
  constructor(public use: UserService, private dialogRef: MatDialogRef<DialogAddMemberToGroupComponent>, private route: ActivatedRoute, private firestore: AngularFirestore) {

  }

  loading = false;


  ngOnInit(): void {
      this.firestore.collection('users').valueChanges({ idField: 'docId' }).subscribe((users: any) => {
        this.allUsers = users;
      });
  }


  ngOnChanges() {
    
  }

  save() { 
    this.firestore.collection(this.use.whichContentShouldLoad[0]).doc(this.use.whichContentShouldLoad[1]).get().toPromise().then((doc: any) => {
      let docData= doc.data();
      docData.participants.push(this.memberId);
      this.updateCommunicationSections(docData);
    });
    this.firestore.collection('users').doc(this.memberId).get().toPromise().then((doc: any) => {
      const docData = doc.data();
      docData.communicationSections.groups.push(this.use.whichContentShouldLoad[1]);
      this.updateUserCommunicationSections(docData);
    });
    this.dialogRef.close();
  }

  closeDialogAddMember() {
    this.dialogRef.close();
  }

  updateCommunicationSections(docData) {
    this.firestore.collection(this.use.whichContentShouldLoad[0]).doc(this.use.whichContentShouldLoad[1]).update({
     "participants": docData.participants
    });
  }

  updateUserCommunicationSections(docData){
    this.firestore.collection('users').doc(this.memberId).update({
      "communicationSections.groups": docData.communicationSections.groups
     });
  }

}
