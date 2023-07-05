import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { socket } from "../socket";
import { User } from "../types.js";

const convertTime = (date: number | undefined) => {
  if (typeof date === "number") {
    const convertDate = new Date(date);
    convertDate.toLocaleString("fr-FR", { timeZone: "Europe/Paris" });
    const hours =
      (convertDate.getHours() < 10 ? "0" : "") + convertDate.getHours();
    const mins =
      (convertDate.getMinutes() < 10 ? "0" : "") + convertDate.getMinutes();
    return `${hours}:${mins}`;
  }
};

const Chat = ({ username }: { username: string }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<User[]>([]);
  const [personnalMessages, setPersonnalMessages] = useState<User[]>([]);
  const [actualRoom, setActualRoom] = useState("Room Dev");
  const [typingMessage, setTypingMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onMessage(data: User[]) {
      setPersonnalMessages(data.filter((user) => user.username === username));
      setMessages(data.filter((user) => user.username !== username));
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
  }, [username]);

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      socket.emit("send_message", {
        message: inputMessage,
        actualRoom,
        isTyping: false,
        id: socket.id,
        username,
        date: Date.now(),
      });
      setTypingMessage("");
      setInputMessage("");
    }
  };

  const joinRoom = (room: string) => {
    socket.emit("leave_room", actualRoom);
    setActualRoom(room);
    socket.emit("join_room", room);
  };

  const handleTyping = (e: ChangeEvent<HTMLInputElement>) => {
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
      {messages.map((user, index) => (
        <div key={index}>
          <p>
            {user.message} : <i>{user.username}</i> send at{" "}
            {convertTime(user.date)}
          </p>
        </div>
      ))}

      {personnalMessages.map((user, index) => (
        <div key={index}>
          <p>
            {user.message} : <i>{user.username}</i> send at{" "}
            {convertTime(user.date)}
          </p>
        </div>
      ))}

      <button onClick={() => joinRoom("Room Dev")}>Room 1</button>
      <button onClick={() => joinRoom("Room Prod")}>Room 2</button>

      {typingMessage ? <p>{typingMessage}</p> : false}
      <form onSubmit={sendMessage}>
        <input type="text" value={inputMessage} onChange={handleTyping} />
        <input type="submit" value="Send" />
      </form>
    </>
  );
};

export default Chat;
