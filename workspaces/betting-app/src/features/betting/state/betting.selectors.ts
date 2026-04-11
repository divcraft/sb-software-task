import { createSelector } from "@reduxjs/toolkit";
import { EventType } from "shared/types";
import { RootState } from "store";
import { bettingApi } from "features/betting";

export type SportGroup = {
  sportName: string;
  events: EventType[];
};

export type CountryGroup = {
  countryName: string;
  events: EventType[];
};

const selectState = (state: RootState) => state;

export const selectIsLoading = createSelector([selectState], (state) => {
  const isLoading = bettingApi.endpoints.getEvents.select()(state)?.isLoading ?? false;
  return isLoading;
});

export const selectIsError = createSelector([selectState], (state) => {
  const isError = bettingApi.endpoints.getEvents.select()(state)?.isError ?? false;
  return isError;
});

export const selectSportIds = createSelector([selectState], (state) => {
  const sportsIds = Object.keys(bettingApi.endpoints.getEvents.select()(state)?.data?.sports || {}).map(Number) || [];
  return sportsIds;
});

export const selectCountryIds = createSelector([selectState, (_, sportId: number) => sportId], (state, sportId) => {
  const countryIds = bettingApi.endpoints.getEvents.select()(state)?.data?.sports[sportId]?.countryIds || [];
  return countryIds;
});

export const selectSportName = createSelector([selectState, (_, sportId: number) => sportId], (state, sportId) => {
  const sportName = bettingApi.endpoints.getEvents.select()(state)?.data?.sports[sportId]?.name || "Unknown";
  return sportName;
});

export const selectCountryName = createSelector(
  [selectState, (_, countryId: number) => countryId],
  (state, countryId) => {
    const countryName = bettingApi.endpoints.getEvents.select()(state)?.data?.countries[countryId]?.name || "Unknown";
    return countryName;
  },
);

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

export const selectGamesIds = createSelector([selectState, (_, eventId: number) => eventId], (state, eventId) => {
  const gamesIds = bettingApi.endpoints.getEvents.select()(state)?.data?.events[eventId]?.gameIds || [];
  return gamesIds;
});

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

export const selectOutcomesIds = createSelector([selectState, (_, gameId: number) => gameId], (state, gameId) => {
  const outcomesIds = bettingApi.endpoints.getEvents.select()(state)?.data?.games[gameId]?.outcomeIds || [];
  return outcomesIds;
});

export const selectGameName = createSelector([selectState, (_, gameId: number) => gameId], (state, gameId) => {
  const gameName = bettingApi.endpoints.getEvents.select()(state)?.data?.games[gameId]?.name || "Unknown";
  return gameName;
});

export const selectOutcome = createSelector([selectState, (_, outcomeId: number) => outcomeId], (state, outcomeId) => {
  const outcome = bettingApi.endpoints.getEvents.select()(state)?.data?.outcomes[outcomeId] || null;
  return outcome;
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
