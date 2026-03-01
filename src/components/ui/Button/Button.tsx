import cn from "classnames";
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
  const classNames = cn(
    styles.button,
    styles[variant],
    fullWidth && styles.fullWidth,
    className
  );

  return (
    <button type="button" className={classNames} {...rest}>
      {children}
    </button>
  );
}

export default Button;
