import {Driver, Session, ManagedTransaction} from "../seedConfig.js"
import { User } from "../node_seeds/userNodeSeeds.js"

const createConnected = async (session: Session, firstUser: User, secondUser: User) =>{
    try {
        const query = `
            MATCH (a:User), (b:User)
            WHERE a.name = $firstName AND b.name = $secondName
            CREATE a - [r:CONNECTED] -> b
            RETURN r
        `
        const result = await session.executeWrite(async (tx: ManagedTransaction) =>{
            return tx.run(query, {firstName: firstUser.name, secondName: secondUser.name})
        })
        console.log(result)
    } catch (error) {
        console.error(error)
    }
}

const createConnectedRelationships = async (driver: Driver, users: Array<User>) => {
    const session = driver.session()
    for (let i = 0; i < users.length; i++){
        const firstUser = users[i]
        for (let n = i + 1; n < users.length; n++){
            const secondUser = users[n]
            await createConnected(session, firstUser, secondUser)
        }
    }
    await session.close()
}

export default createConnectedRelationships;