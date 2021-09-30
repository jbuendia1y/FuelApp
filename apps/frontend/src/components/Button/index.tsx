import { ButtonHTMLAttributes } from "react";
import "./button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: any[] | any;
}

export default function Button({
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button className={`btn ${className}`} {...rest}>
      {children}
    </button>
  );
}
