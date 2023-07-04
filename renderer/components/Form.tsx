import { FormEvent } from "react";

const Form = ({ handleSubmit }: { handleSubmit: (user: string) => void }) => {
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
    (e.currentTarget as HTMLFormElement).reset();
  };
  return (
    <>
      <h1>Welcome 👋</h1>
      <p>Set a username to get started</p>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="username" />
        <button type="submit">Enter</button>
      </form>
    </>
  );
};
export default Form;
