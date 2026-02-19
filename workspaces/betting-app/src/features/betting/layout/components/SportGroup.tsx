import React, { useCallback, useState } from "react";
import { ClientMessage, EventType } from "shared/types";
import { CountryGroup } from "./CountryGroup";
import { BettingSocket } from "../../api/betting.socket";

type Props = {
  categoryName: string;
  events: EventType[];
};

export const SportGroup: React.FC<Props> = ({ categoryName, events }) => {
  const [open, setOpen] = useState(true);
  console.log("SportGroup", categoryName);

  //   const subscribeToOutcomes = useCallback((outcomeIds: number[]) => {
  //     const socket = BettingSocket.get();
  //     const message: ClientMessage = {
  //       type: "SUBSCRIBE_OUTCOMES",
  //       payload: { outcomeId: outcomeIds },
  //     };
  //     socket.send(message);
  //   }, []);

  const subgroups = events.reduce<Record<string, EventType[]>>((acc, ev) => {
    const key = ev.category2Name || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(ev);
    return acc;
  }, {});

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
          {Object.entries(subgroups).map(([subName, evs]) => (
            <CountryGroup
              key={subName}
              subcategoryName={subName}
              events={evs}
            />
          ))}
        </div>
      )}
    </section>
  );
};
