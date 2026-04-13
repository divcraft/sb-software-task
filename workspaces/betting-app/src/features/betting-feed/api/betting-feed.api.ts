import { createApi } from "@reduxjs/toolkit/query/react";
import { BettingFeedSocket } from "./betting-feed.socket";
import { ServerMessage } from "shared/types";
import { BettingFeedType, convertToStateType } from "features/betting-feed";

export const bettingFeedApi = createApi({
  reducerPath: "bettingFeedApi",
  baseQuery: async () => ({ data: null }),
  endpoints: (build) => ({
    getBettingFeed: build.query<BettingFeedType, void>({
      query: () => undefined,
      async onCacheEntryAdded(_arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        const socket = BettingFeedSocket.get();

        socket.setMessageHandler((msg: ServerMessage) => {
          console.log("Received WS message", msg);
          switch (msg.type) {
            case "INIT_FEED":
              updateCachedData(() => convertToStateType(msg.payload));
              break;
            case "OUTCOMES_UPDATE":
              updateCachedData((draft) => {
                msg.payload.forEach((update) => {
                  const outcome = draft.outcomes[update.outcomeId] ?? null;

                  if (!outcome) {
                    console.warn("Received update for unknown outcomeId", update.outcomeId);
                    return;
                  }

                  const updatedOutcome = { ...outcome, odds: update.newOdds };
                  draft.outcomes[update.outcomeId] = updatedOutcome;
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

export const { useGetBettingFeedQuery } = bettingFeedApi;
