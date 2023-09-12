import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import { User } from "../types.js";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { EmojiContainer } from "./Wrapper/Container";
import { FormMessage, InputText } from "./Form/FormStyling";
import { AuthorMessage, Footer, Header, Main, ReceiveMessage, SendMessage, Ul, RoomTitle } from "./ChatStyling";
import { ButtonEmoji, ButtonSend } from "./Buttons/Buttons";

const convertTime = (date: number | undefined) => {
    if (typeof date === "number") {
        const convertDate = new Date(date);
        convertDate.toLocaleString("fr-FR", { timeZone: "Europe/Paris" });
        const hours = (convertDate.getHours() < 10 ? "0" : "") + convertDate.getHours();
        const mins = (convertDate.getMinutes() < 10 ? "0" : "") + convertDate.getMinutes();
        return `${hours}:${mins}`;
    }
};

const isMobile = () => {
    if (/android/i.test(navigator.userAgent)) return "Android";
    if (/iphone/i.test(navigator.userAgent)) return "iPhone";
    return "PC";
};

const Chat = ({ username }: { username: string }) => {
    const [messages, setMessages] = useState<User[]>([]);
    const listReference = useRef<HTMLUListElement>(null);
    const [actualRoom, setActualRoom] = useState("Room Dev");
    const [typingMessage, setTypingMessage] = useState("");
    const [inputMessage, setInputMessage] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);

    useEffect(() => {
        function onMessage(data: User[]) {
            setMessages(data);
            return setTypingMessage("");
        }

        function onTypingMessage(data: { isTyping: boolean; username: string }) {
            if (data.isTyping) {
                return setTypingMessage(`${data.username} is writing ...`);
            }
            return setTypingMessage("");
        }

        socket.on("receive_message", onMessage);
        socket.on("receive_typing_message", onTypingMessage);

        return () => {
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
                <RoomTitle>
                    Welcome {username}, {actualRoom}
                </RoomTitle>
            </Header>

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
                                <i style={{ marginLeft: "1em" }}>send at {convertTime(user.date)}</i>
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
                        {isMobile() === "PC" && <ButtonEmoji setShowEmoji={setShowEmoji} showEmoji={showEmoji} />}
                        <ButtonSend />
                        {showEmoji ? (
                            <EmojiContainer>
                                <Picker
                                    theme="light"
                                    locale={"fr"}
                                    data={data}
                                    onEmojiSelect={(e: { native: string }) => setInputMessage(inputMessage + e.native)}
                                />
                            </EmojiContainer>
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
