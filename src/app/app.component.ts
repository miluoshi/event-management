import { Component } from '@angular/core';
import { currentUser } from './event/store/helpers';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  currentUser = currentUser;
}
