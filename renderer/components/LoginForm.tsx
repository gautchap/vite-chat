import { FormEvent } from "react";
import { socket } from "../socket";
import {
  Form,
  InputLog,
  ButtonLog,
  LabelInput,
  InputWrapper,
  PageTitle,
  LoginWrapper,
  BackgroundWrapper,
} from "./inputs";

const LoginForm = ({
  handleSubmit,
}: {
  handleSubmit: (user: string) => void;
}) => {
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
      <BackgroundWrapper>
        <LoginWrapper>
          <section>
            <PageTitle>Welcome</PageTitle>
            <img
              width={70}
              draggable="false"
              src="/assets/chat-bubble-front-gradient.png"
              alt="chat bubbles"
            />
          </section>
          <p>Set a username to get started</p>
          <Form onSubmit={handleFormSubmit}>
            <InputWrapper>
              <LabelInput htmlFor="username">Username</LabelInput>
              <InputLog
                color="#1B90FF"
                border
                type="text"
                name="username"
                id="username"
                autoComplete="off"
              />
            </InputWrapper>
            <ButtonLog
              background={"linear-gradient(92.72deg, #1b90ff 0%, #876bce 100%)"}
              color="white"
              type="submit"
            >
              Enter
            </ButtonLog>
          </Form>
        </LoginWrapper>
      </BackgroundWrapper>
    </>
  );
};
export default LoginForm;
