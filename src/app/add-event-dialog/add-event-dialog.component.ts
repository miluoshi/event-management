import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-event-dialog',
  styleUrls: ['./add-event-dialog.component.scss'],
  templateUrl: './add-event-dialog.component.html'
})
export class AddEventDialogComponent {
  eventName = new FormControl('');

  constructor(private dialogRef: MatDialogRef<AddEventDialogComponent>) {}

  onClickAddEvent() {
    this.dialogRef.close(this.eventName.value);
  }
}
