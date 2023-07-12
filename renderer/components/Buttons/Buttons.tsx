import { InputLog, ButtonLog, ButtonSubmit } from "./ButtonsStyling";
import { Dispatch, ReactNode, SetStateAction } from "react";

type Props = {
  children: ReactNode;
};

type ButtonProps = {
  setShowEmoji: Dispatch<SetStateAction<boolean>>;
  showEmoji: boolean;
};

export const Input = () => (
  <InputLog
    color="#1B90FF"
    border
    type="text"
    name="username"
    id="username"
    autoComplete="off"
  />
);

export const ButtonLogin = ({ children }: Props) => (
  <ButtonLog
    log
    background={"linear-gradient(92.72deg, #1b90ff 0%, #876bce 100%)"}
    color="white"
    type="submit"
  >
    {children}
  </ButtonLog>
);

export const ButtonSend = () => (
  <ButtonSubmit size="14px" type="submit">
    <svg
      style={{ verticalAlign: "middle" }}
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 384 512"
    >
      <path
        fill="white"
        d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
      />
    </svg>
  </ButtonSubmit>
);

export const ButtonEmoji = ({ setShowEmoji, showEmoji }: ButtonProps) => (
  <ButtonSubmit
    size="17px"
    type="button"
    emoji
    onClick={() => setShowEmoji(!showEmoji)}
  >
    😀
  </ButtonSubmit>
);
