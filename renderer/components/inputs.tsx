import styled from "@emotion/styled";

type InputProps = {
  background?: string;
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
`;

export const Input = styled.input<InputProps>`
  width: 100%;
  border-radius: 5px;
  padding: 0 1.5em;
  background-color: ${(props) => props.background};
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;
