import dotenv from "dotenv";
import neo from "neo4j-driver";
dotenv.config();
const { NEO_URL, NEO_USER, NEO_PASSWORD } = process.env;
const driver = neo.driver(NEO_URL, neo.auth.basic(NEO_USER, NEO_PASSWORD));
const session = driver.session();
try {
    const checkAllNodes = "MATCH (n) RETURN n";
    let transaction = await session.beginTransaction();
    const results = await transaction.run(checkAllNodes);
    await transaction.commit();
    await transaction.close();
    console.log("created users", results.records);
}
catch (error) {
    console.error(error);
}
try {
    const checkUsers = "MATCH (u:User) RETURN u";
    let transaction = await session.beginTransaction();
    const results = await transaction.run(checkUsers);
    await transaction.commit();
    await transaction.close();
    console.log("created users", results.records);
}
catch (error) {
    console.error(error);
}
await session.close();
await driver.close();
//# sourceMappingURL=checkSeeds.js.map