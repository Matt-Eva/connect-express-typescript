import { uuid } from "./seedConfig.js";
const createChat = async (chat, users, session) => {
    try {
        const createChatWithUsers = `
        MATCH (a:User), (b:User), (d:User) 
        WHERE a.name='Matt' AND b.name = 'Wills' AND d.name = 'CJ'
        CREATE (c:Chat {id: $id}), (a) - [m:IN_CHAT]->(c), (b) - [n:IN_CHAT] -> (c),  (d) - [o:IN_CHAT] -> (c)
        RETURN c, m, n
        `;
        // const createChatWithUsers = `CREATE (c:Chat {id: $id}) RETURN c`
        let transaction = await session.beginTransaction();
        const results = await transaction.run(createChatWithUsers, chat);
        await transaction.commit();
        await transaction.close();
        console.log("relationship results", results.records);
    }
    catch (e) {
        console.error(e);
    }
};
const createChats = async (driver, users) => {
    const chats = [
        {
            id: uuid(),
            names: []
        },
        {
            id: uuid(),
            names: []
        },
    ];
    for (let i = 0; i < users.length; i++) {
    }
};
export default createChats;
//# sourceMappingURL=chatNodeSeeds.js.map