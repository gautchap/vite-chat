// This file isn't processed by Vite, see https://github.com/brillout/vite-plugin-ssr/issues/562
//  - Consequently, the server needs be manually restarted when changing this file

import express from "express";
import compression from "compression";
import { renderPage } from "vite-plugin-ssr/server";
import { root } from "./root.js";
import http from "node:http";
import { Server } from "socket.io";
import { webSocket } from "./websocket.js";
const isProduction = process.env.NODE_ENV === "production";

await startServer();

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const io = new Server(httpServer);

  app.use(compression());

  // Vite integration
  if (isProduction) {
    // In production, we need to serve our static assets ourselves.
    // (In dev, Vite's middleware serves our static assets.)
    const sirv = (await import("sirv")).default;
    app.use(sirv(`${root}/dist/client`));
  } else {
    // We instantiate Vite's development server and integrate its middleware to our server.
    // ⚠️ We instantiate it only in development. (It isn't needed in production and it
    // would unnecessarily bloat our server in production.)
    const vite = await import("vite");
    const viteDevelopmentMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;
    app.use(viteDevelopmentMiddleware);
  }

  // ...
  // Other middlewares (e.g. some RPC middleware such as Telefunc)
  // ...

  // Vite-plugin-ssr middleware. It should always be our last middleware (because it's a
  // catch-all middleware superseding any middleware placed after it).
  app.get("*", async (request, res, next) => {
    const pageContextInit = {
      urlOriginal: request.originalUrl,
    };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) return next();
    const { body, statusCode, contentType, earlyHints } = httpResponse;
    if (res.writeEarlyHints)
      res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
    res.status(statusCode).type(contentType).send(body);
  });
  webSocket(io);
  const port = process.env.VITE_APP_PORT || 3000;
  httpServer.listen(port);
  console.log(`✅ Server running at http://localhost:${port}`);
}
