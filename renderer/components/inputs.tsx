import styled from "@emotion/styled";

type InputProps = {
  background?: string;
  border?: boolean;
};

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  height: 15vh;
  gap: 1em;
`;

export const LabelInput = styled.label`
  position: absolute;
  top: -0.5em;
  left: 1.4em;
  font-size: 0.8em;
  padding: 0 0.5em;
  background-color: white;
  font-weight: 300;
`;

export const InputLog = styled.input<InputProps>`
  width: 100%;
  border-radius: 20px;
  border: ${(props) => (props.border ? "2px solid lightgrey" : "none")};
  padding: 0 1.5em;
  background-color: ${(props) => props.background};
  font-weight: 600;
  &:focus-visible {
    outline-color: grey;
  }
`;

export const ButtonLog = InputLog.withComponent("button");

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;
