const { timeEntriesRepository } = require("../repository");

const createTimeEntries = async (request) => {
    return await timeEntriesRepository.createEntries(request);
}

const getLastTimeEntries = async (request) => {
    const { userId } = request;
    const entryData = await timeEntriesRepository.findUnClosedEntry({ userId, isRunning: true });

    let getAllEntries = await timeEntriesRepository.getEntriesByUserId(userId);

    getAllEntries.forEach(doc => {
        doc.duration = doc.endDate - doc.startDate;
    });
    getAllEntries = getAllEntries.filter(entry => {
        const startDate = new Date();
        const startOfDay = new Date(startDate.setHours(0, 0, 0, 0)).getTime();
        const endOfDay = new Date(startDate.setHours(23, 59, 59, 999)).getTime();
        return entry.startDate >= startOfDay && entry.startDate <= endOfDay;
    });
    const totalDuration = getAllEntries.reduce((acc, curr) => acc + curr.duration, 0);
    return { entryData: entryData, totalDuration: totalDuration };
}

const updateTimeEntries = async (request) => {
    const { id, endDate } = request;
    const entryData = await timeEntriesRepository.updateEntriesById({ id }, { endDate, isRunning: false });
    console.log(entryData);
    return entryData;
}

module.exports = {
    createTimeEntries,
    getLastTimeEntries,
    updateTimeEntries
}