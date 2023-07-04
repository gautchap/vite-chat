import { useEffect, useState } from "react";
import { socket } from "../socket";

const Chat = ({ username }: { username: string }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [message, setMessage] = useState("");
  const [actualRoom, setActualRoom] = useState<string>("Room 1");

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      socket.emit("join_room", actualRoom);
    }

    function onMessage(data: { message: string }) {
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
  }, [actualRoom]);

  const sendMessage = () => {
    socket.emit("send_message", { message: "hello", actualRoom });
  };

  const joinRoom = (room: string) => {
    socket.emit("leave_room", actualRoom);
    setActualRoom(room);
    socket.emit("join_room", room);
  };

  return (
    <>
      <h2>
        {actualRoom}, {username}
      </h2>
      {isConnected ? <p>connecté</p> : <p>pas connecté</p>}
      <p>{message}</p>
      <button onClick={sendMessage}>Envoyer message</button>
      <button onClick={() => joinRoom("Room Dev")}>Room 1</button>
      <button onClick={() => joinRoom("Room Prod")}>Room 2</button>
    </>
  );
};

export default Chat;
