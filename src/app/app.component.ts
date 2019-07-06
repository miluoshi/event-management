import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { add } from './event-store/event.actions';
import { EventsState } from './event-store/event.reducer';
import { currentUser } from './helpers';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'slido-event-management';
  currentUser = currentUser;

  constructor(private store: Store<EventsState>) {}

  onAddEvent(eventName: string) {
    this.store.dispatch(add({ name: eventName }));
  }
}
