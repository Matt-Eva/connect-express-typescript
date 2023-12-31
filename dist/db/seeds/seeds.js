import { driver, closeDriver } from "./seedConfig.js";
import deleteSeeds from "./deleteSeeds.js";
import createUsers from "./node_seeds/userNodeSeeds.js";
import createChats from "./node_seeds/chatNodeSeeds.js";
import createMessages from "./node_seeds/messageNodeSeeds.js";
import createConnectedRelationships from "./relationship_seeds/connectedRelSeeds.js";
try {
    await driver.verifyConnectivity();
    console.log("connected");
}
catch (err) {
    console.log(`-- Connection error --\n${err}\n-- Cause --\n${err}`);
}
const seed = async (driver) => {
    await deleteSeeds(driver);
    const users = await createUsers(driver);
    const chats = await createChats(driver);
    const messages = await createMessages(driver);
    await createConnectedRelationships(driver, users);
    await closeDriver();
};
seed(driver);
// Chat Seeds
// try {
//   const checkChat = `MATCH (c:Chat) RETURN c`
//   let transaction = await session.beginTransaction()
//   const results = await transaction.run(checkChat)
//   await transaction.commit()
//   await transaction.close()
//   console.log("chat results", results.records)
// } catch(e) {
//   console.error(e)
// }
// try {
//   const checkUserChats = `MATCH (u:User {name: $name}) - [:IN_CHAT] -> (c:Chat) RETURN c`
//   let transaction = await session.beginTransaction()
//   const results = await transaction.run(checkUserChats, {name: "Wills"})
//   await transaction.commit()
//   await transaction.close()
//   console.log("user relationship results", results.records)
// } catch(e) {
//   console.error(e)
// }
// Message Seeds
// const message = {
//   text: "Hello world"
// }
// try {
//   const createMessageInChat = `
//     MATCH (c:Chat {id: $id})
//     CREATE (m:Message {text: $text}), (m) - [p:POSTED_IN] -> (c)
//     RETURN m, p
//   `
//   let transaction = await session.beginTransaction()
//   const results = await transaction.run(createMessageInChat, {id: chats[0].id, text: message.text})
//   await transaction.commit()
//   await transaction.close()
//   console.log("relationship results", results.records)
// } catch(e) {
//   console.error(e)
// }
// await session.close()
// await driver.close()
//# sourceMappingURL=seeds.js.map