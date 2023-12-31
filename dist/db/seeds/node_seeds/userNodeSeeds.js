import { uuid } from "../seedConfig.js";
const createUser = async (user, session) => {
    try {
        const addUser = "CREATE (u:User {id: $id, name: $name}) RETURN u";
        let transaction = await session.beginTransaction();
        const results = await transaction.run(addUser, user);
        await transaction.commit();
        await transaction.close();
        console.log("Created Users", results.records);
    }
    catch (e) {
        console.error(e);
    }
};
const createUsers = async (driver) => {
    const session = driver.session();
    const users = [
        {
            id: uuid(),
            name: "Matt"
        },
        {
            id: uuid(),
            name: "CJ"
        },
        {
            id: uuid(),
            name: "Wills"
        },
        {
            id: uuid(),
            name: "Tom"
        },
        {
            id: uuid(),
            name: "Nick"
        },
        {
            id: uuid(),
            name: "Jay"
        },
        {
            id: uuid(),
            name: "Mustafa"
        }
    ];
    for (const user of users) {
        await createUser(user, session);
    }
    await session.close();
    return users;
};
export default createUsers;
//# sourceMappingURL=userNodeSeeds.js.map