import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
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
  public communicationSections;
  channels = [];
  groups = [];
  directMessages = [];
  @Output() whichContentShouldLoad = new EventEmitter<any>();


  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.currentUserId = params['id'];
    });
    this.loadMessagesFromFirestore();
    this.openMessageHistory('KlTnEdj7XuVLzYnB13Iw', 'channels');
  }


  loadMessagesFromFirestore() {
    this.firestore.collection('users').doc(this.currentUserId).valueChanges().subscribe((user: any) => {
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
    this.communicationSections.directMessages.forEach(directMessageId => {
      this.firestore.collection('directMessages').doc(directMessageId).valueChanges({ idField: 'docId' }).subscribe((directMessage: any) => {
        let result = alreadyUsedIds.filter(id => id.includes(directMessageId))
        if (result.length == 0 || alreadyUsedIds.length == 0) {
          alreadyUsedIds.push(directMessageId)
          directMessages.push(directMessage);

        }
      });
    });
    this.directMessages = directMessages;
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

  openMessageHistory(id, collection) {
    this.whichContentShouldLoad.emit([collection, id]);
  }

}