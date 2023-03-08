import { Component } from '@angular/core';
import { user } from 'src/models/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { channels } from 'src/models/channels';
import { groups } from 'src/models/groups';
import { directMessages } from 'src/models/direct-message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slack-overview',
  templateUrl: './slack-overview.component.html',
  styleUrls: ['./slack-overview.component.scss']
})
export class SlackOverviewComponent {;
  constructor(private router: Router, private firestore: AngularFirestore) { 
    // console.log(this.firestore.collection('users'))
    // this.firestore.collection('direct-message').add(directMessages).then((user) => {
      this.router.navigateByUrl('1SaEFhihLQO7xB62hSG0');
    // })
    this.firestore.collection('users').valueChanges({ idField: 'docId' }).subscribe((changes: any) => {
      console.log(changes);
    })
  }
}
