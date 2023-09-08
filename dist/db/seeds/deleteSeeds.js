const deleteSeeds = async (driver) => {
    const session = driver.session();
    try {
        console.log("deleting nodes");
        const deleteNodes = "MATCH (n) DETACH DELETE n";
        let transaction = await session.beginTransaction();
        console.log("starting transaction");
        const result = await transaction.run(deleteNodes);
        await transaction.commit();
        console.log(result);
        await transaction.close();
        console.log("transaction closed");
    }
    catch (error) {
        console.error(error);
    }
};
export default deleteSeeds;
//# sourceMappingURL=deleteSeeds.js.map