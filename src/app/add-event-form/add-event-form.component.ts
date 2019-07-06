import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-event-form',
  styleUrls: ['./add-event-form.component.scss'],
  templateUrl: './add-event-form.component.html'
})
export class AddEventFormComponent {
  @Output() addEvent = new EventEmitter();
  eventName = new FormControl('');

  constructor() {}

  onClickAddEvent() {
    this.addEvent.emit(this.eventName.value);
  }
}
