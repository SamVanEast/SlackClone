import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { collection, doc, Firestore, getFirestore } from '@firebase/firestore';
import { from, Observable } from 'rxjs';
import { channels } from 'src/models/channels';
import { user } from 'src/models/user';

@Component({
  selector: 'app-navbar-left',
  templateUrl: './navbar-left.component.html',
  styleUrls: ['./navbar-left.component.scss']
})
export class NavbarLeftComponent {
  drawer = true;
  currentUserId;
  messagesFromFirebase$: Observable<any>;
  public messages;
  channels;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) {
    this.messages = user.messages;
    // this.channels = channels;
    // console.log(this.channels);
    
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.currentUserId = params['id'];
    });
    this.loadMessagesFromFirestore();
  }


  loadMessagesFromFirestore() {
    this.firestore.collection('users').doc(this.currentUserId).valueChanges().subscribe((user: any) => {
      this.messages = user.messages;
      console.log(this.messages.channels);
      
      this.loadChannels();
    });
  }

  loadChannels() {
    this.channels = [];
    console.log(this.messages.channels.length);

    this.messages.channels.forEach(channelId => {
      this.firestore.collection('channels').doc(channelId).valueChanges().subscribe((channel: any) => {
        // console.log(channel);
        // debugger
        this.channels.push(channel);
      });
    });
    console.log(this.channels);
    
  }
}
