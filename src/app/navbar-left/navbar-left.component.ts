import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { collection, doc, Firestore, getFirestore } from '@firebase/firestore';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { DialogAddGroupComponent } from '../dialog-add-group/dialog-add-group.component';
import { DialogAddTeamMemberComponent } from '../dialog-add-team-member/dialog-add-team-member.component';

@Component({
  selector: 'app-navbar-left',
  templateUrl: './navbar-left.component.html',
  styleUrls: ['./navbar-left.component.scss']
})
export class NavbarLeftComponent implements OnInit {
  @Input() groupId: string;
  drawer = true;
  currentUserId;
  public messages;
  channels = [];
  groups = [];
  directMessages = [];

  communicationSections = [];


  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {
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
      this.loadGroups();
      this.loadChats();
    });
  }

  loadChannels() {
    this.channels = [];
    let alreadyUsedIds = [];
    this.messages.channels.forEach(channelId => {
      this.firestore.collection('channels').doc(channelId).valueChanges({ idField: 'docId' }).subscribe((channel: any) => {
        let result = alreadyUsedIds.filter(id => id.includes(channelId))
        if (result.length == 0 || alreadyUsedIds.length == 0) {
          alreadyUsedIds.push(channelId)
          this.channels.push(channel);
        }
      });
    });
  }

  loadGroups() {
    this.groups = [];
    let alreadyUsedIds = [];
    this.messages.groups.forEach(groupId => {
      this.firestore.collection('groups').doc(groupId).valueChanges({ idField: 'docId' }).subscribe((group: any) => {
        let result = alreadyUsedIds.filter(id => id.includes(groupId))
        if (result.length == 0 || alreadyUsedIds.length == 0) {
          alreadyUsedIds.push(groupId)
          this.groups.push(group);
        }
      });
    });
  }

  loadChats() {
    this.directMessages = [];
    let alreadyUsedIds = [];
    this.messages.directMessages.forEach(directMessageId => {
      this.firestore.collection('directMessages').doc(directMessageId).valueChanges({ idField: 'docId' }).subscribe((directMessage: any) => {
        let result = alreadyUsedIds.filter(id => id.includes(directMessageId))
        if (result.length == 0 || alreadyUsedIds.length == 0) {
          alreadyUsedIds.push(directMessageId)
          this.directMessages.push(directMessage);
        }
      });
    });

    console.log(this.directMessages);

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

  openMessageHistory(id) {
    console.log('Das ist die Id zum jeweiligen document', id);
  }

  deleteGroup() {
    console.log('test');
    
  }
}