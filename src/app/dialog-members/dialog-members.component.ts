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
  allUsers = [];

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore){
  }

  ngOnInit(){
    this.firestore.collection('users').valueChanges().subscribe((members: any) => {
      this.allUsers = members;
      console.log(this.allUsers);
    });
  }
}
