import React from "react";
import { ButtonEl } from "./button.styled";

type ButtonProps = {
  type?: "button";
  onClick: () => void;
  children?: string;
};

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  children,
}) => {
  return (
    <ButtonEl type={type} onClick={onClick}>
      {children}
    </ButtonEl>
  );
};

export default Button;
