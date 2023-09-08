// This file contains functions that seed Chat nodes
import { uuid } from "../seedConfig.js";
const createChat = async (session, chat) => {
    try {
        // const createChatWithUsers = `
        // MATCH (a:User), (b:User), (d:User) 
        // WHERE a.name='Matt' AND b.name = 'Wills' AND d.name = 'CJ'
        // CREATE (c:Chat {id: $id}), (a) - [m:PARTICIPATING_IN_CHAT]->(c), (b) - [n:PARTICIPATING_IN_CHAT] -> (c),  (d) - [o:PARTICIPATING_IN_CHAT] -> (c)
        // RETURN c, m, n
        // `
        const createChatWithUsers = `CREATE (c:Chat {id: $id}) RETURN c`;
        let transaction = await session.beginTransaction();
        const results = await transaction.run(createChatWithUsers, chat);
        await transaction.commit();
        await transaction.close();
        console.log("created Chats", results.records);
    }
    catch (e) {
        console.error(e);
    }
};
const createChats = async (driver) => {
    const chats = [];
    const session = driver.session();
    for (let i = 0; i < 7; i++) {
        const chat = { id: uuid() };
        await createChat(session, chat);
        chats.push(chat);
    }
    await session.close();
    return chats;
};
export default createChats;
//# sourceMappingURL=chatNodeSeeds.js.map