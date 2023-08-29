import { create } from "domain";
import dotenv from "dotenv"
import neo, { ManagedTransaction } from "neo4j-driver";
import { v4 as uuid } from "uuid";

dotenv.config()

const {NEO_URL, NEO_USER, NEO_PASSWORD} = process.env

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

const deleteSeeds = async () =>{

  try {   
    console.log("deleting nodes")
    const deleteNodes = "MATCH (n) DETACH DELETE n"
    let transaction = await session.beginTransaction()
    console.log("starting transaction")
    const result = await transaction.run(deleteNodes)
    await transaction.commit()
    console.log(result)
    await transaction.close()
    console.log("transaction closed")
  } catch (error){
    console.error(error)
  }

  // try {   
  //   console.log("deleting users")
  //   const deleteUsers = "MATCH (u:User) DETACH DELETE u"
  //   let transaction = await session.beginTransaction()
  //   console.log("starting transaction")
  //   await transaction.run(deleteUsers)
  //   console.log("users deleted")
  //   await transaction.close()
  //   console.log("transaction closed")
  // } catch (error){
  //   console.error(error)
  // }
  
  // try {
  //   console.log("deleting messages")
  //   const deleteMessages = "MATCH (m:Message) DETACH DELETE m"
  //   let transaction = await session.beginTransaction()
  //   await transaction.run(deleteMessages)
  //   await transaction.close()
  //   console.log("messages deleted")
  // } catch (error){
  //   console.error(error)
  // }
  
  // try {
  //   console.log("deleting chats")
  //   const deleteChats = "MATCH (c:Chat) DETACH DELETE c"
  //   let transaction = await session.beginTransaction()
  //   await transaction.run(deleteChats)
  //   await transaction.close()
  //   console.log("chats deleted")
  // } catch (error){
  //   console.error(error)
  // }
  
  // // Verify Deletion
  
  // try {
  //   console.log("verifying deletes")
  //   const checkDeleted = "MATCH (n:Chat|Message|User) RETURN n"
  //   let transaction = await session.beginTransaction()
  //   const emptyResults = await transaction.run(checkDeleted)
  //   await transaction.close()
  //   console.log(emptyResults.records)
  // } catch (error){
  //   console.error(error)
  // }
}

await deleteSeeds()

const testCreate = async() =>{
  try {
      const addUser = "CREATE (u:User) RETURN u"
      let transaction = await session.beginTransaction()
      const results = await transaction.run(addUser)
      await transaction.commit()
      await transaction.close()
      // console.log(results.records)
    } catch(e){
      console.error(e)
    }
}

const checkCreate = async () =>{
  try {
    const checkUser = "MATCH (u:User) RETURN u"
    let transaction = await session.beginTransaction()
    const results = await transaction.run(checkUser)
    await transaction.commit()
    await transaction.close()
    // console.log(results.records)
  } catch(e){
    console.error(e)
  }
}

await testCreate()
await checkCreate()

// User Seeds

const users = [
  {
    id: uuid(),
    name: "Matt"
  }, {
    id: uuid(),
    name: "CJ"
  }, {
    id: uuid(),
    name: "Wills"
  }, {
    id: uuid(),
    name: "Gehrig"
  }
]

const createUser = async (user: {id: string, name: string}) =>{
  try {
    const addUser = "CREATE (u:User {id: $id, name: $name}) RETURN u"
    let transaction = await session.beginTransaction()
    const results = await transaction.run(addUser, user)
    await transaction.commit()
    await transaction.close()
    // console.log(results.records)
  } catch(e){
    console.error(e)
  }
}

for (const user of users) {
  await createUser(user)
}

try {
  const checkUsers = "MATCH (u:User) RETURN u"
  let transaction = await session.beginTransaction()
  const results = await transaction.run(checkUsers)
  await transaction.commit()
  await transaction.close()
  console.log("created users", results.records)
} catch(error) {
  console.error(error)
}



// Chat Seeds

const chat = {
  id: uuid()
}

const createChats = async () => {
  try {
    // const createChatWithUsers = `
    //   MATCH (a:User), (b:User) 
    //   WHERE a.name='Matt' AND b.name = 'Wills' 
    //   CREATE (c:Chat {id: $id}), (a) - [m:IN_CHAT]->(c), (b) - [n:IN_CHAT] -> (c) 
    //   RETURN c, m, n
    // `
    const createChatWithUsers = `CREATE (c:Chat {id: $id}) RETURN c`
    let transaction = await session.beginTransaction()
    const results = await transaction.run(createChatWithUsers, {id: 1})
    await transaction.commit()
    await transaction.close()
    console.log("relationship results", results.records[0].get(0))
  } catch(e) {
    console.error(e)
  }
}

await createChats()
console.log("first")


try {
  const checkChat = `MATCH (c:Chat) RETURN c`
  let transaction = await session.beginTransaction()
  const results = await transaction.run(checkChat)
  await transaction.commit()
  await transaction.close()
  console.log("chat results", results.records)
} catch(e) {
  console.error(e)
}


// Message Seeds

// const message = {
//   text: "Hello world"
// }

// try {
//   const createMessageInChat = `
//     MATCH (c:Chat {id: $id})
//     CREATE (m:Message {text: $text}), m - [p:POSTED_IN] -> c
//     RETURN m,p
//   `
//   let transaction = await session.beginTransaction()
//   const results = await transaction.run(createMessageInChat, {id: chat.id, text: message.text})
//   await transaction.close()
//   console.log("relationship results", results)
// } catch(e) {
//   console.error(e)
// }


await session.close()

await driver.close()