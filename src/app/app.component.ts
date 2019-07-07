import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component';
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

  constructor(private store: Store<EventsState>, private dialog: MatDialog) {}

  onAddEvent(eventName: string) {
    this.store.dispatch(add({ name: eventName }));
  }

  openAddEventDialog() {
    const dialogRef = this.dialog.open(AddEventDialogComponent, { width: '600px' });

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((eventName: string | undefined) => {
        if (eventName) {
          this.store.dispatch(add({ name: eventName }));
        }
      });
  }
}
