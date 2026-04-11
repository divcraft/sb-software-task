import React from "react";
import { useAppDispatch, useAppSelector } from "store";
import { selectOutcomeOdds, setCoupon } from "features/betting";

type Props = {
  gameId: number;
  outcomeId: number;
  highlighted?: boolean;
};

export const OutcomeButton: React.FC<Props> = ({ outcomeId, gameId, highlighted }) => {
  const dispatch = useAppDispatch();
  const odds = useAppSelector((state) => selectOutcomeOdds(state, outcomeId));

  const isInCoupon = useAppSelector((s) =>
    s.betting.coupon.some((couponItem) => couponItem.gameId === gameId && couponItem.outcomeId === outcomeId),
  );

  const handleClick = () => {
    dispatch(setCoupon({ gameId, outcomeId }));
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
        <span className="text-sm font-semibold">{odds}</span>
      </div>
    </button>
  );
};
