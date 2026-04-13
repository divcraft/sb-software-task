import { ComponentProps, FC } from "react";

export const Tile: FC<ComponentProps<"div">> = ({ children, className = "", ...props }) => {
  console.log("Tile");
  return (
    <div className={`w-12 h-7.5 flex justify-center items-center rounded-md ${className}`} {...props}>
      {children}
    </div>
  );
};
