const { util } = require('../helper');
const { getCollection } = require('../mongoConfig');
const { v4: uuidv4 } = require('uuid');

const COLLECTION_NAME = 'user';

const getUserCollection = async () => {
    return await getCollection(COLLECTION_NAME);
};

const createUser = async (userData) => {
    const collection = await getUserCollection();
    const result = await collection.insertOne({ id: util.isNullOrEmpty(userData.id) ? uuidv4() : userData.id, ...userData });
    if (result.acknowledged) {
        const addedUser = await collection.findOne({ _id: result.insertedId });
        delete addedUser.password;
        return addedUser;
    }
    return result;
};

const getUserByEmail = async (email) => {
    const collection = await getUserCollection();
    return await collection.findOne({ email });
};

module.exports = { createUser, getUserByEmail };
