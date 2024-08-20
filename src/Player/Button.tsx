import { Button as UIButton, ButtonProps } from "semantic-ui-react";
import { FunctionComponent } from "react";

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  size = "big",
  ...props
}) => (
  <UIButton size={size} {...props}>
    {children}
  </UIButton>
);
