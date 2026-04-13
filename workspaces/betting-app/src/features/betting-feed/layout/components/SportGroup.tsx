import { FC, useState } from "react";
import { CountryGroup } from "./CountryGroup";
import { selectCountryIds, selectSportName } from "features/betting-feed";
import { useAppSelector } from "store";
import { Tile } from "components/shared-ui";

interface PropsType {
  sportId: number;
}

export const SportGroup: FC<PropsType> = ({ sportId }) => {
  const [open, setOpen] = useState(true);

  const sportName = useAppSelector((state) => selectSportName(state, sportId));
  const countryIds = useAppSelector((state) => selectCountryIds(state, sportId));

  console.log("SportGroup", sportName);

  return (
    <section className="rounded-md shadow-sm overflow-hidden">
      <header
        className="flex items-center justify-between px-2 py-2 h-12 bg-indigo-800 text-white cursor-pointer"
        onClick={() => setOpen((open) => !open)}
      >
        <div className="text-sm font-semibold">{sportName}</div>
        <div className="flex gap-1 text-sm">
          <Tile className="bg-indigo-600">1</Tile>
          <Tile className="bg-indigo-600">X</Tile>
          <Tile className="bg-indigo-600">2</Tile>
          <Tile className="ml-1.5">{open ? "▾" : "▸"}</Tile>
        </div>
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
