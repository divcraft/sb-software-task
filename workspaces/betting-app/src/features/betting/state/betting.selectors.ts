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

const selectFeedBySport = createSelector([selectFeed], (feed) =>
  feed.reduce<Record<string, EventType[]>>((acc, ev) => {
    const key = ev.category1Name || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(ev);
    return acc;
  }, {}),
);

export const selectSportGroups = createSelector([selectFeedBySport], (map) =>
  Object.entries(map).map(([sportName, evs]) => ({ sportName, events: evs })),
);

const selectEventsByCountry = createSelector(
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
  [selectEventsByCountry],
  (map) =>
    Object.entries(map).map(([countryName, evs]) => ({
      countryName,
      events: evs,
    })),
);

export const selectEventsById = createSelector([selectFeed], (events) =>
  events.reduce<Record<number, EventType>>((acc, ev) => {
    acc[ev.eventId] = ev;
    return acc;
  }, {}),
);

export const selectEventGames = createSelector(
  [(ev?: EventType) => ev],
  (event) => (event ? event.eventGames : []),
);

export type CouponSelection = { gameId: number; outcomeId: number };
export type ResolvedCouponItem = {
  gameId: number;
  outcomeId: number;
  eventName: string;
  outcomeName: string;
  odds: number;
};

export const selectResolvedCoupon = createSelector(
  [
    (events: EventType[] = []) => events,
    (events: EventType[] = [], coupon: CouponSelection[] = []) => coupon,
  ],
  (events, coupon) => {
    return (
      coupon.map((c) => {
        const ev = events.find((e) =>
          e.eventGames.some((g) => g.gameId === c.gameId),
        );
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
) as unknown as (
  events: EventType[],
  coupon: CouponSelection[],
) => ResolvedCouponItem[];

export const selectCouponTotal = createSelector(
  [(resolved: ResolvedCouponItem[] = []) => resolved],
  (resolved) => resolved.reduce((acc, r) => acc * (r.odds || 1), 1),
) as unknown as (resolved: ResolvedCouponItem[]) => number;

export const selectResolvedLength = createSelector(
  [
    (events: EventType[] = []) => events,
    (events: EventType[] = [], coupon: CouponSelection[] = []) => coupon,
  ],
  (events, coupon) => {
    return (
      coupon.filter((c) => {
        const ev = events.find((e) =>
          e.eventGames.some((g) => g.gameId === c.gameId),
        );
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
      const ev = events.find((e) =>
        e.eventGames.some((g) => g.gameId === gameId),
      );
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
