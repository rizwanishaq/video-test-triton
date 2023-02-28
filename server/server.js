const WebSocketServer = require("ws").Server;
const http = require("http");
const express = require("express");
const uuidv4 = require("uuid").v4;
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors");

const processWebSocket = require("./utils/streamProcessing");

const app = express();

// Middleware initialized
app.use(morgan("common")); // Logging
app.use(helmet()); // For security
app.use(cors()); // Enable all cors request
app.use(express.json()); // Enable json parsing

// Server related resources
const port = process.env.PORT || 5000;
const server = http.createServer(app);

// Websocket Server
const wss = new WebSocketServer({ server: server });
console.log("websocket server created".green);

wss.on("connection", (ws, req) => {
  console.log(
    `websocket connection from ${req.connection.remoteAddress}`.green.underline
      .bold
  );

  processWebSocket(ws, uuidv4());
});

// Server started to listen
server.listen(port, () => {
  console.log(`CORS-enables server is listening on port ${port}`.green);
});
