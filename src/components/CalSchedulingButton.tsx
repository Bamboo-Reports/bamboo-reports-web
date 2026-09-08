import { type ButtonHTMLAttributes, type MouseEvent } from "react";
import { openCalScheduler } from "@/lib/calScheduler";

type CalSchedulingButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const CalSchedulingButton = ({
  onClick,
  type = "button",
  ...props
}: CalSchedulingButtonProps) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) openCalScheduler();
  };

  return <button {...props} type={type} onClick={handleClick} />;
};
