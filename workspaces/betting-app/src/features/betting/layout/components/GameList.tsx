import React from "react";
import { EventType } from "shared/types";
import { GameGroup } from "./GameGroup";

type Props = {
  events: EventType[];
  onOutcomeClick: (outcomeId: number) => void;
};

export const EventList: React.FC<Props> = ({ events, onOutcomeClick }) => {
  return (
    <div className="space-y-4">
      {events.map((e) => (
        <GameGroup key={e.eventId} event={e} />
      ))}
    </div>
  );
};
