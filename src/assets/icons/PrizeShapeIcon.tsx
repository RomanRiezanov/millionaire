import { SVGProps } from "react";

type PrizeShapeIconProps = SVGProps<SVGSVGElement>;

export function PrizeShapeIcon({ ...props }: PrizeShapeIconProps) {
  return (
    <svg
      viewBox="0 0 240 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      {...props}
    >
      <path d="M22.2871 0.5H217.713C221.126 0.500018 224.363 2.0158 226.548 4.6377L239.349 20L226.548 35.3623C224.363 37.9842 221.126 39.5 217.713 39.5H22.2871C18.8742 39.5 15.6371 37.9842 13.4521 35.3623L0.650391 20L13.4521 4.6377C15.6371 2.0158 18.8742 0.500017 22.2871 0.5Z" />
    </svg>
  );
}
