import { Component, Input, HostListener, OnChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Editor } from 'ngx-editor';
import { channels } from 'src/models/channels';

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

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) {
    this.whichContentShouldLoad = [];
    this.route.params.subscribe((params) => {
      this.currentUserId = params['id'];
    });
  }

  ngOnChanges() {
    if (this.whichContentShouldLoad !== undefined && this.whichContentShouldLoad.length > 0) {
      console.log(this.whichContentShouldLoad);
      
      this.firestore.collection(this.whichContentShouldLoad[0]).doc(this.whichContentShouldLoad[1]).valueChanges().subscribe((doc: any) => {
        this.doc = doc;
      });
    }
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
  }


}
