import React, { useState } from "react";
import { CountryGroup } from "./CountryGroup";
import { selectCountryIds, selectSportName } from "features/betting";
import { useSelector } from "react-redux";

type Props = {
  sportId: number;
};

export const SportGroup: React.FC<Props> = ({ sportId }) => {
  const [open, setOpen] = useState(true);

  const countryIds = useSelector((state) => selectCountryIds(state, sportId));
  const sportName = useSelector((state) => selectSportName(state, sportId));

  console.log("SportGroup", sportName, countryIds);

  if (!countryIds || !sportName) return null;

  return (
    <section className="bg-white rounded-md shadow-sm overflow-hidden">
      <header
        className="flex items-center justify-between px-4 py-3 bg-indigo-800 text-white cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-center space-x-3">
          <span className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs">⚽</span>
          <div className="text-sm font-semibold">{sportName}</div>
        </div>
        <div className="text-sm">{open ? "▾" : "▸"}</div>
      </header>

      {open && (
        <div>
          {countryIds.map((countryId) => {
            return <CountryGroup key={countryId} countryId={countryId} sportId={sportId} />;
          })}
        </div>
      )}
    </section>
  );
};
