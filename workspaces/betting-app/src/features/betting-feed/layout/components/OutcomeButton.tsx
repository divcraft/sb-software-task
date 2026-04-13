import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { setBet } from "features/betslip";
import { selectOutcomeOdds } from "features/betting-feed";

interface PropsType {
  gameId: number;
  outcomeId: number;
}

export const OutcomeButton: FC<PropsType> = ({ outcomeId, gameId }) => {
  const dispatch = useAppDispatch();
  const [flash, setFlash] = useState<"" | "bg-green-500" | "bg-red-500">("");

  const odds = useAppSelector((state) => selectOutcomeOdds(state, outcomeId));
  const [prevOdds, setPrevOdds] = useState<number | null>(null);

  const isInBetslip = useAppSelector((state) =>
    state.betslip.bets.some((b) => b.gameId === gameId && b.outcomeId === outcomeId),
  );

  useEffect(() => {
    const oddsNumber = Number(odds);
    setPrevOdds(oddsNumber);
    if (prevOdds === null || prevOdds === oddsNumber) return;

    setFlash(oddsNumber < prevOdds ? "bg-green-500" : "bg-red-500");

    const timeout = setTimeout(() => setFlash(""), 700);
    return () => clearTimeout(timeout);
  }, [odds]);

  return (
    <button
      onClick={() => dispatch(setBet({ gameId, outcomeId }))}
      className={`w-full h-full rounded-md text-sm font-medium border transition-colors flex items-center justify-center ${
        isInBetslip
          ? `text-white border-indigo-700 ${flash || "bg-indigo-700 "}`
          : ` text-gray-800 hover:bg-gray-50 border-gray-200 ${flash || "bg-white"}`
      }`}
    >
      {odds}
    </button>
  );
};
