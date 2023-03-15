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
  allUsers = [];
  withWhoDirectMessages;
  isGuest;

  constructor(public use: UserService, private firestore: AngularFirestore, private dialogRef: MatDialogRef<DialogAddTeamMemberComponent>) {
    if(this.use.currentUserId == 'TzlCRRHBcjQ30Oml2Tb8') {
      this.isGuest = true;
    } else {
      this.isGuest = false;
    }
  }

  ngOnInit(): void {
    this.firestore.collection('users').valueChanges({ idField: 'docId' }).subscribe((users: any) => {
      this.loadAllUsers(users);
    });
  }

  loadAllUsers(users){
    let self = this;
    this.allUsers = users;
    this.checkAllUsers();
    this.allUsers.forEach(function (user, i) {
      let result = user.docId === self.use.currentUserId;
      if (result) {
        self.allUsers.splice(i, 1)
      }
      if (i === self.allUsers.length - 1) {
        self.checkAllUsers();
      }
    })
  }

  checkAllUsers() {
    let self = this;
    this.allUsers.forEach(function (user, i) {

      self.withWhoDirectMessages.forEach((menberOfDirectMessages) => {
        let result = user.docId === menberOfDirectMessages;
        if (result) {
          self.allUsers.splice(i, 1);
          self.checkAllUsers();
        }
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
