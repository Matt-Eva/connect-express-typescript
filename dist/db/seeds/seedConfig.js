import dotenv from "dotenv";
import neo from "neo4j-driver";
dotenv.config();
const { NEO_URL, NEO_USER, NEO_PASSWORD } = process.env;
const driver = neo.driver(NEO_URL, neo.auth.basic(NEO_USER, NEO_PASSWORD));
//# sourceMappingURL=seedConfig.js.map