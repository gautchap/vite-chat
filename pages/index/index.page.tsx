import { useState } from "react";
import Login from "../../renderer/components/Login";
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
        <Login handleSubmit={handleSubmit} />
      )}
    </>
  );
}
