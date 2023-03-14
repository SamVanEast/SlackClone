import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-member-to-group',
  templateUrl: './dialog-add-member-to-group.component.html',
  styleUrls: ['./dialog-add-member-to-group.component.scss']
})
export class DialogAddMemberToGroupComponent {


  constructor(private dialogRef: MatDialogRef<DialogAddMemberToGroupComponent>) {

  }

  loading = false;


  ngOnInit(): void {
    
  }


  save() {}

  closeDialogAddMember() {
    this.dialogRef.close();
  }
}
