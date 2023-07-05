import { useState } from "react";
import LoginForm from "../../renderer/components/LoginForm";
import Chat from "../../renderer/components/Chat";

export { Page };

function Page() {
  const [username, setUsername] = useState("");

  const handleSubmit = (user: string) => {
    setUsername(user);
  };

  return (
    <>
      {username ? (
        <Chat username={username} />
      ) : (
        <LoginForm handleSubmit={handleSubmit} />
      )}
    </>
  );
}
