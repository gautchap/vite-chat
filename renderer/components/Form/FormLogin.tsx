import { Form, LabelInput } from "./FormStyling";
import { FormEventHandler } from "react";
import { ButtonLogin, Input } from "../Buttons/Buttons";
import { InputContainer } from "../Wrapper/Container";

type Props = {
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
};
const FormLogin = ({ handleFormSubmit }: Props) => {
  return (
    <Form onSubmit={handleFormSubmit}>
      <InputContainer>
        <LabelInput htmlFor="username">Username</LabelInput>
        <Input />
      </InputContainer>
      <ButtonLogin>Enter</ButtonLogin>
    </Form>
  );
};
export default FormLogin;
