import { FormEvent } from "react";
import { socket } from "../socket";
import { Container, LoginContainer } from "./Wrapper/Container";
import FormLogin from "./Form/FormLogin";
import styled from "@emotion/styled";
import { pulse, rightFade } from "./animate";

const PageTitle = styled.h1`
  background: linear-gradient(92.72deg, #1b90ff 0%, #876bce 100%);
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  margin: 0;
  font-size: 2rem;
  animation: ${rightFade} 1s ease;
`;

const P = styled.p`
  animation: ${rightFade} 1s ease;
`;

const Image = styled.img`
  animation: ${pulse} 2s infinite ease-in-out alternate;
`;

const Login = ({ handleSubmit }: { handleSubmit: (user: string) => void }) => {
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = formData.get("username");
    if (
      typeof user !== "string" ||
      user.trim() === "" ||
      user.trim().length < 3
    ) {
      console.error("Attention");
      return;
    }
    handleSubmit(user);
    socket.emit("send_username", user);
    (e.currentTarget as HTMLFormElement).reset();
  };
  return (
    <>
      <Container>
        <LoginContainer>
          <section>
            <PageTitle>Welcome</PageTitle>
            <Image
              width={70}
              draggable="false"
              src="/assets/chat-bubble-front-gradient.png"
              alt="chat bubbles"
            />
          </section>
          <P>Set a username to get started</P>
          <FormLogin handleFormSubmit={handleFormSubmit} />
        </LoginContainer>
      </Container>
    </>
  );
};
export default Login;
