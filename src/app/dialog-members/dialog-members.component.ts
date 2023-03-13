import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dialog-members',
  templateUrl: './dialog-members.component.html',
  styleUrls: ['./dialog-members.component.scss']
})
export class DialogMembersComponent {
  currentUserId;
  groupUserIds = [];
  allUsers = [];
  matchingUserIds = [];
  participantId = [];

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore){
  }

  ngOnInit(){
    this.firestore.collection('groups').valueChanges().subscribe((groups: any[]) => {
      groups.forEach((group: any) => {
        const participantIds = group.participants;
        // console.log(participantIds);
        
        participantIds.forEach((participantId: string) => {
          if (!this.groupUserIds.includes(participantId)) {
            this.groupUserIds.push(participantId);
            // console.log(this.groupUserIds);
          }
        });
      });
    });

    this.firestore.collection('users').valueChanges().subscribe((users: any[]) => {
      users.forEach((user: any) => {
        this.allUsers.push(user.id);
      });

      this.groupUserIds.forEach((groupId: string) => {
        if (this.allUsers.includes(groupId)) {
          this.matchingUserIds.push(groupId);
        }
      });
      
      console.log(this.matchingUserIds);
    });
  }
}
