import { Event, EventMap } from './event-store/event.reducer';

export const currentUser = 'demo';

export function normalizeEventsData(events: Event[]): EventMap {
  // It's defined beforehand to prevent TSlint error no-object-literal-type-assertion
  const defaultEventMap: EventMap = {};

  return events.reduce(
    (eventMap, event) => ({
      ...eventMap,
      [event.id]: event
    }),
    defaultEventMap
  );
}

/**
 * Generates an event with given `id` and `name` created by current user
 * starting from now and ending in 2 hours.
 */
export function generateEvent(id: number, name: string): Event {
  const timeStart = new Date();
  const timeEnd = new Date(timeStart);
  timeEnd.setHours(timeStart.getHours() + 2);

  return {
    author: currentUser,
    description: 'random description',
    id,
    location: 'Bratislava',
    name,
    timeEnd,
    timeStart
  };
}

/** Returns array of unique author ids from all events */
export function getUniqueAuthors(events: Event[]) {
  const authors = events.map((e) => e.author);

  return Array.from(new Set(authors));
}
