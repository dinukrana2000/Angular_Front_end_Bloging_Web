import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogboxdelete',
  templateUrl: './dialogboxdelete.component.html',
  styleUrls: ['./dialogboxdelete.component.css']
})
export class DialogboxdeleteComponent {

  constructor(public dialogRef: MatDialogRef<DialogboxdeleteComponent>) { }
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
