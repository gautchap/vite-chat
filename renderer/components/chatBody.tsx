import styled from "@emotion/styled";

export const Main = styled.main`
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const FormMessage = styled.form`
  display: flex;
  position: relative;
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
export const ReceiveMessage = styled.li`
  background-color: lightgrey;
  display: inline-block;
  padding: 0 1em;
  border-radius: 20px;
  border-bottom-left-radius: 0;
  margin-bottom: 0.5em;
`;

export const SendMessage = styled.li`
  float: right;
  background-color: #1b90ff;
  color: white;
  display: inline-block;
  padding: 0 1em;
  border-radius: 20px;
  border-bottom-right-radius: 0;
  margin-bottom: 0.5em;
`;
