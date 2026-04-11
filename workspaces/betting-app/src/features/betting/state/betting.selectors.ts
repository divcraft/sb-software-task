import { createSelector } from "@reduxjs/toolkit";
import { EventType } from "shared/types";
import { RootState } from "store";
import { bettingApi } from "../api/betting.api";

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
  const sportsIds = bettingApi.endpoints.getEvents.select()(state)?.data?.sports.ids || [];
  return sportsIds;
});

export const selectCountryIds = createSelector([selectState, (_, sportId: number) => sportId], (state, sportId) => {
  const countryIds = bettingApi.endpoints.getEvents.select()(state)?.data?.sports.records[sportId]?.countryIds || [];
  return countryIds;
});

export const selectSportName = createSelector([selectState, (_, sportId: number) => sportId], (state, sportId) => {
  const sportName = bettingApi.endpoints.getEvents.select()(state)?.data?.sports.records[sportId]?.name || "Unknown";
  return sportName;
});

export const selectCountryName = createSelector(
  [selectState, (_, countryId: number) => countryId],
  (state, countryId) => {
    const countryName =
      bettingApi.endpoints.getEvents.select()(state)?.data?.countries.records[countryId]?.name || "Unknown";
    return countryName;
  },
);

export const selectEventsIds = createSelector(
  [selectState, (_, countryId: number) => countryId],
  (state, countryId) => {
    const eventsIds =
      bettingApi.endpoints.getEvents.select()(state)?.data?.countries.records[countryId]?.eventIds || [];
    return eventsIds;
  },
);

export const selectEventsLength = createSelector(
  [selectState, (_, countryId: number) => countryId],
  (state, countryId) => {
    const eventsIds =
      bettingApi.endpoints.getEvents.select()(state)?.data?.countries.records[countryId]?.eventIds.length || 0;
    return eventsIds;
  },
);

export const selectGamesIds = createSelector([selectState, (_, eventId: number) => eventId], (state, eventId) => {
  const gamesIds = bettingApi.endpoints.getEvents.select()(state)?.data?.events.records[eventId]?.gameIds || [];
  return gamesIds;
});

export const selectEventName = createSelector([selectState, (_, eventId: number) => eventId], (state, eventId) => {
  const eventName = bettingApi.endpoints.getEvents.select()(state)?.data?.events.records[eventId]?.name || "Unknown";
  return eventName;
});

export const selectOutcomesIds = createSelector([selectState, (_, gameId: number) => gameId], (state, gameId) => {
  const outcomesIds = bettingApi.endpoints.getEvents.select()(state)?.data?.games.records[gameId]?.outcomeIds || [];
  return outcomesIds;
});

export const selectGameName = createSelector([selectState, (_, gameId: number) => gameId], (state, gameId) => {
  const gameName = bettingApi.endpoints.getEvents.select()(state)?.data?.games.records[gameId]?.name || "Unknown";
  return gameName;
});

export const selectOutcome = createSelector([selectState, (_, outcomeId: number) => outcomeId], (state, outcomeId) => {
  const outcome = bettingApi.endpoints.getEvents.select()(state)?.data?.outcomes.records[outcomeId] || null;
  return outcome;
});

// ---

export type CouponSelection = { gameId: number; outcomeId: number };

export type ResolvedCouponItem = {
  gameId: number;
  outcomeId: number;
  eventName: string;
  outcomeName: string;
  odds: number;
};

export const selectResolvedCouponLength = createSelector([selectState], (state) => {
  const events = bettingApi.endpoints.getEvents.select()(state)?.data?.events || [];
  const coupons = state.betting.couponOutcomesIds;
  return (
    coupons.filter((c) => {
      const ev = events.find((e) => e.eventGames.some((g) => g.gameId === c.gameId));
      const game = ev?.eventGames.find((g) => g.gameId === c.gameId);
      const outcome = game?.outcomes.find((o) => o.outcomeId === c.outcomeId);
      return Boolean(outcome);
    }).length || 0
  );
});

export const selectCouponTotal = createSelector([selectState], (state) => {
  const events = bettingApi.endpoints.getEvents.select()(state)?.data?.events || [];
  const coupon = state.betting.couponOutcomesIds;
  const resolved = coupon.map((c) => {
    const ev = events.find((e) => e.eventGames.some((g) => g.gameId === c.gameId));
    const game = ev?.eventGames.find((g) => g.gameId === c.gameId);
    const outcome = game?.outcomes.find((o) => o.outcomeId === c.outcomeId);
    return outcome?.outcomeOdds ?? 1;
  });
  return resolved.reduce((acc, odds) => acc * odds, 1);
});

export const selectResolvedCouponItem = () =>
  createSelector(
    [selectState, (_: any, gameId: number) => gameId, (_: any, _g: number, outcomeId: number) => outcomeId],
    (state, gameId, outcomeId) => {
      const events = bettingApi.endpoints.getEvents.select()(state)?.data?.events || [];

      const ev = events.find((e) => e.eventGames.some((g) => g.gameId === gameId));
      const game = ev?.eventGames.find((g) => g.gameId === gameId);
      const outcome = game?.outcomes.find((o) => o.outcomeId === outcomeId);
      return {
        gameId,
        outcomeId,
        eventName: ev?.eventName ?? "Unknown",
        outcomeName: outcome?.outcomeName ?? "-",
        odds: outcome?.outcomeOdds ?? 0,
      };
    },
  );
