import { Component } from '@angular/core';
import { user } from 'src/models/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-slack-overview',
  templateUrl: './slack-overview.component.html',
  styleUrls: ['./slack-overview.component.scss']
})
export class SlackOverviewComponent {;
  constructor(private firestore: AngularFirestore) { 
    // console.log(this.firestore.collection('users'))
    // this.firestore.collection('users').add(user).then((user) => {
    // })
  }
}
