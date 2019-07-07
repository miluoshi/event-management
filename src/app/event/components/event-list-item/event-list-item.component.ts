import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Event } from '../../store/event.reducer';
import { EventDetailDialogComponent } from '../event-detail-dialog/event-detail-dialog.component';

@Component({
  selector: 'app-event-list-item',
  styleUrls: ['./event-list-item.component.scss'],
  templateUrl: './event-list-item.component.html'
})
export class EventListItemComponent {
  @Input() event: Event;
  @Output() duplicate = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  constructor(private dialog: MatDialog) {}

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
