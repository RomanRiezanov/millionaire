import classNames from "classnames";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={classNames(
        styles.button,
        styles[variant],
        fullWidth && styles.fullWidth,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
