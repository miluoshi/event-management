import { Component } from '@angular/core';
import { currentUser } from './helpers';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'slido-event-management';
  currentUser = currentUser;
}
