import styled from "@emotion/styled";

type InputProps = {
  background?: string;
  border?: boolean;
  color?: string;
  log?: boolean;
};

type AuthorAlign = {
  align?: boolean;
};

type EmojiButton = {
  emoji?: boolean;
  size: string;
};

export const InputLog = styled.input<InputProps>`
  width: 100%;
  border-radius: 20px;
  color: ${(props) => props.color};
  font-size: 20px;
  border: ${(props) => (props.border ? "2px solid lightgrey" : "none")};
  padding: 0 1.5em;
  background: ${(props) => props.background};
  font-weight: 800;
  cursor: ${(props) => (props.log ? "pointer" : "auto")};
  &:focus-visible {
    outline-color: grey;
  }
`;

export const ButtonLog = InputLog.withComponent("button");

export const ButtonSubmit = styled.button<EmojiButton>`
  width: 3.5em;
  height: 2.5em;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  font-size: ${(props) => props.size};
  background: ${(props) =>
    props.emoji
      ? "none"
      : "linear-gradient(92.72deg, #1b90ff 0%, #876bce 100%)"};
  position: absolute;
  right: ${(props) => (props.emoji ? "3.5em" : "1em")};
  top: 50%;
  transform: translate(0, -50%);
`;
