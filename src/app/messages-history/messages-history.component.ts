import { Component, Input, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Editor } from 'ngx-editor';
import { NavbarService } from 'src/services/navbar.service';
import { UserService } from 'src/services/user.service';
import { DialogAddMemberToGroupComponent } from '../dialog-add-member-to-group/dialog-add-member-to-group.component';
import { DialogMembersComponent } from '../dialog-members/dialog-members.component';

@Component({
  selector: 'app-messages-history',
  templateUrl: './messages-history.component.html',
  styleUrls: ['./messages-history.component.scss']
})
export class MessagesHistoryComponent {
  @ViewChild('messagesHistoryContent', { static: false }) private messagesHistoryContent: ElementRef;
  editor: Editor | undefined;
  html = '';
  currentDoc;
  @Input() whichContentShouldLoad;
  doc;
  @Input() searchText;
  user;
  withWhoMakeGroup;

  constructor(public use: UserService, private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog, private el: ElementRef, private renderer: Renderer2, public nav: NavbarService) {
    this.whichContentShouldLoad = [];
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    this.messagesHistoryContent.nativeElement.scrollTop = this.messagesHistoryContent.nativeElement.scrollHeight;
  }

  ngOnChanges() {
    if (this.whichContentShouldLoad !== undefined && this.whichContentShouldLoad.length > 0) {
      this.firestore.collection(this.whichContentShouldLoad[0]).doc(this.whichContentShouldLoad[1]).valueChanges().subscribe((doc: any) => {
        this.doc = doc;
        this.withWhoMakeGroup = doc.participants;
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
      this.firestore.collection(this.whichContentShouldLoad[0]).doc(this.whichContentShouldLoad[1]).update({
        'messages': this.doc.messages
      });
    }
    this.editor.setContent('');
  };

  openDialogMembers() {
    const dialog = this.dialog.open(DialogMembersComponent);
    dialog.componentInstance.whichContentShouldLoad = this.whichContentShouldLoad;
  };

  openCreatorProfile(id) {
    this.nav.openRight();
    this.nav.whichProfileShouldLoad.next(id);
    
  };

  openAddMemberToGroup() {
    const dialog = this.dialog.open(DialogAddMemberToGroupComponent);
    dialog.componentInstance.whichContentShouldLoad = this.whichContentShouldLoad;
    dialog.componentInstance.withWhoMakeGroup = this.withWhoMakeGroup;
  }
}
