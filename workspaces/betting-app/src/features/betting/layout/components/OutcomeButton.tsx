import React from "react";
import { OutcomeType } from "shared/types";

type Props = {
  outcome: OutcomeType;
  highlighted?: boolean;
};

export const OutcomeButton: React.FC<Props> = ({ outcome, highlighted }) => {
  console.log("OutcomeButton", outcome.outcomeName);
  return (
    <button
      className={`min-w-16 md:min-w-22 px-3 py-2 rounded-md text-sm font-medium border transition-colors focus:outline-none flex items-center justify-center whitespace-nowrap ${
        highlighted
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
