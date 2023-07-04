import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.PROD
  ? undefined
  : `http://localhost:${import.meta.env.VITE_APP_PORT}`;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const socket = io(URL);
