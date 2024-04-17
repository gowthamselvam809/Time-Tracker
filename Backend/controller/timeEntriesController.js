
const { util: { formatErrorResponse, formatResponse } } = require('../helper');
const { timeEntriesService } = require("../service");


const createTimeEntries = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await timeEntriesService.createTimeEntries(request);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const getTimeEntries = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await timeEntriesService.getTimeEntries(request);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const getLastTimeEntries = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await timeEntriesService.getLastTimeEntries(request);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const updateTimeEntries = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await timeEntriesService.updateTimeEntries(request);
        res.json(result);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createTimeEntries,
    getTimeEntries,
    getLastTimeEntries,
    updateTimeEntries
}