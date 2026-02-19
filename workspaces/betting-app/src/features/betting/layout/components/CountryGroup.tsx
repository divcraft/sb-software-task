import React, { useState } from "react";
import { EventType } from "shared/types";
import { GameGroup } from "./GameGroup";

type Props = {
  subcategoryName: string;
  events: EventType[];
};

export const CountryGroup: React.FC<Props> = ({ subcategoryName, events }) => {
  const [open, setOpen] = useState(false);
  console.log("CountryGroup", subcategoryName);

  return (
    <div className="rounded-md overflow-hidden">
      <div
        className="flex items-center gap-1 h-13 px-3 py-2 bg-gray-50 cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="text-sm font-medium text-gray-700">
          {subcategoryName}
        </div>
        <div className="text-md text-gray-500">({events.length})</div>
      </div>

      {open && (
        <div className="space-y-2">
          {events.map((ev) => (
            <GameGroup key={ev.eventId} event={ev} />
          ))}
        </div>
      )}
    </div>
  );
};
