import dotenv from "dotenv";
import neo, { ManagedTransaction, Session } from "neo4j-driver";
import { v4 as uuid } from "uuid";
dotenv.config();
const { NEO_URL, NEO_USER, NEO_PASSWORD } = process.env;
const driver = neo.driver(NEO_URL, neo.auth.basic(NEO_USER, NEO_PASSWORD));
export { driver, ManagedTransaction, Session, uuid };
//# sourceMappingURL=seedConfig.js.map