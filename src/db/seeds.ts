import dotenv from "dotenv"
import neo, { ManagedTransaction } from "neo4j-driver";
import { v4 as uuid } from "uuid";

dotenv.config()

const {NEO_URL, NEO_USER, NEO_PASSWORD, SESSION_SECRET, FRONTEND_URL} = process.env

const driver = neo.driver(
    NEO_URL, neo.auth.basic(NEO_USER, NEO_PASSWORD)
);
// console.log(uuid())

// Delete Seeds

try {
  await driver.verifyConnectivity()
  console.log("connected")
} catch(err) {
  console.log(`-- Connection error --\n${err}\n-- Cause --\n${err}`)
}

const session = driver.session()

try {   
  console.log("deleting users")
  const deleteUsers = "MATCH (u:User) DETACH DELETE u"
  let transaction = await session.beginTransaction()
  console.log("starting transaction")
  await transaction.run(deleteUsers)
  console.log("users deleted")
  await transaction.close()
  console.log("transaction closed")
} catch (error){
  console.error(error)
}

try {
  console.log("deleting messages")
  const deleteMessages = "MATCH (m:Message) DETACH DELETE m"
  let transaction = await session.beginTransaction()
  await transaction.run(deleteMessages)
  await transaction.close()
  console.log("messages deleted")
} catch (error){
  console.error(error)
}

try {
  console.log("deleting chats")
  const deleteChats = "MATCH (c:Chat) DETACH DELETE c"
  let transaction = await session.beginTransaction()
  await transaction.run(deleteChats)
  await transaction.close()
  console.log("chats deleted")
} catch (error){
  console.error(error)
}

// Verify Deletion

try {
  console.log("verifying deletes")
  const checkDeleted = "MATCH (n:Chat|Message|User) RETURN n"
  let transaction = await session.beginTransaction()
  const emptyResults = await transaction.run(checkDeleted)
  await transaction.close()
  console.log(emptyResults)
} catch (error){
  console.error(error)
}



// User Seeds

const user1 = {
    id: uuid(),
    name: "Matt"
}

// Chat Seeds



// Message Seeds