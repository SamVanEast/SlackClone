import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/services/user.service';
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
  public communicationSections;
  channels = [];
  groups = [];
  directMessages = [];
  headlinesOfDirectMessages = [];
  @Output() whichContentShouldLoad = new EventEmitter<any>();

  constructor(public use: UserService, private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.use.currentUserId = params['id'];
    });
    this.loadMessagesFromFirestore();
    this.openMessageHistory('KlTnEdj7XuVLzYnB13Iw', 'channels', 'General');
  }


  loadMessagesFromFirestore() {
    this.firestore.collection('users').doc(this.use.currentUserId).valueChanges().subscribe((user: any) => {
      this.communicationSections = user.communicationSections;
      this.loadChannels();
      this.loadGroups();
      this.loadDirectMessages();
    });
  }

  loadChannels() {
    let channels = [];
    let alreadyUsedIds = [];
    this.communicationSections.channels.forEach(channelId => {
      this.firestore.collection('channels').doc(channelId).valueChanges({ idField: 'docId' }).subscribe((channel: any) => {
        let result = alreadyUsedIds.filter(id => id.includes(channelId))
        if (result.length == 0 || alreadyUsedIds.length == 0) {
          alreadyUsedIds.push(channelId)
          channels.push(channel);
        }
      });
    });
    this.channels = channels;
  }

  loadGroups() {
    let groups = [];
    let alreadyUsedIds = [];
    this.communicationSections.groups.forEach(groupId => {
      this.firestore.collection('groups').doc(groupId).valueChanges({ idField: 'docId' }).subscribe((group: any) => {
        let result = alreadyUsedIds.filter(id => id.includes(groupId))
        if (result.length == 0 || alreadyUsedIds.length == 0) {
          alreadyUsedIds.push(groupId)
          groups.push(group);
        }
      });
    });
    this.groups = groups;
  }

  loadDirectMessages() {
    let directMessages = [];
    let alreadyUsedIds = [];
    this.headlinesOfDirectMessages = [];
    this.communicationSections.directMessages.forEach(directMessageId => {
      this.firestore.collection('directMessages').doc(directMessageId).valueChanges({ idField: 'docId' }).subscribe((directMessage: any) => {
        let result = alreadyUsedIds.filter(id => id.includes(directMessageId))
        if (result.length == 0 || alreadyUsedIds.length == 0) {
          alreadyUsedIds.push(directMessageId)
          directMessages.push(directMessage);
          this.loadUserNameDown(directMessage.participants);
        }
      });
    });
    this.directMessages = directMessages;
  }

  loadUserNameDown(participants) {
    participants.forEach(id => {
      if (id !== this.use.currentUserId) {
        this.firestore.collection('users').doc(id).get().toPromise().then((doc: any) => {
          const user = doc.data();
          let result = this.headlinesOfDirectMessages.filter(id => id.includes(`${user.userInfos.firstName} ${user.userInfos.lastName}`))
          if (result.length == 0) {
            this.headlinesOfDirectMessages.push(`${user.userInfos.firstName} ${user.userInfos.lastName}`);
          }
        })
      }
    });

  }

  openDialogChannel() {
    this.dialog.open(DialogAddChannelComponent);
  }

  openDialogGroups() {
    this.dialog.open(DialogAddGroupComponent);
  }

  openDialogMember() {
    this.dialog.open(DialogAddTeamMemberComponent);
  }

  openMessageHistory(id, collection, headline) {
    this.whichContentShouldLoad.emit([collection, id, headline]);
  }



}