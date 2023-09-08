import {driver, Driver, closeDriver} from "./queryConfig.js"

const checkUsers = async (driver: Driver) =>{
    const session = driver.session()
    try {
      const checkUsers = "MATCH (u:User) RETURN u"
      let transaction = await session.beginTransaction()
      const results = await transaction.run(checkUsers)
      await transaction.commit()
      await transaction.close()
      console.log("created users", results.records)
    } catch(error) {
      console.error(error)
    }
    await session.close()
    await closeDriver()
  }