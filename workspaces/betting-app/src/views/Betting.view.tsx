"use client";
import { BettingFeedLayout } from "features/betting-feed";
import { BetslipLayout } from "features/betslip";

export const BettingView = () => {
  console.log("BettingView");
  return (
    <div className="mx-auto px-4 py-6">
      <div className="flex w-full gap-6">
        <BettingFeedLayout />
        <BetslipLayout />
      </div>
    </div>
  );
};
