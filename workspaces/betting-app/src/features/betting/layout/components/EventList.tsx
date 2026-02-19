import React from "react";
import { EventType } from "shared/types";
import { EventItem } from "./EventItem";

type Props = {
  events: EventType[];
  onOutcomeClick: (outcomeId: number) => void;
};

export const EventList: React.FC<Props> = ({ events, onOutcomeClick }) => {
  return (
    <div className="space-y-4">
      {events.map((e) => (
        <EventItem key={e.eventId} event={e} />
      ))}
    </div>
  );
};
