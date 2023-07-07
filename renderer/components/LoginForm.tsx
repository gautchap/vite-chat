import { FormEvent } from "react";
import { socket } from "../socket";
import { Form, Input, LabelInput, InputWrapper } from "./inputs";

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
      <h1>Welcome 👋</h1>
      <p>Set a username to get started</p>
      <Form onSubmit={handleFormSubmit}>
        <InputWrapper>
          <LabelInput htmlFor="username">Username</LabelInput>
          <Input type="text" name="username" id="username" />
        </InputWrapper>
        <Input background={"orange"} type="submit" value="Enter" />
      </Form>
    </>
  );
};
export default LoginForm;
