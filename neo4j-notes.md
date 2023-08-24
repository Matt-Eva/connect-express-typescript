# Neo4j Notes

- When using the JS / TS driver, queries should be run using a session, which should call either the `executeRead()` method or the `executeWrite()` method. The `run()` method should not be used in production environments:
```JavaScript
const session = driver.createSession()
const readRes = await session.executeRead(/* some query*/)
const writeRes = await session.executeWrite(/* some query*/)
session.close()
```

# Documentation

Cypher V5 Docs: https://neo4j.com/docs/cypher-manual/current/introduction/
