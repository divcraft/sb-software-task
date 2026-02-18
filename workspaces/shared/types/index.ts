import { z } from "zod";

export type ClientMessage = {
  type: "SUBSCRIBE_OUTCOMES";
  payload: { outcomeId: Array<number> };
};

export type ServerMessage =
  | { type: "INIT_FEED"; payload: EventsResponseType }
  | { type: "SUBSCRIPTION_UPDATED" }
  | {
      type: "OUTCOMES_UPDATE";
      payload: Array<{
        outcomeId: number;
        newOdds: number;
      }>;
    };

export const OutcomeSchema = z.object({
  outcomeId: z.number(),
  outcomeName: z.string(),
  outcomeOdds: z.number(),
  outcomePosition: z.number().int(),
});

export const GameSchema = z.object({
  gameId: z.number(),
  gameName: z.string(),
  gameType: z.number(),
  outcomes: z.array(OutcomeSchema),
});

export const EventSchema = z.object({
  eventId: z.number(),
  eventName: z.string(),
  eventStart: z.number(), // unix timestamp (ms)
  eventType: z.number(),

  category1Id: z.number(),
  category2Id: z.number(),
  category3Id: z.number(),

  category1Name: z.string(),
  category2Name: z.string(),
  category3Name: z.string(),

  gamesCount: z.number(),
  eventGames: z.array(GameSchema),

  isCustomBetAvailable: z.boolean(),
});

export const EventsResponseSchema = z.array(EventSchema);

export type OutcomeType = z.infer<typeof OutcomeSchema>;
export type GameType = z.infer<typeof GameSchema>;
export type EventType = z.infer<typeof EventSchema>;
export type EventsResponseType = z.infer<typeof EventsResponseSchema>;
