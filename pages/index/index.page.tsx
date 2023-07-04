import { useState } from "react";
import Form from "../../renderer/components/Form";
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
        <Form handleSubmit={handleSubmit} />
      )}
    </>
  );
}
