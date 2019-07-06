import { createReducer, on } from '@ngrx/store';
import { generateEvent, getUniqueAuthors, normalizeEventsData } from '../helpers';
import * as actions from './event.actions';
import { mockEvents, nextEventId } from './mock-event-data';

// === STATE DEFINITIONS ===
export interface Event {
  id: number;
  name: string;
  description: string | undefined;
  timeStart: Date;
  timeEnd: Date;
  location: string;
  author: string;
}

export interface EventMap {
  [id: string]: Event;
}

export interface AppState {
  event: EventsState;
}

export interface EventsState {
  authorFilter: string[];
  eventTextFilter: string;
  events: EventMap;
  nextId: number;
}

export const initialState: EventsState = {
  authorFilter: getUniqueAuthors(mockEvents),
  eventTextFilter: '',
  events: normalizeEventsData(mockEvents),
  nextId: nextEventId
};

// === REDUCER ===
export const eventReducer = createReducer(
  initialState,
  on(actions.filterByAuthor, (state, { authors }) => ({ ...state, authorFilter: authors })),
  on(actions.filterByText, (state, { text }) => ({ ...state, eventTextFilter: text })),
  // Add new event with given name and increment `nextId`
  on(actions.add, (state, { name }) => {
    const newEvent: Event = generateEvent(state.nextId, name.trim());
    const events = { ...state.events, [newEvent.id]: newEvent };
    return {
      ...state,
      events,
      nextId: state.nextId + 1
    };
  }),
  on(actions.duplicate, (state, { id }) => {
    const duplicatedEvent = { ...state.events[id], id: state.nextId };
    const events = { ...state.events, [state.nextId]: duplicatedEvent };
    return { ...state, events, nextId: state.nextId + 1 };
  }),
  on(actions.remove, (state, { id }) => {
    const { [id]: _removedEvent, ...events } = state.events;
    return { ...state, events };
  })
);
