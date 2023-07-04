import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export const webSocket = (io: Server<DefaultEventsMap, DefaultEventsMap>) => {
  io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);

    socket.on("join_room", (room) => {
      socket.join(room);
    });

    socket.on("leave_room", (room) => {
      socket.leave(room);
    });

    socket.on("send_message", (data) => {
      socket.to(data.actualRoom).emit("receive_message", data);
    });
  });
};
