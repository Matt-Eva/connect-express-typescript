import { uuid } from "./seedConfig.js";
import { faker } from "@faker-js/faker";
const createMessage = async (session, message) => {
    try {
        const createMessageInChat = `
        MATCH (c:Chat {id: $id})
        CREATE (m:Message {text: $text, id: $id})
    `;
        let transaction = await session.beginTransaction();
        const results = await transaction.run(createMessageInChat, message);
        await transaction.commit();
        await transaction.close();
        console.log("relationship results", results.records);
    }
    catch (e) {
        console.error(e);
    }
};
const createMessages = async (driver) => {
    const session = driver.session();
    const messages = [];
    for (let i = 0; i < 21; i++) {
        const message = {
            text: faker.word.verb(),
            id: uuid()
        };
        await createMessage(session, message);
        messages.push(message);
    }
    await session.close();
    return messages;
};
export default createMessages;
//# sourceMappingURL=messageNodeSeeds.js.map