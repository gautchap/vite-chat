import { useEffect, useState } from "react";
import { socket } from "../socket";

const Chat = ({ username }: { username: string }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [message, setMessage] = useState("");
  const [actualRoom, setActualRoom] = useState("Room 1");
  const [typingMessage, setTypingMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      socket.emit("join_room", actualRoom);
    }

    function onMessage(data: {
      message: string;
      isTyping: boolean;
      username: string;
    }) {
      setMessage(data.message);
      if (data.isTyping) {
        return setTypingMessage(`${data.username} is writing ...`);
      }
      return setTypingMessage("");
    }

    function onDisconnect() {
      setIsConnected(false);
    }
    function onTypingMessage(data: { isTyping: boolean; username: string }) {
      if (data.isTyping) {
        return setTypingMessage(`${data.username} is writing ...`);
      }
      return setTypingMessage("");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receive_message", onMessage);
    socket.on("receive_typing_message", onTypingMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receive_message", onMessage);
      socket.off("receive_typing_message", onTypingMessage);
    };
  }, [actualRoom]);

  const sendMessage = () => {
    socket.emit("send_message", {
      message: inputMessage,
      actualRoom,
      isTyping: false,
      id: socket.id,
      username,
    });
    setTypingMessage("");
    setInputMessage("");
  };

  const joinRoom = (room: string) => {
    socket.emit("leave_room", actualRoom);
    setActualRoom(room);
    socket.emit("join_room", room);
  };

  const handleTyping = (e: { currentTarget: { value: string } }) => {
    setInputMessage(e.currentTarget.value);
    if (e.currentTarget.value.trim() === "") {
      return socket.emit("send_typing_message", {
        actualRoom,
        isTyping: false,
        id: socket.id,
        username,
      });
    }
    return socket.emit("send_typing_message", {
      actualRoom,
      isTyping: true,
      id: socket.id,
      username,
    });
  };

  return (
    <>
      <h2>
        {actualRoom}, {username}
      </h2>
      {isConnected ? <p>connected</p> : <p>disconnected</p>}
      <p>{message}</p>

      <button onClick={() => joinRoom("Room Dev")}>Room 1</button>
      <button onClick={() => joinRoom("Room Prod")}>Room 2</button>

      {typingMessage ? <p>{typingMessage}</p> : false}
      <input type="text" value={inputMessage} onChange={handleTyping} />
      <button onClick={sendMessage}>Send</button>
    </>
  );
};

export default Chat;
