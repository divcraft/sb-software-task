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

export interface BettingStateType {
  sports: Record<number, SportType>;
  countries: Record<number, CountryType>;
  events: Record<number, EventType>;
  games: Record<number, GameType>;
  outcomes: Record<number, OutcomeType>;
}
