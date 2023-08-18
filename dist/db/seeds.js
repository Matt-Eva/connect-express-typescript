import neo from "neo4j-driver";
const { NEO_URL, NEO_USER, NEO_PASSWORD, SESSION_SECRET, FRONTEND_URL } = process.env;
const driver = neo.driver(NEO_URL, neo.auth.basic(NEO_USER, NEO_PASSWORD));
//# sourceMappingURL=seeds.js.map