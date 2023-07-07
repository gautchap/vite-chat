import styled from "@emotion/styled";

type AuthorALign = {
  align?: boolean;
};

export const Main = styled.main`
  margin-bottom: 5em;
  overflow: hidden;
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
  width: 100%;
  height: 4em;
  padding: 0 5em 0 1em;
  border-radius: 20px;
  border: 2px solid lightgrey;
  &:focus-visible {
    outline-color: grey;
  }
`;

export const ButtonSubmit = styled.button`
  width: 3.5em;
  height: 2.5em;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  background-color: #1b90ff;
  position: absolute;
  right: 1em;
  top: 50%;
  transform: translate(0, -50%);
`;

export const Ul = styled.ul`
  list-style: none;
  padding: 0 0.5em;
`;
export const ReceiveMessage = styled.p`
  background-color: lightgrey;
  display: inline-block;
  padding: 0.3em 1em;
  border-radius: 20px;
  border-bottom-left-radius: 5px;
  margin: 0 0 0.5em 0;
`;

export const SendMessage = styled.p`
  text-align: end;
  background-color: #1b90ff;
  color: white;
  display: inline-block;
  padding: 0.3em 1em;
  border-radius: 20px;
  border-bottom-right-radius: 5px;
  margin: 0 0 0.5em 0;
`;

export const AuthorMessage = styled.p<AuthorALign>`
  text-align: ${(props) => (props.align ? "end" : "")};
  padding-left: 1em;
  margin: 0;
  color: grey;
`;

export const Footer = styled.footer`
  background-color: white;
  width: 100%;
  height: 5em;
  position: fixed;
  bottom: 0;
`;
