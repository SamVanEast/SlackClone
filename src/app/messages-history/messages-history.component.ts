import { Component, Input, HostListener, OnChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Editor } from 'ngx-editor';

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
  @Input() public whichContentShouldLoad;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) {
    this.route.params.subscribe((params) => {
      this.currentUserId = params['id'];
    });
  }

  ngOnChanges() {
    console.log(this.whichContentShouldLoad);

    // console.log('funktioniert');
    // this.firestore.collection(this.whichContentShouldLoad[0]).doc(this.whichContentShouldLoad[1]).valueChanges().subscribe((doc: any) => {

    // });
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  loadMessageHistory(communicationSection, id) {

  }

  ngOnDestroy(): void {
    this.editor?.destroy();
  }


}
