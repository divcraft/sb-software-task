"use client";
import React, { useCallback } from "react";
import { useGetEventsQuery } from "./betting.api";
import { BettingSocket } from "./betting.socket";
import { ClientMessage } from "shared/types";

export const BettingFeed: React.FC = () => {
  const { data: events, isLoading, isError } = useGetEventsQuery();

  const subscribeToOutcomes = useCallback((outcomeIds: number[]) => {
    const socket = BettingSocket.get();
    const message: ClientMessage = {
      type: "SUBSCRIBE_OUTCOMES",
      payload: { outcomeId: outcomeIds },
    };
    socket.send(message);
  }, []);

  if (isLoading) return <div>Loading events...</div>;
  if (isError || !events) return <div>Error loading events</div>;

  return (
    <div>
      <h2>Betting Feed</h2>
      {events.map((event) => (
        <div key={event.eventId} style={{ marginBottom: 16 }}>
          <h3>{event.eventName}</h3>
          {event.eventGames.map((game) => (
            <div key={game.gameId} style={{ paddingLeft: 16 }}>
              <strong>{game.gameName}</strong>
              <ul>
                {game.outcomes.map((outcome) => (
                  <li key={outcome.outcomeId}>
                    {outcome.outcomeName}: {outcome.outcomeOdds.toFixed(2)}
                    <button
                      style={{ marginLeft: 8 }}
                      onClick={() => subscribeToOutcomes([outcome.outcomeId])}
                    >
                      Subscribe
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
