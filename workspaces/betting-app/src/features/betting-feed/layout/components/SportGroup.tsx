import { FC, useState } from "react";
import { CountryGroup } from "./CountryGroup";
import { selectCountryIds, selectSportName } from "features/betting-feed";
import { useAppSelector } from "store";

interface PropsType {
  sportId: number;
}

export const SportGroup: FC<PropsType> = ({ sportId }) => {
  const [open, setOpen] = useState(true);

  const sportName = useAppSelector((state) => selectSportName(state, sportId));
  const countryIds = useAppSelector((state) => selectCountryIds(state, sportId));

  console.log("SportGroup", sportName);

  return (
    <section className="bg-white rounded-md shadow-sm overflow-hidden">
      <header
        className="flex items-center justify-between px-4 py-3 bg-indigo-800 text-white cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-center space-x-3">
          <div className="text-sm font-semibold">{sportName}</div>
        </div>
        <div className="text-sm">{open ? "▾" : "▸"}</div>
      </header>

      {open && (
        <div>
          {countryIds.map((countryId) => {
            return <CountryGroup key={countryId} countryId={countryId} />;
          })}
        </div>
      )}
    </section>
  );
};
