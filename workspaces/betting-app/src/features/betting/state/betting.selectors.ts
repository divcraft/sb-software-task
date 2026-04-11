import { createSelector } from "@reduxjs/toolkit";
import { bettingApi } from "features/betting";
import { RootState } from "store";

const selectState = (state: RootState) => state;

// sports

export const selectSportIds = createSelector([selectState], (state) => {
  const sportsIds = Object.keys(bettingApi.endpoints.getEvents.select()(state)?.data?.sports || {}).map(Number) || [];
  return sportsIds;
});

export const selectSportName = createSelector([selectState, (_, sportId: number) => sportId], (state, sportId) => {
  const sportName = bettingApi.endpoints.getEvents.select()(state)?.data?.sports[sportId]?.name || "Unknown";
  return sportName;
});

// countries

export const selectCountryIds = createSelector([selectState, (_, sportId: number) => sportId], (state, sportId) => {
  const countryIds = bettingApi.endpoints.getEvents.select()(state)?.data?.sports[sportId]?.countryIds || [];
  return countryIds;
});

export const selectCountryName = createSelector(
  [selectState, (_, countryId: number) => countryId],
  (state, countryId) => {
    const countryName = bettingApi.endpoints.getEvents.select()(state)?.data?.countries[countryId]?.name || "Unknown";
    return countryName;
  },
);

// events

export const selectEventsIds = createSelector(
  [selectState, (_, countryId: number) => countryId],
  (state, countryId) => {
    const eventsIds = bettingApi.endpoints.getEvents.select()(state)?.data?.countries[countryId]?.eventIds || [];
    return eventsIds;
  },
);

export const selectEventsLength = createSelector(
  [selectState, (_, countryId: number) => countryId],
  (state, countryId) => {
    const eventsIds = bettingApi.endpoints.getEvents.select()(state)?.data?.countries[countryId]?.eventIds.length || 0;
    return eventsIds;
  },
);

// events

export const selectEventName = createSelector([selectState, (_, eventId: number) => eventId], (state, eventId) => {
  const eventName = bettingApi.endpoints.getEvents.select()(state)?.data?.events[eventId]?.name || "Unknown";
  return eventName;
});

export const selectEventNameByOutcomeId = createSelector(
  [selectState, (_, outcomeId: number) => outcomeId],
  (state, outcomeId) => {
    const outcome = bettingApi.endpoints.getEvents.select()(state)?.data?.outcomes[outcomeId];
    const event = bettingApi.endpoints.getEvents.select()(state)?.data?.events[outcome?.eventId ?? 0];
    return event?.name || "Unknown";
  },
);

// games

export const selectGamesIds = createSelector([selectState, (_, eventId: number) => eventId], (state, eventId) => {
  const gamesIds = bettingApi.endpoints.getEvents.select()(state)?.data?.events[eventId]?.gameIds || [];
  return gamesIds;
});

export const selectGameName = createSelector([selectState, (_, gameId: number) => gameId], (state, gameId) => {
  const gameName = bettingApi.endpoints.getEvents.select()(state)?.data?.games[gameId]?.name || "Unknown";
  return gameName;
});

// outcomes

export const selectOutcomesIds = createSelector([selectState, (_, gameId: number) => gameId], (state, gameId) => {
  const outcomesIds = bettingApi.endpoints.getEvents.select()(state)?.data?.games[gameId]?.outcomeIds || [];
  return outcomesIds;
});

export const selectOutcomeName = createSelector(
  [selectState, (_, outcomeId: number) => outcomeId],
  (state, outcomeId) => {
    const outcomeName = bettingApi.endpoints.getEvents.select()(state)?.data?.outcomes[outcomeId]?.name || "Unknown";
    return outcomeName;
  },
);

export const selectOutcomeOdds = createSelector(
  [selectState, (_, outcomeId: number) => outcomeId],
  (state, outcomeId) => {
    const outcomeOdds = bettingApi.endpoints.getEvents.select()(state)?.data?.outcomes[outcomeId]?.odds || 0;
    return outcomeOdds.toFixed(2);
  },
);
