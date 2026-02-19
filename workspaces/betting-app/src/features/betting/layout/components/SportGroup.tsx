import React, { useState } from "react";
import { EventType } from "shared/types";
import { CountryGroup } from "./CountryGroup";
import { selectCountryGroups } from "features/betting";

type Props = {
  categoryName: string;
  events: EventType[];
};

export const SportGroup: React.FC<Props> = ({ categoryName, events }) => {
  console.log("SportGroup", categoryName);

  const [open, setOpen] = useState(true);
  const countryGroups = selectCountryGroups(events);

  return (
    <section className="bg-white rounded-md shadow-sm overflow-hidden">
      <header
        className="flex items-center justify-between px-4 py-3 bg-indigo-800 text-white cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-center space-x-3">
          <span className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs">
            ⚽
          </span>
          <div className="text-sm font-semibold">{categoryName}</div>
        </div>
        <div className="text-sm">{open ? "▾" : "▸"}</div>
      </header>

      {open && (
        <div>
          {countryGroups.map((c) => (
            <CountryGroup
              key={c.countryName}
              subcategoryName={c.countryName}
              events={c.events}
            />
          ))}
        </div>
      )}
    </section>
  );
};
