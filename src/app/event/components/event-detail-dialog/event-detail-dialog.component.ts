import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Event } from '../../store/event.reducer';

@Component({
  selector: 'app-event-detail-dialog',
  styleUrls: ['./event-detail-dialog.component.scss'],
  templateUrl: './event-detail-dialog.component.html'
})
export class EventDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public event: Event) {}
}
