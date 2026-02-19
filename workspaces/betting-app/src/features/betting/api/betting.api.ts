import { createApi } from "@reduxjs/toolkit/query/react";
import { BettingSocket } from "./betting.socket";
import { EventsResponseType, ServerMessage } from "shared/types";

export const bettingApi = createApi({
  reducerPath: "bettingApi",
  baseQuery: async () => ({ data: null }),
  endpoints: (build) => ({
    getEvents: build.query<EventsResponseType, void>({
      query: () => undefined,
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        const socket = BettingSocket.get();

        socket.setMessageHandler((msg: ServerMessage) => {
          console.log("Received WS message", msg);
          switch (msg.type) {
            case "INIT_FEED":
              updateCachedData(() => msg.payload);
              break;
            case "OUTCOMES_UPDATE":
              updateCachedData((draft) => {
                draft.forEach((event) =>
                  event.eventGames.forEach((game) =>
                    game.outcomes.forEach((outcome) => {
                      const u = msg.payload.find(
                        (x) => x.outcomeId === outcome.outcomeId,
                      );
                      if (u) outcome.outcomeOdds = u.newOdds;
                    }),
                  ),
                );
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
