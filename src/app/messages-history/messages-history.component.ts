import { Component, Input, HostListener, OnChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Editor } from 'ngx-editor';
import { UserService } from 'src/services/user.service';
import { DialogAddMemberToGroupComponent } from '../dialog-add-member-to-group/dialog-add-member-to-group.component';
import { DialogMembersComponent } from '../dialog-members/dialog-members.component';

@Component({
  selector: 'app-messages-history',
  templateUrl: './messages-history.component.html',
  styleUrls: ['./messages-history.component.scss']
})
export class MessagesHistoryComponent {
  editor: Editor | undefined;
  html = '';
  currentDoc;
  doc;
  @Input() searchText;
  user;

  constructor(public use: UserService, private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {
    this.use.whichContentShouldLoad = [];
    this.route.params.subscribe((params) => {
      this.use.currentUserId = params['id'];
    });
  }

  ngOnChanges() {
    if (this.use.whichContentShouldLoad !== undefined && this.use.whichContentShouldLoad.length > 0) {
      this.firestore.collection(this.use.whichContentShouldLoad[0]).doc(this.use.whichContentShouldLoad[1]).valueChanges().subscribe((doc: any) => {
        this.doc = doc;

      });
    }
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.firestore.collection('users').doc(this.use.currentUserId).valueChanges().subscribe((user: any) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
  }


  sendMessage() {
    var oParser = new DOMParser();
    var oDOM = oParser.parseFromString(this.html, "text/html");
    var text = oDOM.body.innerText;

    if (text !== '') {
      this.doc.messages.push({
        creatorImg: this.user.userInfos.profileImg,
        creatorId: this.use.currentUserId,
        creator: `${this.user.userInfos.firstName} ${this.user.userInfos.lastName}`,
        text: text,
        date: new Date().getTime(),
      })
      this.firestore.collection(this.use.whichContentShouldLoad[0]).doc(this.use.whichContentShouldLoad[1]).update({
        'messages': this.doc.messages
      });
    }
    this.editor.setContent('');
  };

  openDialogMembers() {
    const dialog = this.dialog.open(DialogMembersComponent);
  };

  openCreatorProfile(id) {
    console.log(id);
  };

  openAddMemberToGroup() {
    const dialog = this.dialog.open(DialogAddMemberToGroupComponent);
  }
}
