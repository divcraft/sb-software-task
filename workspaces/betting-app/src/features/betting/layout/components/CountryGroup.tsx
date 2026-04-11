import React, { useState } from "react";
import { GameGroup } from "./GameGroup";
import { selectCountryName, selectEventsIds, selectEventsLength } from "features/betting";
import { useAppSelector } from "store";

type Props = {
  countryId: number;
};

export const CountryGroup: React.FC<Props> = ({ countryId }) => {
  const [open, setOpen] = useState(false);

  const countryName = useAppSelector((state) => selectCountryName(state, countryId));
  const eventsIds = useAppSelector((state) => selectEventsIds(state, countryId));
  const eventsLength = useAppSelector((state) => selectEventsLength(state, countryId));

  console.log("CountryGroup", countryName, eventsLength, eventsIds);

  return (
    <div className="rounded-md overflow-hidden">
      <div
        className="flex items-center gap-1 h-13 px-3 py-2 bg-gray-50 cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="text-sm font-medium text-gray-700">{countryName}</div>
        <div className="text-md text-gray-500">({eventsLength})</div>
      </div>

      {open && (
        <div className="space-y-2">
          {eventsIds.map((eventId) => (
            <GameGroup key={eventId} eventId={eventId} />
          ))}
        </div>
      )}
    </div>
  );
};
