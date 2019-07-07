import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getUniqueAuthors } from '../helpers';
import { Event, EventsState } from './event.reducer';

const getEventsState = createFeatureSelector<EventsState>('event');

export const getEvents = createSelector(
  getEventsState,
  ({ events }) => {
    const eventsArray = Object.keys(events).map((id) => events[id]);
    // Sort by start time ascending
    return eventsArray.sort((a, b) => a.timeStart.getTime() - b.timeStart.getTime());
  }
);

export const getAllAuthors = createSelector(
  getEvents,
  (events) => getUniqueAuthors(events)
);

export const getAuthorFilter = createSelector(
  getEventsState,
  (state) => state.authorFilter
);
const getTextFilter = createSelector(
  getEventsState,
  (state) => state.eventTextFilter.toLocaleLowerCase()
);

/** Returns event predicate for given filters which returns true if the event matches those filters. */
const eventMatches = (textFilter: string, authorFilter: string[]) => (event: Event) =>
  (event.name.toLocaleLowerCase().includes(textFilter) ||
    event.description.toLocaleLowerCase().includes(textFilter) ||
    event.location.toLocaleLowerCase().includes(textFilter)) &&
  authorFilter.includes(event.author);

export const getFilteredEvents = createSelector(
  getEvents,
  getTextFilter,
  getAuthorFilter,
  (events, textFilter, authorFilter) => events.filter(eventMatches(textFilter, authorFilter))
);

export interface GroupedEvents {
  past: Event[];
  current: Event[];
  future: Event[];
}
export const getGroupedFilteredEvents = createSelector(
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
