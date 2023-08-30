import express from "express";
import neo from "neo4j-driver";
import { Server } from "socket.io";
import cors from "cors";
import session from "express-session";
import { createServer } from "http";
const { NEO_URL, NEO_USER, NEO_PASSWORD, SESSION_SECRET, FRONTEND_URL } = process.env;
console.log(FRONTEND_URL);
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
    console.log(socket.request.session);
    const room = socket.handshake.query.room;
    if (room) {
        socket.join(room);
        socket.on("message", (arg) => {
            socket.to(room).emit("broadcast", arg);
        });
    }
    else {
        socket.disconnect();
    }
    socket.on("disconnect", () => {
        console.log("disconnected");
    });
});
server.listen(4000, () => {
    console.log("Server running on port 4000");
});
// ====== USER ROUTES ========
app.post('/login', async (req, res) => {
    const session = driver.session();
    try {
        const query = 'MATCH (u:User {name: $name}) -[:IN_CHAT]-> (c:Chat) <-[IN_CHAT] -(p:User) RETURN u AS user, c.id AS chat, p.name AS participant';
        const transaction = async (tx) => {
            return await tx.run(query, { name: req.body.name });
        };
        const result = await session.executeRead(transaction);
        console.log(result.records);
        const user = result.records[0].get(0).properties;
        if (user) {
            req.session.user = {
                name: user.name
            };
        }
        const chatHash = {};
        for (const record of result.records) {
            const chatId = record.get("chat");
            const participant = record.get("participant");
            if (chatHash[chatId]) {
                const participants = [...chatHash[chatId].participants, participant];
                chatHash[chatId].participants = participants;
            }
            else {
                chatHash[chatId] = {
                    id: chatId,
                    participants: [participant]
                };
            }
            console.log(record.get("chat"));
            console.log(record.get("participant"));
        }
        res.status(200).send({ user: user, chats: chatHash });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error });
    }
});
app.get("/me", (req, res) => {
    console.log(req.session.id);
});
// =========== CHAT ROUTES ==========
app.get("/my-chats", async (req, res) => {
    if (req.session.user) {
        const username = req.session.user.name;
        const session = driver.session();
        try {
            const query = "MATCH (p:Person, {name: $name})-[:IN_CHAT]-(c:Chat) RETURN c";
        }
        catch (error) {
            console.error(error);
        }
    }
    else {
        res.status(401).send({ message: "You are not logged in" });
    }
});
//# sourceMappingURL=index.js.map