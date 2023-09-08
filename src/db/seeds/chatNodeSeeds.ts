// This file contains functions that seed Chat nodes
import { create } from "domain"
import { Driver, Session, uuid} from "./seedConfig.js"
import {User} from "./userNodeSeeds.js"

type Chat = {
    id: string
}
  
const createChat = async (session: Session, chat: Chat)  => {
    try {
        // const createChatWithUsers = `
        // MATCH (a:User), (b:User), (d:User) 
        // WHERE a.name='Matt' AND b.name = 'Wills' AND d.name = 'CJ'
        // CREATE (c:Chat {id: $id}), (a) - [m:PARTICIPATING_IN_CHAT]->(c), (b) - [n:PARTICIPATING_IN_CHAT] -> (c),  (d) - [o:PARTICIPATING_IN_CHAT] -> (c)
        // RETURN c, m, n
        // `
        const createChatWithUsers = `CREATE (c:Chat {id: $id}) RETURN c`
        let transaction = await session.beginTransaction()
        const results = await transaction.run(createChatWithUsers, chat)
        await transaction.commit()
        await transaction.close()
        console.log("relationship results", results.records)
    } catch(e) {
        console.error(e)
    }
    
}

const createChats = async (driver: Driver) =>{
    const chats: Array<Chat>  = []
    const session = driver.session()
    for (let i = 0; i < 8; i++){
        const chat = {id: uuid()}
        createChat(session, chat)
        chats.push(chat)
    }
    return chats;
}

export default createChats;