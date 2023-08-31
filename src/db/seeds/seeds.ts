import { driver, Driver, closeDriver } from "./seedConfig.js"
import deleteSeeds from "./deleteSeeds.js"
import createUsers from "./userNodeSeeds.js"


try {
  await driver.verifyConnectivity()
  console.log("connected")
} catch(err) {
  console.log(`-- Connection error --\n${err}\n-- Cause --\n${err}`)
}

const seed =  async (driver: Driver) =>{
  await deleteSeeds(driver)
  const users = await createUsers(driver)
  await closeDriver()
}



// Chat Seeds

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

const createChats = async (chat: {id: string}) => {
  try {
    const createChatWithUsers = `
      MATCH (a:User), (b:User), (d:User) 
      WHERE a.name='Matt' AND b.name = 'Wills' AND d.name = 'CJ'
      CREATE (c:Chat {id: $id}), (a) - [m:IN_CHAT]->(c), (b) - [n:IN_CHAT] -> (c),  (d) - [o:IN_CHAT] -> (c)
      RETURN c, m, n
    `
    // const createChatWithUsers = `CREATE (c:Chat {id: $id}) RETURN c`
    let transaction = await session.beginTransaction()
    const results = await transaction.run(createChatWithUsers, chat)
    await transaction.commit()
    await transaction.close()
    console.log("relationship results", results.records)
  } catch(e) {
    console.error(e)
  }
}

for (const chat of chats) {
  await createChats(chat)
}

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

try {
  const checkUserChats = `MATCH (u:User {name: $name}) - [:IN_CHAT] -> (c:Chat) RETURN c`
  let transaction = await session.beginTransaction()
  const results = await transaction.run(checkUserChats, {name: "Wills"})
  await transaction.commit()
  await transaction.close()
  console.log("user relationship results", results.records)
} catch(e) {
  console.error(e)
}


// Message Seeds

const message = {
  text: "Hello world"
}

try {
  const createMessageInChat = `
    MATCH (c:Chat {id: $id})
    CREATE (m:Message {text: $text}), (m) - [p:POSTED_IN] -> (c)
    RETURN m, p
  `
  let transaction = await session.beginTransaction()
  const results = await transaction.run(createMessageInChat, {id: chats[0].id, text: message.text})
  await transaction.commit()
  await transaction.close()
  console.log("relationship results", results.records)
} catch(e) {
  console.error(e)
}


await session.close()

await driver.close()