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
  const sportIds = bettingApi.endpoints.getEvents.select()(state)?.data?.sportIds || [];
  return sportIds;
});

export const selectCountryIds = createSelector([selectState, (_, sportId: number) => sportId], (state, sportId) => {
  const countryIds = bettingApi.endpoints.getEvents.select()(state)?.data?.sports[sportId]?.countryIds || [];
  return countryIds;
});

export const selectSportName = createSelector([selectState, (_, sportId: number) => sportId], (state, sportId) => {
  const sportName = bettingApi.endpoints.getEvents.select()(state)?.data?.sports[sportId]?.sportName || "Unknown";
  return sportName;
});

export const selectCountryName = createSelector(
  [selectState, (_, sportId: number) => sportId, (_, __, countryId: number) => countryId],
  (state, sportId, countryId) => {
    const countryName =
      bettingApi.endpoints.getEvents.select()(state)?.data?.sports[sportId]?.countries[countryId]?.countryName ||
      "Unknown";
    return countryName;
  },
);

export const selectEventsIds = createSelector(
  [selectState, (_, sportId: number) => sportId, (_, __, countryId: number) => countryId],
  (state, sportId, countryId) => {
    const eventsIds =
      bettingApi.endpoints.getEvents.select()(state)?.data?.sports[sportId]?.countries[countryId]?.eventIds || [];
    return eventsIds;
  },
);

export const selectEventsLength = createSelector(
  [selectState, (_, sportId: number) => sportId, (_, __, countryId: number) => countryId],
  (state, sportId, countryId) => {
    const eventsIds =
      bettingApi.endpoints.getEvents.select()(state)?.data?.sports[sportId]?.countries[countryId]?.eventIds || [];
    const eventsLength = eventsIds.length;
    return eventsLength;
  },
);

export const selectGamesIds = createSelector(
  [
    selectState,
    (_, sportId: number) => sportId,
    (_, __, countryId: number) => countryId,
    (_, __, ___, eventId: number) => eventId,
  ],
  (state, sportId, countryId, eventId) => {
    const gamesIds =
      bettingApi.endpoints.getEvents.select()(state)?.data?.sports[sportId]?.countries[countryId]?.events[eventId]
        ?.gamesIds || [];
    return gamesIds;
  },
);

export const selectEventName = createSelector(
  [
    selectState,
    (_, sportId: number) => sportId,
    (_, __, countryId: number) => countryId,
    (_, __, ___, eventId: number) => eventId,
  ],
  (state, sportId, countryId, eventId) => {
    const eventName =
      bettingApi.endpoints.getEvents.select()(state)?.data?.sports[sportId]?.countries[countryId]?.events[eventId]
        ?.eventName || "Unknown";
    return eventName;
  },
);

export const selectOutcomesIds = createSelector(
  [
    selectState,
    (_, sportId: number) => sportId,
    (_, __, countryId: number) => countryId,
    (_, __, ___, eventId: number) => eventId,
    (_, __, ___, ____, gameId: number) => gameId,
  ],
  (state, sportId, countryId, eventId, gameId) => {
    const outcomesIds =
      bettingApi.endpoints.getEvents.select()(state)?.data?.sports[sportId]?.countries[countryId]?.events[eventId]
        ?.games[gameId]?.outcomesIds || [];
    return outcomesIds;
  },
);

export const selectGameName = createSelector(
  [
    selectState,
    (_, sportId: number) => sportId,
    (_, __, countryId: number) => countryId,
    (_, __, ___, eventId: number) => eventId,
    (_, __, ___, ____, gameId: number) => gameId,
  ],
  (state, sportId, countryId, eventId, gameId) => {
    const gameName =
      bettingApi.endpoints.getEvents.select()(state)?.data?.sports[sportId]?.countries[countryId]?.events[eventId]
        ?.games[gameId]?.gameName || "Unknown";
    return gameName;
  },
);

export const selectOutcome = createSelector(
  [
    selectState,
    (_, sportId: number) => sportId,
    (_, __, countryId: number) => countryId,
    (_, __, ___, eventId: number) => eventId,
    (_, __, ___, ____, gameId: number) => gameId,
    (_, __, ___, ____, _____, outcomeId: number) => outcomeId,
  ],
  (state, sportId, countryId, eventId, gameId, outcomeId) => {
    const outcome =
      bettingApi.endpoints.getEvents.select()(state)?.data?.sports[sportId]?.countries[countryId]?.events[eventId]
        ?.games[gameId]?.outcomes[outcomeId] || null;
    return outcome;
  },
);

// ---

export type CouponSelection = { gameId: number; outcomeId: number };
export type ResolvedCouponItem = {
  gameId: number;
  outcomeId: number;
  eventName: string;
  outcomeName: string;
  odds: number;
};

export const selectResolvedCoupon = createSelector(
  [(events: EventType[] = []) => events, (events: EventType[] = [], coupon: CouponSelection[] = []) => coupon],
  (events, coupon) => {
    return (
      coupon.map((c) => {
        const ev = events.find((e) => e.eventGames.some((g) => g.gameId === c.gameId));
        const game = ev?.eventGames.find((g) => g.gameId === c.gameId);
        const outcome = game?.outcomes.find((o) => o.outcomeId === c.outcomeId);
        return {
          ...c,
          eventName: ev?.eventName ?? "Unknown",
          outcomeName: outcome?.outcomeName ?? "-",
          odds: outcome?.outcomeOdds ?? 0,
        } as ResolvedCouponItem;
      }) || []
    );
  },
) as unknown as (events: EventType[], coupon: CouponSelection[]) => ResolvedCouponItem[];

export const selectCouponTotal = createSelector([(resolved: ResolvedCouponItem[] = []) => resolved], (resolved) =>
  resolved.reduce((acc, r) => acc * (r.odds || 1), 1),
) as unknown as (resolved: ResolvedCouponItem[]) => number;

export const selectResolvedLength = createSelector(
  [(events: EventType[] = []) => events, (events: EventType[] = [], coupon: CouponSelection[] = []) => coupon],
  (events, coupon) => {
    return (
      coupon.filter((c) => {
        const ev = events.find((e) => e.eventGames.some((g) => g.gameId === c.gameId));
        const game = ev?.eventGames.find((g) => g.gameId === c.gameId);
        const outcome = game?.outcomes.find((o) => o.outcomeId === c.outcomeId);
        return Boolean(outcome);
      }).length || 0
    );
  },
) as unknown as (events: EventType[], coupon: CouponSelection[]) => number;

export const selectResolvedCouponItem = () =>
  createSelector(
    [
      (events: EventType[] = []) => events,
      (_: any, gameId: number) => gameId,
      (_: any, _g: number, outcomeId: number) => outcomeId,
    ],
    (events, gameId, outcomeId) => {
      const ev = events.find((e) => e.eventGames.some((g) => g.gameId === gameId));
      const game = ev?.eventGames.find((g) => g.gameId === gameId);
      const outcome = game?.outcomes.find((o) => o.outcomeId === outcomeId);
      return {
        gameId,
        outcomeId,
        eventName: ev?.eventName ?? "Unknown",
        outcomeName: outcome?.outcomeName ?? "-",
        odds: outcome?.outcomeOdds ?? 0,
      } as ResolvedCouponItem;
    },
  );
