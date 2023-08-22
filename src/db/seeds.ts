
import neo, { ManagedTransaction } from "neo4j-driver";

const {NEO_URL, NEO_USER, NEO_PASSWORD, SESSION_SECRET, FRONTEND_URL} = process.env

const driver = neo.driver(
    NEO_URL, neo.auth.basic(NEO_USER, NEO_PASSWORD)
);

// User Seeds

const user1 = {
    
}

// Chat Seeds



// Message Seeds