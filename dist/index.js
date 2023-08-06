import express from "express";
import neo from "neo4j-driver";
import { Server } from "socket.io";
import cors from "cors";
import session from "express-session";
import { createServer } from "http";
const { NEO_URL, NEO_USER, NEO_PASSWORD, SESSION_SECRET, FRONTEND_URL } = process.env;
const app = express();
const server = createServer(app);
const driver = neo.driver(NEO_URL, neo.auth.basic(NEO_USER, NEO_PASSWORD));
const sessionMiddleware = session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
});
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));
app.use(sessionMiddleware);
app.use(express.json());
const io = new Server(server, {
    cors: {
        origin: FRONTEND_URL,
        credentials: true
    }
});
io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next);
});
io.on("connection", async (socket) => {
    socket.on("message", (arg) => {
        socket.broadcast.emit("broadcast", arg);
    });
});
server.listen(4000, () => {
    console.log("Server running on port 4000");
});
//# sourceMappingURL=index.js.map