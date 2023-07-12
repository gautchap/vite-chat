import {
  BackgroundWrapper,
  InputWrapper,
  LoginWrapper,
  EmojiWrapper,
} from "./ContainerStyling";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const Container = ({ children }: Props) => {
  return <BackgroundWrapper>{children}</BackgroundWrapper>;
};

export const LoginContainer = ({ children }: Props) => {
  return <LoginWrapper>{children}</LoginWrapper>;
};

export const InputContainer = ({ children }: Props) => (
  <InputWrapper>{children}</InputWrapper>
);

export const EmojiContainer = ({ children }: Props) => (
  <EmojiWrapper>{children}</EmojiWrapper>
);
