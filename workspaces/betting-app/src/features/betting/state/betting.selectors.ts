import { createSelector } from "reselect";
import { EventType } from "shared/types";

export type SportGroup = {
  sportName: string;
  events: EventType[];
};

export type CountryGroup = {
  countryName: string;
  events: EventType[];
};

const selectFeed = (feed: EventType[] = []) => feed;

const groupFeedBySport = createSelector([selectFeed], (feed) =>
  feed.reduce<Record<string, EventType[]>>((acc, ev) => {
    const key = ev.category1Name || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(ev);
    return acc;
  }, {}),
);

export const selectSportGroups = createSelector([groupFeedBySport], (map) =>
  Object.entries(map).map(([sportName, evs]) => ({ sportName, events: evs })),
);

const groupEventsByCountry = createSelector(
  [selectFeed, (_: EventType[] = [], sportName?: string) => sportName],
  (events, sportName) => {
    const filtered = sportName
      ? events.filter((e) => (e.category1Name || "Other") === sportName)
      : events;
    return filtered.reduce<Record<string, EventType[]>>((acc, ev) => {
      const key = ev.category2Name || "Other";
      if (!acc[key]) acc[key] = [];
      acc[key].push(ev);
      return acc;
    }, {});
  },
);

export const selectCountryGroups = createSelector(
  [groupEventsByCountry],
  (map) =>
    Object.entries(map).map(([countryName, evs]) => ({
      countryName,
      events: evs,
    })),
);

export const mapEventsById = createSelector([selectFeed], (events) =>
  events.reduce<Record<number, EventType>>((acc, ev) => {
    acc[ev.eventId] = ev;
    return acc;
  }, {}),
);

export const getEventGames = createSelector(
  [(ev?: EventType) => ev],
  (event) => (event ? event.eventGames : []),
);
