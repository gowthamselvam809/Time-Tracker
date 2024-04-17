const { ObjectId } = require('mongodb');
const { util } = require('../helper');
const { getCollection } = require('../mongoConfig');
const { v4: uuidv4 } = require('uuid');

const COLLECTION_NAME = 'timeEntries';

const getEntriesCollection = async () => {
    return await getCollection(COLLECTION_NAME);
};

const createEntries = async (entriesData) => {
    const collection = await getEntriesCollection();
    const result = await collection.insertOne({ id: util.isNullOrEmpty(entriesData.id) ? uuidv4() : entriesData.id, ...entriesData });
    if (result.acknowledged) {
        const createdEntries = await collection.findOne({ _id: result.insertedId });
        return createdEntries;
    }
    return result;
};

const getEntriesById = async (id) => {
    const collection = await getEntriesCollection();
    return await collection.findOne({ id });
};

const getEntriesByUserId = async (userId) => {
    const collection = await getEntriesCollection();
    return await collection.find({ userId, isRunning: false }).toArray();
}

const updateEntriesById = async (id, updatedData) => {
    const collection = await getEntriesCollection();
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
    if (result.modifiedCount > 0) {
        const updatedEntry = await collection.findOne({ _id: new ObjectId(id) });
        return updatedEntry;
    }
    return null;
};



// const updateEntriesById = async (id, updatedData) => {
//     const collection = await getEntriesCollection();
//     const indexesCursor = await collection.listIndexes();
//     const indexes = await indexesCursor.toArray();
//     const result = await collection.updateOne({ id }, { $set: updatedData });
//     if (result.modifiedCount > 0) {
//         const updatedEntry = await collection.findOne({ id });
//         return updatedEntry;
//     }
//     return null;
// };

const deleteUserById = async (id) => {
    const collection = await getEntriesCollection();
    const result = await collection.deleteOne({ id });
    return result.deletedCount > 0;
};

const findUnClosedEntry = async ({ userId, isRunning }) => {
    const collection = await getEntriesCollection();
    const result = await collection.findOne({ userId, isRunning });
    return result;
}

module.exports = {
    createEntries,
    getEntriesByUserId,
    updateEntriesById,
    deleteUserById,
    getEntriesById,
    findUnClosedEntry
};
