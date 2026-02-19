import React from "react";
import { OutcomeType } from "shared/types";
import { useAppDispatch, useAppSelector } from "store";
import { setCouponOutcomeId } from "features/betting";

type Props = {
  outcome: OutcomeType;
  gameId: number;
  highlighted?: boolean;
};

export const OutcomeButton: React.FC<Props> = ({
  outcome,
  gameId,
  highlighted,
}) => {
  const dispatch = useAppDispatch();
  const isInCoupon = useAppSelector((s) =>
    s.betting.couponOutcomesIds.some(
      (x) => x.gameId === gameId && x.outcomeId === outcome.outcomeId,
    ),
  );

  const handleClick = () => {
    dispatch(setCouponOutcomeId({ gameId, outcomeId: outcome.outcomeId }));
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
        <span className="text-sm font-semibold">
          {outcome.outcomeOdds.toFixed(2)}
        </span>
      </div>
    </button>
  );
};
