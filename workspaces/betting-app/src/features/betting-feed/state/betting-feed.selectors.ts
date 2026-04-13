import { createSelector } from "@reduxjs/toolkit";
import { bettingFeedApi } from "features/betting-feed";
import { RootState } from "store";

const selectState = (state: RootState) => state;

export const selectBettingFeed = createSelector([selectState], (state) => {
  const bettingFeed = bettingFeedApi.endpoints.getBettingFeed.select()(state)?.data ?? null;
  return bettingFeed;
});

// sports

export const selectSportIds = createSelector([selectState], (state) => {
  const bettingFeed = selectBettingFeed(state);
  const sportsIds = Object.keys(bettingFeed?.sports ?? {}).map(Number) ?? [];
  return sportsIds;
});

export const selectSportName = createSelector([selectState, (_, sportId: number) => sportId], (state, sportId) => {
  const bettingFeed = selectBettingFeed(state);
  const sportName = bettingFeed?.sports[sportId]?.name ?? "Unknown";
  return sportName;
});

// countries

export const selectCountryIds = createSelector([selectState, (_, sportId: number) => sportId], (state, sportId) => {
  const bettingFeed = selectBettingFeed(state);
  const countryIds = bettingFeed?.sports[sportId]?.countryIds ?? [];
  return countryIds;
});

export const selectCountryName = createSelector(
  [selectState, (_, countryId: number) => countryId],
  (state, countryId) => {
    const bettingFeed = selectBettingFeed(state);
    const countryName = bettingFeed?.countries[countryId]?.name ?? "Unknown";
    return countryName;
  },
);

// events

export const selectEventsIds = createSelector(
  [selectState, (_, countryId: number) => countryId],
  (state, countryId) => {
    const bettingFeed = selectBettingFeed(state);
    const eventsIds = bettingFeed?.countries[countryId]?.eventIds ?? [];
    return eventsIds;
  },
);

export const selectEventsLength = createSelector(
  [selectState, (_, countryId: number) => countryId],
  (state, countryId) => {
    const bettingFeed = selectBettingFeed(state);
    const eventsIds = bettingFeed?.countries[countryId]?.eventIds.length ?? 0;
    return eventsIds;
  },
);

// events

export const selectEventName = createSelector([selectState, (_, eventId: number) => eventId], (state, eventId) => {
  const bettingFeed = selectBettingFeed(state);
  const eventName = bettingFeed?.events[eventId]?.name ?? "Unknown";
  return eventName;
});

export const selectEventNameByOutcomeId = createSelector(
  [selectState, (_, outcomeId: number) => outcomeId],
  (state, outcomeId) => {
    const bettingFeed = selectBettingFeed(state);
    const outcome = bettingFeed?.outcomes[outcomeId];
    const event = bettingFeed?.events[outcome?.eventId ?? 0];
    return event?.name ?? "Unknown";
  },
);

// games

export const selectGamesIds = createSelector([selectState, (_, eventId: number) => eventId], (state, eventId) => {
  const bettingFeed = selectBettingFeed(state);
  const gamesIds = bettingFeed?.events[eventId]?.gameIds ?? [];
  return gamesIds;
});

export const selectGameName = createSelector([selectState, (_, gameId: number) => gameId], (state, gameId) => {
  const bettingFeed = selectBettingFeed(state);
  const gameName = bettingFeed?.games[gameId]?.name ?? "Unknown";
  return gameName;
});

// outcomes

export const selectOutcomesIds = createSelector([selectState, (_, gameId: number) => gameId], (state, gameId) => {
  const bettingFeed = selectBettingFeed(state);
  const outcomesIds = bettingFeed?.games[gameId]?.outcomeIds ?? [];
  return outcomesIds;
});

export const selectOutcomeName = createSelector(
  [selectState, (_, outcomeId: number) => outcomeId],
  (state, outcomeId) => {
    const bettingFeed = selectBettingFeed(state);
    const outcomeName = bettingFeed?.outcomes[outcomeId]?.name ?? "Unknown";
    return outcomeName;
  },
);

export const selectOutcomeOdds = createSelector(
  [selectState, (_, outcomeId: number) => outcomeId],
  (state, outcomeId) => {
    const bettingFeed = selectBettingFeed(state);
    const outcomeOdds = bettingFeed?.outcomes[outcomeId]?.odds.toFixed(2) ?? 0;
    return outcomeOdds;
  },
);
