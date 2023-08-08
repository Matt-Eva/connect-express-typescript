import express, { Express, Request, Response, NextFunction } from "express";
import neo, { ManagedTransaction } from "neo4j-driver";
import { Server } from "socket.io";
import cors from "cors";
import session, { Session } from "express-session";
import { createServer } from "http";
import { create } from "domain";

type User = {
    born: object,
    name: string
}

declare module "http" {
    interface IncomingMessage {
        cookieHolder?: string,
        session: Session
    }
}

declare module "express-session" {
    interface SessionData {
        user: User;
    }
}

const {NEO_URL, NEO_USER, NEO_PASSWORD, SESSION_SECRET, FRONTEND_URL} = process.env
console.log(FRONTEND_URL)
const app = express();
const server = createServer(app);

const driver = neo.driver(
    NEO_URL, neo.auth.basic(NEO_USER, NEO_PASSWORD)
);

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
})

io.use((socket, next) =>{
    sessionMiddleware(socket.request as Request, {} as Response, next as NextFunction)
})

io.on("connection", async (socket) =>{
    console.log(socket.request.session)
    const room = socket.handshake.query.room
    if (room){
        socket.join(room)
        socket.on("message", (arg) =>{
            socket.to(room).emit("broadcast", arg)
        })
    } else{
        socket.disconnect()
    }
})

server.listen(4000, () =>{
    console.log("Server running on port 4000");
})

app.post('/login', async (req: Request, res) =>{
    const session = driver.session()
    try {
        const query = 'MATCH (p:Person {name: $name}) RETURN p'
        const transaction = async (tx: ManagedTransaction) =>{
            return await tx.run(query, {name: req.body.name})
        } 
        const result = await session.executeRead(transaction)
        const user = result.records[0].get(0).properties
        if (user){
            req.session.user = {
                born: user.born,
                name: user.name
            }
        }
        console.log(req.session.id)
        res.status(200).send(user)
    } catch (error){
        console.error(error)
        res.status(500).send({error: error})
    }
})

app.get("/me", (req, res) =>{
    console.log(req.session.id)
})