import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EventDetailDialogComponent } from '../event-detail-dialog/event-detail-dialog.component';
import { Event } from '../event-store/event.reducer';

@Component({
  selector: 'app-event-list-item',
  styleUrls: ['./event-list-item.component.scss'],
  templateUrl: './event-list-item.component.html'
})
export class EventListItemComponent {
  @Input() event: Event;
  @Output() duplicate = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  constructor(public dialog: MatDialog) {}

  openDetailDialog() {
    this.dialog.open(EventDetailDialogComponent, {
      data: this.event,
      width: '600px'
    });
  }

  onDuplicate() {
    this.duplicate.emit(this.event.id);
  }
  onRemove() {
    this.remove.emit(this.event.id);
  }
}
