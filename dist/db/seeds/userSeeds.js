import { driver, uuid } from "./seedConfig.js";
const createUser = async (user, session) => {
    try {
        const addUser = "CREATE (u:User {id: $id, name: $name}) RETURN u";
        let transaction = await session.beginTransaction();
        const results = await transaction.run(addUser, user);
        await transaction.commit();
        await transaction.close();
        // console.log(results.records)
    }
    catch (e) {
        console.error(e);
    }
};
const createUsers = async () => {
    const session = driver.session();
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
    ];
    for (const user of users) {
        await createUser(user, session);
    }
    session.close();
};
//# sourceMappingURL=userSeeds.js.map