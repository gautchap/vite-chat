import { socket } from "../../renderer/socket.js";
import { SetStateAction, useEffect, useState } from "react";

export { Page };

function Page() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [message, setMessage] = useState("");
  const [actualRoom, setActualRoom] = useState(0);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onMessage(data: { message: SetStateAction<string> }) {
      setMessage(data.message);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receive_message", onMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receive_message", onMessage);
    };
  }, []);

  const sendMessage = () => {
    socket.emit("send_message", { message: "hello", actualRoom });
  };

  const joinRoom = (room: number) => {
    socket.emit("leave_room", actualRoom);
    setActualRoom(room);
    socket.emit("join_room", room);
  };

  return (
    <>
      <h1>Welcome</h1>
      <h2>{actualRoom}</h2>
      {isConnected ? <p>connecté</p> : <p>pas connecté</p>}

      <p>{message}</p>
      <button onClick={sendMessage}>Envoyer message</button>
      <button onClick={() => joinRoom(1)}>Room 1</button>
      <button onClick={() => joinRoom(2)}>Room 2</button>
    </>
  );
}
