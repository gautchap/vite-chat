import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import { User } from "../types.js";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  AuthorMessage,
  ButtonSubmit,
  Footer,
  FormMessage,
  Header,
  InputText,
  Main,
  ReceiveMessage,
  SendMessage,
  Ul,
} from "./chatBody";

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

const isMobile = () => {
  if (/android/i.test(navigator.userAgent)) return "Android";
  if (/iphone/i.test(navigator.userAgent)) return "iPhone";
  return "PC";
};

const Chat = ({ username }: { username: string }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<User[]>([]);
  const listReference = useRef<HTMLUListElement>(null);
  const sendAtHover = useRef<HTMLElement>(null);
  const [actualRoom, setActualRoom] = useState("Room Dev");
  const [typingMessage, setTypingMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onMessage(data: User[]) {
      setMessages(data);
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

  useEffect(() => {
    if (listReference.current) {
      window.scrollTo({
        top: listReference.current.scrollHeight + window.innerHeight,
        left: 0,
        behavior: "smooth",
      });
    }
    return () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };
  }, [messages, typingMessage]);

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
      <Header>
        <h2 style={{ margin: 0 }}>
          {actualRoom}, {username}
        </h2>
      </Header>
      <p style={{ marginTop: "6em" }}>
        {isConnected ? "connected" : "disconnected"}
      </p>

      <Main>
        <Ul ref={listReference}>
          {messages.map((user, index) =>
            user.username === username ? (
              <li key={`${user.id}_${index}`} style={{ textAlign: "end" }}>
                <SendMessage>{user.message}</SendMessage>
              </li>
            ) : (
              <li key={`${user.id}_${index}`}>
                <AuthorMessage>{user.username}</AuthorMessage>
                <ReceiveMessage>{user.message}</ReceiveMessage>
                <i style={{ marginLeft: "1em" }}>
                  send at {convertTime(user.date)}
                </i>
              </li>
            )
          )}
        </Ul>

        {typingMessage ? <p>{typingMessage}</p> : false}

        <Footer>
          <FormMessage onSubmit={sendMessage}>
            <InputText
              type="text"
              value={inputMessage}
              onChange={handleTyping}
              placeholder="Send a message ..."
            />

            {isMobile() === "PC" && (
              <ButtonSubmit emoji onClick={() => setShowEmoji(!showEmoji)}>
                😀
              </ButtonSubmit>
            )}

            <ButtonSubmit type="submit">
              <svg
                style={{ verticalAlign: "middle" }}
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 384 512"
              >
                <path
                  fill="white"
                  d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
                />
              </svg>
            </ButtonSubmit>

            {showEmoji ? (
              <Picker
                locale={"fr"}
                data={data}
                onEmojiSelect={(e: { native: string }) =>
                  setInputMessage(inputMessage + e.native)
                }
              />
            ) : (
              false
            )}
          </FormMessage>
        </Footer>
      </Main>
    </>
  );
};

export default Chat;
