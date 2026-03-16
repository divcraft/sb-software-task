import React, { useState } from "react";
import { GameGroup } from "./GameGroup";
import { useGetEventsQuery } from "features/betting";

type Props = {
  sportId: number;
  countryId: number;
};

export const CountryGroup: React.FC<Props> = ({ sportId, countryId }) => {
  const [open, setOpen] = useState(false);
  const { countryName, eventsLength, eventsIds } = useGetEventsQuery(
    undefined,
    {
      selectFromResult: ({ data }) => ({
        countryName: data?.sports[sportId]?.countries[countryId]?.countryName,
        eventsLength:
          Object.values(
            data?.sports[sportId]?.countries[countryId]?.events ?? {},
          ).length ?? 0,
        eventsIds: data?.sports[sportId]?.countries[countryId]?.eventIds ?? [],
      }),
    },
  );
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
            <GameGroup key={eventId} sportId={sportId} countryId={countryId} eventId={eventId} />
          ))}
        </div>
      )}
    </div>
  );
};
