import { FormEvent } from "react";
import { socket } from "../socket";
import { Form, InputLog, ButtonLog, LabelInput, InputWrapper } from "./inputs";

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
      <h1>
        Welcome{" "}
        <img
          width={70}
          draggable="false"
          src="/assets/chat-bubble-front-gradient.png"
          alt="chat bubbles"
        />
      </h1>
      <p>Set a username to get started</p>
      <Form onSubmit={handleFormSubmit}>
        <InputWrapper>
          <LabelInput htmlFor="username">Username</LabelInput>
          <InputLog
            border
            type="text"
            name="username"
            id="username"
            autoComplete="off"
          />
        </InputWrapper>
        <ButtonLog background={"#E76B0A"} type="submit">
          Enter
        </ButtonLog>
      </Form>
    </>
  );
};
export default LoginForm;
