import { createReducer, createSelector, on } from '@ngrx/store';
import * as actions from './app.actions';
import { Event, EventMap, mockEvents, nextEventId } from './event-data';
import { generateEvent, normalizeEventsData } from './helpers';

// === STATE ===
export interface AppState {
  event: EventsState;
}

export interface EventsState {
  authorFilter: string | null;
  eventTextFilter: string;
  events: EventMap;
  nextId: number;
}

export const initialState: EventsState = {
  authorFilter: null,
  eventTextFilter: '',
  events: normalizeEventsData(mockEvents),
  nextId: nextEventId
};

// === REDUCER ===
export const eventReducer = createReducer(
  initialState,
  on(actions.filterByAuthor, (state, { author }) => ({ ...state, authorFilter: author })),
  on(actions.filterByText, (state, { text }) => ({ ...state, eventTextFilter: text })),
  // Add new event with given name and increment `nextId`
  on(actions.add, (state, { name }) => {
    const newEvent: Event = generateEvent(state.nextId, name);
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

// === SELECTORS ===
export const getEventsState = (state: AppState) => state.event;

export const getEvents = createSelector(
  getEventsState,
  ({ events }) => {
    const eventsArray = Object.keys(events).map((id) => events[id]);
    // Sort by start time ascending
    return eventsArray.sort((a, b) => a.timeStart.getTime() - b.timeStart.getTime());
  }
);

const getTextFilter = createSelector(
  getEventsState,
  (state) => state.eventTextFilter.toLocaleLowerCase()
);

export const getFilteredEvents = createSelector(
  getEvents,
  getTextFilter,
  (events, textFilter) =>
    events.filter(
      (event) =>
        event.name.toLocaleLowerCase().includes(textFilter) ||
        event.description.toLocaleLowerCase().includes(textFilter) ||
        event.location.toLocaleLowerCase().includes(textFilter)
    )
);

export interface GroupedEvents {
  past: Event[];
  current: Event[];
  future: Event[];
}
export const getGroupedEvents = createSelector(
  getFilteredEvents,
  (events) => {
    const groupedEvents: GroupedEvents = { past: [], current: [], future: [] };
    const isPast = (event: Event) => event.timeEnd.getTime() < Date.now();
    const isFuture = (event: Event) => event.timeStart.getTime() > Date.now();

    events.forEach((event) => {
      if (isPast(event)) {
        groupedEvents.past.push(event);
      } else if (isFuture(event)) {
        groupedEvents.future.push(event);
      } else {
        groupedEvents.current.push(event);
      }
    });

    return groupedEvents;
  }
);
