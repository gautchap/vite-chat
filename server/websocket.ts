import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

interface Data {
  message?: string;
  actualRoom: string;
  isTyping: boolean;
  id: string;
  username: string;
}

export const webSocket = (io: Server<DefaultEventsMap, DefaultEventsMap>) => {
  io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);
    socket.join("Room 1");

    socket.on("join_room", (room: string) => {
      socket.join(room);
    });

    socket.on("leave_room", (room: string) => {
      socket.leave(room);
    });

    socket.on("send_message", (data: Data) => {
      socket.to(data.actualRoom).emit("receive_message", data);
    });

    socket.on("send_typing_message", (data: Data) => {
      socket.to(data.actualRoom).emit("receive_typing_message", data);
    });
  });
};
