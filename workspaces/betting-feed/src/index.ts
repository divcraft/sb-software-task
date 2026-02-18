import { WebSocket, WebSocketServer } from "ws";
import {
  ClientMessage,
  EventsResponseSchema,
  ServerMessage,
} from "shared/types";
import mockData from "../betting_dashboard_data.json";

const events = EventsResponseSchema.parse(mockData);

const PORT = 4040;
const wss = new WebSocketServer({ port: PORT });

type SubscribedUpdates = {
  subscribedOutcomesIds: Array<number>;
};

const clientFeed = new Map<WebSocket, SubscribedUpdates>();

wss.on("connection", (ws) => {
  console.log("Client connected");

  clientFeed.set(ws, {
    subscribedOutcomesIds: [],
  });

  send(ws, {
    type: "INIT_FEED",
    payload: events,
  });

  ws.on("message", (raw) => {
    const msg = JSON.parse(raw.toString()) as ClientMessage;

    switch (msg.type) {
      case "SUBSCRIBE_OUTCOMES":
        const client = clientFeed.get(ws);
        if (!client) return;
        client.subscribedOutcomesIds = msg.payload.outcomeId;
        send(ws, {
          type: "SUBSCRIPTION_UPDATED",
        });
        break;
    }
  });

  ws.on("close", () => {
    clientFeed.delete(ws);
  });
});

const randomFactor = () => {
  return 0.9 + Math.random() * 0.2;
};

const roundOdds = (value: number) => {
  return Math.round(value * 100) / 100;
};

const updateOdds = () => {
  const updates: { outcomeId: number; newOdds: number }[] = [];

  for (const event of events) {
    for (const game of event.eventGames) {
      for (const outcome of game.outcomes) {
        if (Math.random() < 0.3) {
          const oldOdds = outcome.outcomeOdds;
          const newOdds = roundOdds(oldOdds * randomFactor());

          outcome.outcomeOdds = newOdds;

          updates.push({
            outcomeId: outcome.outcomeId,
            newOdds,
          });
        }
      }
    }
  }

  if (updates.length > 0) {
    broadcast({
      type: "OUTCOMES_UPDATE",
      payload: updates,
    });
  }
};

const broadcast = (updates: ServerMessage) => {
  for (const ws of wss.clients) {
    const client = clientFeed.get(ws);

    const subscribedOutcomesIds = client?.subscribedOutcomesIds ?? [];

    if (ws.readyState === ws.OPEN) {
      if (updates.type === "OUTCOMES_UPDATE") {
        const filteredPayload = updates.payload.filter((update) =>
          subscribedOutcomesIds.includes(update.outcomeId),
        );
        if (filteredPayload.length > 0) {
          send(ws, {
            ...updates,
            payload: filteredPayload,
          });
        }
      }
    }
  }
};

const send = (ws: WebSocket, message: ServerMessage) => {
  ws.send(JSON.stringify(message));
};

const scheduleUpdate = () => {
  const delay = 10000 + Math.random() * 5000;
  setTimeout(() => {
    updateOdds();
    scheduleUpdate();
  }, delay);
};

scheduleUpdate();

console.log(`Mock WS running on ws://localhost:${PORT}`);
