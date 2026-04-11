import { createApi } from "@reduxjs/toolkit/query/react";
import { BettingSocket } from "./betting.socket";
import { ServerMessage } from "shared/types";
import { BettingStateType, convertToStateType } from "./utils";

export const bettingApi = createApi({
  reducerPath: "bettingApi",
  baseQuery: async () => ({ data: null }),
  endpoints: (build) => ({
    getEvents: build.query<BettingStateType, void>({
      query: () => undefined,
      async onCacheEntryAdded(_arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        const socket = BettingSocket.get();

        socket.setMessageHandler((msg: ServerMessage) => {
          console.log("Received WS message", msg);
          switch (msg.type) {
            case "INIT_FEED":
              updateCachedData(() => convertToStateType(msg.payload));
              break;
            case "OUTCOMES_UPDATE":
              updateCachedData((draft) => {
                msg.payload.forEach((update) => {
                  const outcome = draft.outcomes.records[update.outcomeId] ?? null;
                  if (!outcome) {
                    console.warn("Received update for unknown outcomeId 0", update.outcomeId);
                    return;
                  }

                  const updatedOutcome = { ...outcome, outcomeOdds: update.newOdds };

                  draft.outcomes.records[update.outcomeId] = updatedOutcome;
                });
              });
              break;
            case "SUBSCRIPTION_UPDATED":
              console.log("Subscription updated");
          }
        });

        socket.connect();

        await cacheDataLoaded;

        await cacheEntryRemoved;
        socket.disconnect();
      },
    }),
  }),
});

export const { useGetEventsQuery } = bettingApi;
