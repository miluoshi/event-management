import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../event-data';

@Component({
  selector: 'app-event-list-item',
  styleUrls: ['./event-list-item.component.scss'],
  templateUrl: './event-list-item.component.html'
})
export class EventListItemComponent implements OnInit {
  @Input() event: Event;

  constructor() {}

  ngOnInit() {}
}
