import { SVGProps } from "react";

type BurgerIconProps = SVGProps<SVGSVGElement>;

function BurgerIcon({ width = 24, height = 18, ...props }: BurgerIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 18"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <rect width="24" height="2" rx="1" fill="#1C1C21" />
      <rect y="8" width="24" height="2" rx="1" fill="#1C1C21" />
      <rect y="16" width="24" height="2" rx="1" fill="#1C1C21" />
    </svg>
  );
}

export default BurgerIcon;
