import dotenv from "dotenv"
import neo, { ManagedTransaction } from "neo4j-driver";
import { v4 as uuid } from "uuid";

dotenv.config()

const {NEO_URL, NEO_USER, NEO_PASSWORD, SESSION_SECRET, FRONTEND_URL} = process.env

const driver = neo.driver(
    NEO_URL, neo.auth.basic(NEO_USER, NEO_PASSWORD)
);

const session = driver.session()
// console.log(uuid())

// Delete Seeds

try {
    await driver.verifyConnectivity()
    console.log("connected")
  } catch(err) {
    console.log(`-- Connection error --\n${err}\n-- Cause --\n${err}`)

  }

// try {   
//     const deleteUsers = "Match(u:User) DETACH DELETE u"
//     let transaction = await session.beginTransaction()
//     await transaction.run(deleteUsers)
//     await transaction.close()
// } catch (error){
//     console.error(error)
// }



// User Seeds

const user1 = {
    id: uuid(),
    name: "Matt"
}

// Chat Seeds



// Message Seeds