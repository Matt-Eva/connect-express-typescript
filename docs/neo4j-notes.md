# Neo4j Notes

- When using the JS / TS driver, queries should be run using a session, which should call either the `executeRead()` method or the `executeWrite()` method. The `run()` method should not be used in production environments:
```JavaScript
const session = driver.createSession()
const readRes = await session.executeRead(/* some query*/)
const writeRes = await session.executeWrite(/* some query*/)
session.close()
```

# Operations

Note that we can't run create statements to our db instance when we have it open in the Auradb explorer.

# Documentation

Cypher V5 Docs: https://neo4j.com/docs/cypher-manual/current/introduction/

# Models

We currently have 3 Node types
 1. Users
 2. Chats
 3. Messages

And 4 Relationship types

1. User - User: CONNECTED
2. User - Chat: PARTICIPATING_IN_CHAT
3. User - Message: SENT
4. Message - Chat: SENT_IN_CHAT
