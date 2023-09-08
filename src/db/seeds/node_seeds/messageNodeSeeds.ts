import { Driver, Session, uuid} from "../seedConfig.js"
import { faker } from "@faker-js/faker"

interface Message {
    text: string,
    id: string
}

const createMessage = async (session: Session, message: Message) =>{
    try {
    const createMessageInChat = `
        CREATE (m:Message {text: $text, id: $id}) RETURN m
    `
    let transaction = await session.beginTransaction()
    const results = await transaction.run(createMessageInChat, message)
    await transaction.commit()
    await transaction.close()
    console.log("relationship results", results.records)
    } catch(e) {
    console.error(e)
    }
}

const createMessages = async (driver: Driver) =>{
    const session = driver.session()
    const messages: Array<Message> = []
    for (let i = 0; i < 21; i++){
        const message = {
            text: faker.word.verb(),
            id: uuid()
        }
        await createMessage(session, message)
        messages.push(message)
    }
    await session.close()
    return messages;
}

export default createMessages;