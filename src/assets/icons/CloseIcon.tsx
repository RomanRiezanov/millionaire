import { SVGProps } from "react";

type CloseIconProps = SVGProps<SVGSVGElement>;

function CloseIcon({ width = 24, height = 24, ...props }: CloseIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="#1C1C21"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default CloseIcon;
