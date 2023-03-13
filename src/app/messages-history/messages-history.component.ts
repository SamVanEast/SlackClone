import { Component, Input, HostListener, OnChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Editor } from 'ngx-editor';
import { channels } from 'src/models/channels';
import { SlackOverviewComponent } from '../slack-overview/slack-overview.component';

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
  currentUser;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) {
    this.whichContentShouldLoad = [];
    this.route.params.subscribe((params) => {
      this.currentUserId = params['id'];
    });
  }

  ngOnChanges() {
    if (this.whichContentShouldLoad !== undefined && this.whichContentShouldLoad.length > 0) {
      this.firestore.collection(this.whichContentShouldLoad[0]).doc(this.whichContentShouldLoad[1]).valueChanges().subscribe((doc: any) => {
        this.doc = doc;
      });
    }
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.firestore.collection('users').doc(this.currentUserId).valueChanges().subscribe((user: any) => {
      this.currentUser = user;
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
        creator: `${this.currentUser.userInfos.firstName} ${this.currentUser.userInfos.lastName}`,
        text: text,
        data: new Date().getTime() 
      })
      this.firestore.collection(this.whichContentShouldLoad[0]).doc(this.whichContentShouldLoad[1]).update({
        'messages': this.doc.messages
      });
    }
      // console.log(this.doc.messages)
    // console.log(this.currentUser)


    this.editor.setContent('');
  }
}
