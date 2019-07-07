import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  onDuplicate() {
    this.duplicate.emit(this.event.id);
  }
  onRemove() {
    this.remove.emit(this.event.id);
  }
}
