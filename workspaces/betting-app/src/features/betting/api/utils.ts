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
  sports: {
    ids: Array<number>;
    records: Record<number, SportType>;
  };
  countries: {
    ids: Array<number>;
    records: Record<number, CountryType>;
  };
  events: {
    ids: Array<number>;
    records: Record<number, EventType>;
  };
  games: {
    ids: Array<number>;
    records: Record<number, GameType>;
  };
  outcomes: {
    ids: Array<number>;
    records: Record<number, OutcomeType>;
  };
}

export const convertToStateType = (eventsRes: EventsResponseType): BettingStateType => {
  const sports: BettingStateType["sports"] = {
    ids: [],
    records: {},
  };
  const countries: BettingStateType["countries"] = {
    ids: [],
    records: {},
  };
  const events: BettingStateType["events"] = {
    ids: [],
    records: {},
  };
  const games: BettingStateType["games"] = {
    ids: [],
    records: {},
  };
  const outcomes: BettingStateType["outcomes"] = {
    ids: [],
    records: {},
  };

  eventsRes.forEach((event) => {
    const sportId = event.category1Id;
    const countryId = event.category2Id;
    const eventId = event.eventId;

    if (!sports.records[sportId]) {
      sports.records[sportId] = {
        id: sportId,
        name: event.category1Name,
        countryIds: [],
      };
      sports.ids.push(sportId);
    }

    const countryIds = sports.records[sportId].countryIds;
    if (!countryIds.includes(countryId)) {
      countryIds.push(countryId);
    }

    if (!countries.records[countryId]) {
      countries.records[countryId] = {
        id: countryId,
        sportId,
        name: event.category2Name,
        eventIds: [],
      };
      countries.ids.push(countryId);
    }

    const eventIds = countries.records[countryId].eventIds;
    if (!eventIds.includes(eventId)) {
      eventIds.push(eventId);
    }

    if (!events.records[eventId]) {
      events.records[eventId] = {
        id: eventId,
        sportId,
        countryId,
        name: event.eventName,
        start: event.eventStart,
        type: event.eventType,
        isCustomBetAvailable: event.isCustomBetAvailable,
        gameIds: [],
      };
      events.ids.push(eventId);
    }


    const gameIds = event.eventGames.map((g) => g.gameId);
    events.records[eventId].gameIds = gameIds;

    gameIds.forEach((gameId) => {
      const game = event.eventGames.find((g) => g.gameId === gameId);
      if (!game) return;
      games.records[gameId] = {
        id: gameId,
        eventId,
        countryId,
        sportId,
        name: game.gameName,
        type: game.gameType,
        outcomeIds: game.outcomes.map((o) => o.outcomeId),
      };
      games.ids.push(gameId);

      game.outcomes.forEach((outcome) => {
        outcomes.records[outcome.outcomeId] = {
          id: outcome.outcomeId,
          gameId,
          eventId,
          countryId,
          sportId,
          name: outcome.outcomeName,
          odds: outcome.outcomeOdds,
          position: outcome.outcomePosition,
        };
        outcomes.ids.push(outcome.outcomeId);
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
