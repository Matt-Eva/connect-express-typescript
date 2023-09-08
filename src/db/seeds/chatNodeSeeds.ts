// This file contains functions that seed Chat nodes
import { Driver, Session, uuid} from "./seedConfig.js"
import {User} from "./userNodeSeeds.js"

interface Chat {
    id: string,
    names: Array<string>
}
  
const createChat = async (chat: Chat, users: Array<User>, session: Session) => {
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

const createChats = async (driver: Driver, users: Array<User>) =>{
    const chats = [
        {
          id: uuid(), 
          names: [
      
          ]
        },
        {
          id: uuid(),
          names: [
            
          ]
        },
    ]

    for (let i = 0; i < users.length ; i++){
        
    }
    return chats;
}

export default createChats;