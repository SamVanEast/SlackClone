import { Component, Input, HostListener, OnChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Editor } from 'ngx-editor';
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
  currentUserId;
  currentDoc;
  @Input() whichContentShouldLoad;
  doc;
  @Input() searchText;
  user;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {
    this.whichContentShouldLoad = [];
    this.route.params.subscribe((params) => {
      this.currentUserId = params['id'];
    });
  }

  ngOnChanges() {
    if (this.whichContentShouldLoad !== undefined && this.whichContentShouldLoad.length > 0) {
      this.firestore.collection(this.whichContentShouldLoad[0]).doc(this.whichContentShouldLoad[1]).valueChanges().subscribe((doc: any) => {
        this.doc = doc;
      console.log(doc.messages[22]);

      });
    }
    console.log(this.searchText)
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.firestore.collection('users').doc(this.currentUserId).valueChanges().subscribe((user: any) => {
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
        creatorImg: this.user.userInfos.profileImage,
        creatorId: this.currentUserId,
        creator: `${this.user.userInfos.firstName} ${this.user.userInfos.lastName}`,
        text: text,
        date: new Date().getTime(),
      })
      this.firestore.collection(this.whichContentShouldLoad[0]).doc(this.whichContentShouldLoad[1]).update({
        'messages': this.doc.messages
      });
    }
    this.editor.setContent('');
  };

  openDialogMembers(){
    const dialog = this.dialog.open(DialogMembersComponent);
    dialog.componentInstance.whichContentShouldLoad = this.whichContentShouldLoad;
  };

  openCreatorProfile(id){
    console.log(id);
    
  };

  openAddMemberToGroup() {
    const dialog = this.dialog.open(DialogAddMemberToGroupComponent);
  }
}
