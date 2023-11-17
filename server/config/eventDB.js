//server/config/eventDB.js
const models = require('../models');
const db = require('./connection');

module.exports = async (modelName, collectionName) => {
    try {
        // Check if the collection exists
        let modelExists = await models[modelName].db.db.listCollections({
            name: collectionName
        }).toArray();

        // If the collection exists, drop it
        if (modelExists.length) {
            await models[modelName].collection(collectionName).drop();
        }
    } catch (err) {
        // Handle any errors that occur during the process
        throw err;
    }
}
