import { setStake } from "features/betslip";
import { useAppDispatch, useAppSelector } from "store";
import { ChangeEvent } from "react";

export const StakeInput = () => {
  const dispatch = useAppDispatch();
  const stake = useAppSelector((state) => state.betslip.stake);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (!/^\d*(\.\d{0,2})?$/.test(input)) return;

    if (input === "" || input === ".") {
      dispatch(setStake(0));
      return;
    }

    dispatch(setStake(Number(input)));
  };

  return (
    <div className="flex gap-2 my-1 items-center">
      <div className='shrink-0 text-sm'>{'Stawka (EUR):'}</div>
      <input
        className="border border-gray-300 rounded-md w-full px-1"
        value={stake === 0 ? "" : stake.toString()}
        onChange={onChange}
        inputMode="decimal"
      />
    </div>
  );
};
