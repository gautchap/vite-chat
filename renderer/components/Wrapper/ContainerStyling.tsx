import styled from "@emotion/styled";

export const BackgroundWrapper = styled.section`
  background: linear-gradient(90deg, white 35%, transparent 200%),
    url("/assets/landscape.jpg");
  width: 100vw;
  height: 100vh;
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

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;

export const EmojiWrapper = styled.div`
  position: absolute;
  bottom: 5em;
  right: 1em;
`;
