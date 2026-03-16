import { EventsResponseType } from "shared/types";

export interface NormalizedOutcome {
  outcomeId: number;
  outcomeName: string;
  outcomeOdds: number;
  outcomePosition: number;
}

export interface NormalizedGame {
  gameId: number;
  gameName: string;
  gameType: number;
  outcomes: Record<number, NormalizedOutcome>;
  outcomesIds: number[];
}

export interface NormalizedEvent {
  eventId: number;
  eventName: string;
  eventStart: number;
  eventType: number;
  isCustomBetAvailable: boolean;
  games: Record<number, NormalizedGame>;
  gamesIds: number[];
}

export interface NormalizedCountry {
  countryId: number;
  countryName: string;
  events: Record<number, NormalizedEvent>;
  eventIds: number[];
}

export interface NormalizedSport {
  sportId: number;
  sportName: string;
  countries: Record<number, NormalizedCountry>;
  countryIds: number[];
}

export interface BettingStateType {
  sports: Record<number, NormalizedSport>;
  sportIds: number[];
  sportNames: string[];
  outcomesIds: Record<
    number,
    {
      sportId: number;
      countryId: number;
      eventId: number;
      gameId: number;
      outcomeId: number;
    }
  >;
}

export const convertToStateType = (
  events: EventsResponseType,
): BettingStateType => {
  const feed: BettingStateType = {
    sports: {},
    sportIds: [],
    sportNames: [],
    outcomesIds: {},
  };

  events.forEach((event) => {
    const sportId = event.category1Id;
    const countryId = event.category2Id;
    const eventId = event.eventId;

    if (!feed.sports[sportId]) {
      feed.sports[sportId] = {
        sportId,
        sportName: event.category1Name,
        countries: {},
        countryIds: [],
      };
      feed.sportIds.push(sportId);
      feed.sportNames.push(event.category1Name);
    }

    if (!feed.sports[sportId].countries[countryId]) {
      feed.sports[sportId].countries[countryId] = {
        countryId,
        countryName: event.category2Name,
        events: {},
        eventIds: [],
      };
      feed.sports[sportId].countryIds.push(countryId);
    }

    const games = Object.fromEntries(
      event.eventGames.map((game) => [
        game.gameId,
        {
          gameId: game.gameId,
          gameName: game.gameName,
          gameType: game.gameType,
          outcomesIds: game.outcomes.map((o) => o.outcomeId),
          outcomes: Object.fromEntries(
            game.outcomes.map((outcome) => {
              feed.outcomesIds[outcome.outcomeId] = {
                sportId,
                countryId,
                eventId,
                gameId: game.gameId,
                outcomeId: outcome.outcomeId,
              };
              return [
                outcome.outcomeId,
                {
                  outcomeId: outcome.outcomeId,
                  outcomeName: outcome.outcomeName,
                  outcomeOdds: outcome.outcomeOdds,
                  outcomePosition: outcome.outcomePosition,
                },
              ];
            }),
          ),
        },
      ]),
    );

    feed.sports[sportId].countries[countryId].events[eventId] = {
      eventId,
      eventName: event.eventName,
      eventStart: event.eventStart,
      eventType: event.eventType,
      isCustomBetAvailable: event.isCustomBetAvailable,
      games,
      gamesIds: Object.keys(games).map(Number),
    };
    feed.sports[sportId].countries[countryId].eventIds.push(eventId);
  });

  return feed;
};
