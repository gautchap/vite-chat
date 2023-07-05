import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { User } from "../renderer/types.js";

const defaultRoom = "Room Dev";
const onlineUsers: User[] = [];
const messagesList: User[] = [];

export const webSocket = (io: Server<DefaultEventsMap, DefaultEventsMap>) => {
  const sendMessagesListByRoom = (room: string) => {
    const MessagesInThisRoom = messagesList.filter(
      (user) => user.actualRoom === room
    );
    return io.in(room).emit("receive_message", MessagesInThisRoom);
  };

  io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);
    socket.join(defaultRoom);

    socket.on("join_room", async (room: string) => {
      socket.join(room);
      const index = onlineUsers.findIndex((user) => user.id === socket.id);
      if (index !== -1) {
        onlineUsers[index].actualRoom = room;
      }
      sendMessagesListByRoom(room);
    });

    socket.on("leave_room", (room: string) => {
      socket.leave(room);
    });

    socket.on("send_username", (username: string) => {
      onlineUsers.push({
        id: socket.id,
        username,
        actualRoom: defaultRoom,
      });
      sendMessagesListByRoom(defaultRoom);
    });

    socket.on("send_message", (data: User) => {
      messagesList.push(data);
      sendMessagesListByRoom(data.actualRoom);
    });

    socket.on("send_typing_message", (data: User) => {
      return socket.to(data.actualRoom).emit("receive_typing_message", data);
    });
  });
};
