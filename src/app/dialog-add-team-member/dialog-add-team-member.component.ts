import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { directMessage } from 'src/models/directMessage';

@Component({
  selector: 'app-dialog-add-team-member',
  templateUrl: './dialog-add-team-member.component.html',
  styleUrls: ['./dialog-add-team-member.component.scss']
})
export class DialogAddTeamMemberComponent {
  currentUserId;
  memberId;
  loading = false;
  groupsIds = [];
  allUsers = [];

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private dialogRef: MatDialogRef<DialogAddTeamMemberComponent>) {
  }

  ngOnInit(): void {
    this.firestore.collection('users').valueChanges({ idField: 'docId' }).subscribe((users: any) => {
      this.allUsers = users;
    });
  }


  save() {
    this.loading = true;
    this.firestore.collection('directMessages').add(directMessage).then((docRef) => {
      const newDirectMessageId = docRef.id;
      this.pushNewDirectMessageToArray(newDirectMessageId);
      this.firestore.collection('users').doc(this.memberId).get().toPromise().then((doc: any) => {
        const docData = doc.data();
        docData.communicationSections.directMessages.push(newDirectMessageId);
        this.updateUserCommunicationSections(docData);
        this.updateHeadlineDirectMessages(docData, newDirectMessageId);
      });
    })

  }

  pushNewDirectMessageToArray(newDirectMessageId) {
    this.firestore.collection('users').doc(this.currentUserId).get().toPromise().then((userDoc) => {
      const currentUser: any = userDoc.data();
      const currentDirectMessagesIds = currentUser.communicationSections.directMessages;
      currentDirectMessagesIds.push(newDirectMessageId);
      this.updateUser(currentDirectMessagesIds);
    });
  }

  updateUser(currentDirectMessagesIds) {
    this.firestore.collection('users').doc(this.currentUserId).update({
      'communicationSections.directMessages': currentDirectMessagesIds
    }).then(() => {
      this.loading = false;
      this.dialogRef.close();
    })
  }

  updateUserCommunicationSections(docData) {
    this.firestore.collection('users').doc(this.memberId).update({
      "communicationSections.directMessages": docData.communicationSections.directMessages
    });
  }

  updateHeadlineDirectMessages(docData, newDirectMessageId){
    this.firestore.collection('directMessages').doc(newDirectMessageId).update({
      "headline": `${docData.userInfos.firstName} ${docData.userInfos.lastName}`
    });
  }

  closeDialogMember() {
    this.dialogRef.close();
  }

}
