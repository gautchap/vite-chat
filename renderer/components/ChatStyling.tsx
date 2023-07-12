import styled from "@emotion/styled";

type AuthorAlign = {
  align?: boolean;
};

export const RoomTitle = styled.h2`
  background: linear-gradient(92.72deg, #1b90ff 0%, #876bce 100%);
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  font-weight: 400;
`;

export const Main = styled.main`
  margin-top: 7em;
  margin-bottom: 5em;
  overflow: hidden;
`;

export const Ul = styled.ul`
  list-style: none;
  padding: 0 0.5em;
`;

export const ReceiveMessage = styled.p`
  font-weight: 500;
  background-color: lightgrey;
  box-shadow: 0 0.125rem 0.25rem rgba(211, 211, 211, 0.2);
  display: inline-block;
  padding: 0.3em 1em;
  border-radius: 20px;
  border-bottom-left-radius: 5px;
  margin: 0 0 0.5em 0;
`;

export const SendMessage = styled.p`
  box-shadow: 0 0.125rem 0.25rem rgba(27, 144, 255, 0.2);
  text-align: end;
  background-color: #1b90ff;
  color: white;
  display: inline-block;
  padding: 0.3em 1em;
  border-radius: 20px;
  border-bottom-right-radius: 5px;
  margin: 0 0 0.5em 0;
`;

export const AuthorMessage = styled.p<AuthorAlign>`
  text-align: ${(props) => (props.align ? "end" : "")};
  padding-left: 1em;
  margin: 0;
  color: grey;
`;

export const Header = styled.header`
  padding: 2em 0 6em 0;
  text-align: center;
  position: fixed;
  top: 0;
  width: 100%;
  background: linear-gradient(white 12%, transparent);
`;

export const Footer = styled.footer`
  background-color: white;
  width: 100%;
  height: 5em;
  position: fixed;
  bottom: 0;
`;
