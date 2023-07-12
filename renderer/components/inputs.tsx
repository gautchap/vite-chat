import styled from "@emotion/styled";

type InputProps = {
  background?: string;
  border?: boolean;
  color?: string;
};

export const PageTitle = styled.h1`
  background: linear-gradient(92.72deg, #1b90ff 0%, #876bce 100%);
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  margin: 0;
  font-size: 2rem;
`;

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
  color: ${(props) => props.color};
  font-size: 20px;
  border: ${(props) => (props.border ? "2px solid lightgrey" : "none")};
  padding: 0 1.5em;
  background: ${(props) => props.background};
  font-weight: 800;
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

export const LoginWrapper = styled.main`
  padding: 1em;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -90%);
  width: 90vw;
  max-width: 25em;
  @media (min-width: 768px) {
    transform: translate(-90%, -50%);
  }
  @media (min-width: 1024px) {
    transform: translate(-120%, -50%);
  }
`;

export const BackgroundWrapper = styled.section`
  background: linear-gradient(92.72deg, white 35%, transparent 200%),
    url("/assets/landscape.jpg");
  width: 100vw;
  height: 100vh;
`;
