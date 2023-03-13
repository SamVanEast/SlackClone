import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dialog-members',
  templateUrl: './dialog-members.component.html',
  styleUrls: ['./dialog-members.component.scss']
})
export class DialogMembersComponent {
  allUsers = [];
  whichContentShouldLoad;

  constructor(private firestore: AngularFirestore){
  }

  ngOnInit(){
    this.allUsers = [];
    this.firestore.collection(this.whichContentShouldLoad[0]).doc(this.whichContentShouldLoad[1]).valueChanges().subscribe((doc: any) => {
      doc.participants.forEach((participant: any) => {
        const participantIds = participant;
        
        this.firestore.collection('users').doc(participant).get().toPromise().then((doc: any) => {
            const user = doc.data();
            this.allUsers.push(user.userInfos);
            console.log('allUser', this.allUsers);
          });
      });
    });
  }
}