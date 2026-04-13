import { FC } from "react";
import { BetslipTotal } from "./BetslipTotal";
import { StakeInput } from "./StakeInput";

export const BetslipSummary: FC = () => {
  return (
    <div className="pt-3 border-t mt-2">
      <StakeInput />
      <div className="flex items-center justify-between text-sm pt-1">
        <div className="font-semibold">Kurs całkowity</div>
        <BetslipTotal />
      </div>
    </div>
  );
};
