import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { collection, doc, Firestore, getFirestore } from '@firebase/firestore';
import { from, Observable } from 'rxjs';
import { channels } from 'src/models/channels';
import { user } from 'src/models/user';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { DialogAddGroupComponent } from '../dialog-add-group/dialog-add-group.component';
import { DialogAddTeamMemberComponent } from '../dialog-add-team-member/dialog-add-team-member.component';

@Component({
  selector: 'app-navbar-left',
  templateUrl: './navbar-left.component.html',
  styleUrls: ['./navbar-left.component.scss']
})
export class NavbarLeftComponent implements OnInit {
  drawer = true;
  currentUserId;
  messagesFromFirebase$: Observable<any>;
  public messages;
  channels;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {
    this.messages = user.messages
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
  
  openDialogChannel() {
    const dialogChannel = this.dialog.open(DialogAddChannelComponent);
    dialogChannel.componentInstance.currentUserId = this.currentUserId;
  }

  openDialogGroups() {
    const dialogGroup = this.dialog.open(DialogAddGroupComponent);
    dialogGroup.componentInstance.currentUserId = this.currentUserId;
  }

  openDialogMember() {
    const dialogMember = this.dialog.open(DialogAddTeamMemberComponent);
    dialogMember.componentInstance.currentUserId = this.currentUserId;
  }

}