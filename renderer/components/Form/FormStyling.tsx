import styled from "@emotion/styled";

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

export const FormMessage = styled.form`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 96%;
  left: 50%;
  transform: translate(-50%);
  padding: 0.5em;
`;
export const InputText = styled.input`
  font-size: 16px;
  width: 100%;
  height: 4em;
  padding: 0 5em 0 1em;
  border-radius: 20px;
  border: 2px solid lightgrey;
  &:focus-visible {
    outline-color: grey;
  }
`;
