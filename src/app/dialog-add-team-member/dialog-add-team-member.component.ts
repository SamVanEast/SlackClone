import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { directMessage } from 'src/models/directMessage';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-dialog-add-team-member',
  templateUrl: './dialog-add-team-member.component.html',
  styleUrls: ['./dialog-add-team-member.component.scss']
})
export class DialogAddTeamMemberComponent {
  memberId;
  loading = false;
  groupsIds = [];
  allUsers = [];

  constructor(public use: UserService, private firestore: AngularFirestore, private dialogRef: MatDialogRef<DialogAddTeamMemberComponent>) {
  }

  ngOnInit(): void {
    this.firestore.collection('users').valueChanges({ idField: 'docId' }).subscribe((users: any) => {
      this.allUsers = users;
      this.allUsers.forEach(function (user, i) {
        // console.log(this.currentUserId);
        
        // let result = user.docId === this.currentUserId;
        // if (result) {
        //   console.log(this.allUsers[i]);
        // }
      })
    });
  }


  save() {
    this.loading = true;
    this.firestore.collection('directMessages').add(directMessage).then((docRef) => {
      const newDirectMessageId = docRef.id;
      this.pushNewDirectMessageToArray(newDirectMessageId);
      this.loadUser(newDirectMessageId);
    })
  }

  loadUser(newDirectMessageId) {
    this.firestore.collection('users').doc(this.memberId).get().toPromise().then((doc: any) => {
      const docData = doc.data();
      docData.communicationSections.directMessages.push(newDirectMessageId);
      this.updateUserCommunicationSections(docData);
      this.updateParticipantsDirectMessages(newDirectMessageId);
    });
  }

  pushNewDirectMessageToArray(newDirectMessageId) {
    this.firestore.collection('users').doc(this.use.currentUserId).get().toPromise().then((userDoc) => {
      const currentUser: any = userDoc.data();
      const currentDirectMessagesIds = currentUser.communicationSections.directMessages;
      currentDirectMessagesIds.push(newDirectMessageId);
      this.updateUser(currentDirectMessagesIds);
    });
  }

  updateUser(currentDirectMessagesIds) {
    this.firestore.collection('users').doc(this.use.currentUserId).update({
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

  updateParticipantsDirectMessages(newDirectMessageId) {
    this.firestore.collection('directMessages').doc(newDirectMessageId).update({
      "participants": [this.use.currentUserId, this.memberId]
    });
  }

  closeDialogMember() {
    this.dialogRef.close();
  }

}
