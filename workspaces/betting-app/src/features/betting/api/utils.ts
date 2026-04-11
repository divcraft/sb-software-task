import { EventsResponseType } from "shared/types";

// ---

interface OutcomeType {
  id: number;
  gameId: number;
  eventId: number;
  countryId: number;
  sportId: number;
  name: string;
  odds: number;
  position: number;
}

interface GameType {
  id: number;
  eventId: number;
  countryId: number;
  sportId: number;
  name: string;
  type: number;
  outcomeIds: number[];
}

interface EventType {
  id: number;
  countryId: number;
  sportId: number;
  name: string;
  start: number;
  type: number;
  isCustomBetAvailable: boolean;
  gameIds: number[];
}

interface CountryType {
  id: number;
  sportId: number;
  name: string;
  eventIds: number[];
}

interface SportType {
  id: number;
  name: string;
  countryIds: number[];
}

// ---

export interface BettingStateType {
  sports: Record<number, SportType>;
  countries: Record<number, CountryType>;
  events: Record<number, EventType>;
  games: Record<number, GameType>;
  outcomes: Record<number, OutcomeType>;
}

export const convertToStateType = (eventsRes: EventsResponseType): BettingStateType => {
  const sports: BettingStateType["sports"] = {};
  const countries: BettingStateType["countries"] = {};
  const events: BettingStateType["events"] = {};
  const games: BettingStateType["games"] = {};
  const outcomes: BettingStateType["outcomes"] = {};

  eventsRes.forEach((event) => {
    const sportId = event.category1Id;
    const countryId = event.category2Id;
    const eventId = event.eventId;

    if (!sports[sportId]) {
      sports[sportId] = {
        id: sportId,
        name: event.category1Name,
        countryIds: [],
      };
    }

    const countryIds = sports[sportId].countryIds;
    if (!countryIds.includes(countryId)) {
      countryIds.push(countryId);
    }

    if (!countries[countryId]) {
      countries[countryId] = {
        id: countryId,
        sportId,
        name: event.category2Name,
        eventIds: [],
      };
    }

    const eventIds = countries[countryId].eventIds;
    if (!eventIds.includes(eventId)) {
      eventIds.push(eventId);
    }

    if (!events[eventId]) {
      events[eventId] = {
        id: eventId,
        sportId,
        countryId,
        name: event.eventName,
        start: event.eventStart,
        type: event.eventType,
        isCustomBetAvailable: event.isCustomBetAvailable,
        gameIds: [],
      };
    }

    const gameIds = event.eventGames.map((g) => g.gameId);
    events[eventId].gameIds = gameIds;

    gameIds.forEach((gameId) => {
      const game = event.eventGames.find((g) => g.gameId === gameId);
      if (!game) return;
      games[gameId] = {
        id: gameId,
        eventId,
        countryId,
        sportId,
        name: game.gameName,
        type: game.gameType,
        outcomeIds: game.outcomes.map((o) => o.outcomeId),
      };

      game.outcomes.forEach((outcome) => {
        outcomes[outcome.outcomeId] = {
          id: outcome.outcomeId,
          gameId,
          eventId,
          countryId,
          sportId,
          name: outcome.outcomeName,
          odds: outcome.outcomeOdds,
          position: outcome.outcomePosition,
        };
      });
    });
  });

  return {
    sports,
    countries,
    events,
    games,
    outcomes,
  };
};
