import { Component } from '@angular/core';
import { user } from 'src/models/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { channels } from 'src/models/channels';
import { groups } from 'src/models/groups';
import { directMessages } from 'src/models/direct-message';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-slack-overview',
  templateUrl: './slack-overview.component.html',
  styleUrls: ['./slack-overview.component.scss']
})
export class SlackOverviewComponent {
  currentUserId;


  constructor(private router: Router, private firestore: AngularFirestore, private route: ActivatedRoute) {
    this.router.navigateByUrl('jj4t8IgMOtkZR97thoti');
    
    this.route.params.subscribe((params) => {
      this.currentUserId = params['id'];
    });

    // console.log(this.firestore.collection('users'))



    this.firestore.collection('users').valueChanges({ idField: 'docId' }).subscribe((changes: any) => {
      console.log(changes);
    })

    // this.firestore.collection('users').doc(this.currentUserId).update(user).then((user) => {
    // })


    // this.generateChannelDoc();
    // this.generateUserDoc();
    // this.generateGoupsDoc();
    // this.generateDirectMesssageDoc();
  }

  generateChannelDoc(){
    this.firestore.collection('channels').add(channels).then((user) => {
    })
  }
  generateUserDoc(){
    this.firestore.collection('users').add(user).then((user) => {
    })
  }
  generateGoupsDoc(){
    this.firestore.collection('groups').add(groups).then((user) => {
    })
  }
  generateDirectMesssageDoc(){
    this.firestore.collection('directMessage').add(directMessages).then((user) => {
    })
  }
}
