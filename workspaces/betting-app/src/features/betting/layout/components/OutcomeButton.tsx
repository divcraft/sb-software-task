import React from "react";
import { useAppDispatch, useAppSelector } from "store";
import { selectOutcome, setCouponOutcomeId } from "features/betting";

type Props = {
  gameId: number;
  sportId: number;
  countryId: number;
  eventId: number;
  outcomeId: number;
  highlighted?: boolean;
};

export const OutcomeButton: React.FC<Props> = ({ outcomeId, gameId, sportId, countryId, eventId, highlighted }) => {
  const dispatch = useAppDispatch();
  const outcome = useAppSelector((state) => selectOutcome(state, outcomeId));
  //   const outcome = useAppSelector((state) => selectOutcome(state, sportId, countryId, eventId, gameId, outcomeId));

  if (!outcome) return null;

  const isInCoupon = useAppSelector((s) =>
    s.betting.couponOutcomesIds.some((x) => x.gameId === gameId && x.outcomeId === outcome.id),
  );

  const handleClick = () => {
    dispatch(setCouponOutcomeId({ gameId, outcomeId: outcome.id }));
  };

  return (
    <button
      onClick={handleClick}
      className={`min-w-16 md:min-w-22 px-3 py-2 rounded-md text-sm font-medium border transition-colors focus:outline-none flex items-center justify-center whitespace-nowrap ${
        highlighted || isInCoupon
          ? "bg-indigo-700 text-white border-indigo-700"
          : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center space-x-2">
        <span className="text-sm font-semibold">{outcome.odds.toFixed(2)}</span>
      </div>
    </button>
  );
};
