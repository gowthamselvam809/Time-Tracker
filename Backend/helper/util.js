const excelEpoc = new Date(1900, 0, 0).getTime();
const crypto = require('crypto');
const msDay = 86400000;
const uuid = require("uuidv4");
const { StatusCodes } = require('http-status-codes');

exports.ERROR = StatusCodes;

exports.getCurrentTimestamp = () => new Date().toISOString();

exports.getRandomString = () => uuid.fromString(crypto.randomBytes(20).toString("hex"));

exports.getRandomOtp = () => {
    const buffer = crypto.randomBytes(2);
    const otp = buffer.readUInt16BE(0);
    return (otp % 9000) + 1000;
};
exports.getOTPExpTime = () => new Date().getTime() + 5 * 60000;

exports.sortDataBasedOnTimestamp = function (j, data) {
    let orderedData = data;
    function getSortedData(i) {
        if (i < data.Items.length) {
            let today = new Date(data.Items[i].created_ts);
            let y = today.getFullYear();
            let m = today.getMonth() + 1;
            let newM = m < 12 ? '0' + m : m;
            let d = today.getDate();
            let newD = d < 10 ? '0' + d : d;
            let h = today.getHours();
            let newH = h < 10 ? '0' + h : h;
            let mt = today.getMinutes();
            let newMt = mt < 10 ? '0' + mt : mt;
            let sec = today.getSeconds();
            let newSec = sec < 10 ? '0' + sec : sec;
            let ts = y + "" + newM + "" + newD + "" + newH + "" + newMt + "" + newSec;
            let timeerds = parseInt(ts);
            data.Items[i].order_id = timeerds;
            i++;
            getSortedData(i);
        } else {
            data.Items.sort(function (a, b) {
                return b.order_id - a.order_id;
            });
            return orderedData;
        }
    }
    getSortedData(j);
    return orderedData;
}

exports.strToLowercase = (str) => str.toLowerCase();

exports.isNullOrEmpty = (str) => !str;

exports.isEmptyObject = (val) => this.isNullOrEmpty(val) || (val && Object.keys(val).length === 0);

exports.isEmptyArray = (val) => val && !val.length;

exports.removeDuplicates = (arr) => [...new Set(arr)];

exports.removeDuplicateFromArrayOfJSON = async (arr) => {
    let tempArr = [];
    arr = await arr.filter((item) => !tempArr.includes(item.name) && tempArr.push(item.name) && item)
    return arr;
}

exports.reverse = (arr) => [...arr].reverse();

exports.extractValue = (arr, prop) => this.removeDuplicates(arr.map(item => item[prop]));

exports.parseStr = (str, replaceStr = "") => this.isNullOrEmpty(str) ? replaceStr : str;

exports.hasText = (str) => !!(str && str.trim() !== "");

exports.hasNoText = (str) => !(str && str.trim() !== "");

// Ex: sortArrayOfObjects(array, "id", "ascending"); direction => 'ascending' | 'descending' | 'none'
exports.sortArrayOfObjects = (arr, keyToSort, direction) => {
    if (direction === 'none') return arr;

    const compare = (objectA, objectB) => {
        const valueA = objectA[keyToSort]
        const valueB = objectB[keyToSort]

        if (valueA === valueB) return 0;

        if (valueA > valueB) {
            return direction === 'ascending' ? 1 : -1
        } else {
            return direction === 'ascending' ? -1 : 1
        }
    }

    return arr.slice().sort(compare)
}

exports.sortByDate = (arr, keyToSort) => arr.sort((a, b) => new Date(b[keyToSort]) - new Date(a[keyToSort]))

exports.convertNumberToAlphabet = (number) => (number + 9).toString(36).toUpperCase();

exports.timeDifference = function (date1, date2) {
    let difference = date1.getTime() - date2.getTime();
    return Math.floor(difference / 1000 / 60 / 60 / 24);
}

exports.getDateAndTime = function () {
    let ts = new Date().toISOString();
    let date = ts.split("T")[0];
    let time = ts.split("T")[1].replace("Z", "+00");

    return `${date} ${time}`
}

exports.getDate = function () {
    let ts = new Date().toISOString();
    let date = ts.split("T")[0];
    return `${date}`
}

exports.queryString = (params) => JSON.stringify(params);

exports.getTimeDifferenceInMinutes = (timeStamp, differenceTimeStamp) => {
    const timestamp1 = timeStamp;
    const timestamp2 = differenceTimeStamp;

    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);

    const differenceInMilliseconds = Math.abs(date1 - date2);
    const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));

    return differenceInMinutes;
}

exports.getTimeDifferenceInSeconds = (timeStamp, differenceTimeStamp) => {
    const timestamp1 = timeStamp;
    const timestamp2 = differenceTimeStamp;

    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);

    const differenceInMilliseconds = date1 - date2;
    const differenceInSeconds = Math.floor(differenceInMilliseconds / (1000));

    return differenceInSeconds;
}

exports.generateRandomString = (length = 6, characters = process.env.RANDOM_STRING) => {
    const randomBytes = crypto.randomBytes(length);
    const indices = randomBytes.map(b => b % characters.length);
    const result = indices.map(i => characters[i]).join('');
    return result;
}

exports.getIsoString = (time) => new Date(time).toISOString();

exports.formatData = (data) => JSON.stringify(data, null, 2);

exports.formatResponse = (result) => ({ status: StatusCodes.OK, body: JSON.stringify(result) });

exports.formatErrorResponse = (status = 500, errorMessage) => ({ status: status, body: errorMessage });

// Ex: var arr = [1, 2, 3]; var match = [2, 4]; => returns true.
// Ex: var arr = [1, 2, 3]; var match = [4, 5]; => returns false.
exports.hasMatch = (arr, match) => arr.some(a => match.some(m => a === m));

// Ex: var arr = [1, 2, 3]; var match = [2, 3]; => returns true.
// Ex: var arr = [1, 2, 3]; var match = [3, 5]; => returns false.
exports.hasEveryMatch = (arr, match) => arr.some(a => match.some(m => a === m));

exports.formatDateWithShortMonthAndDay = (timeStamp) => new Date(timeStamp).toLocaleString('en-us', { month: 'short', day: 'numeric' });

exports.formatDateWithShortMonthDayAndYear = (timeStamp) => new Date(timeStamp).toLocaleString('en-us', { month: 'short', day: 'numeric', year: 'numeric' });

exports.formatDateWithShortDayMonthAndYear = (timeStamp) => new Date(timeStamp).toLocaleString('en-us', { day: 'short', month: 'numeric', year: 'numeric' });

exports.getMonthNames = (isShort = true) => {
    let currentDate = new Date();
    return Array.from(new Array(12), (_, monthIdx) => {
        currentDate.setMonth(monthIdx);
        return currentDate.toLocaleString("en-US", { month: isShort ? "short" : "long" })
    });
}

exports.countElement = (marking, year) => {
    let arr = [], regex = new RegExp(year)
    marking.forEach(marking => {
        marking.category.forEach(category => {
            category.description.forEach(description => {
                arr.push(description.markings.find(m => regex.test(m)) ? description.markings.find(m => regex.test(m)) : '');
            });
        });
    });
    const elementCount = {};
    for (const element of arr) {
        if (elementCount[element]) {
            elementCount[element]++;
        } else {
            elementCount[element] = 1;
        }
    }
    return elementCount;
}

exports.formatTimeStampToDateMonthYear = (cosmosTimestampSeconds) => {
    const cosmosTimestampMilliseconds = cosmosTimestampSeconds * 1000;
    const date = new Date(cosmosTimestampMilliseconds);
    const isoString = date.toISOString();
    let day = JSON.stringify(date.getDate(isoString));
    let month = JSON.stringify(date.getMonth(isoString));
    let year = JSON.stringify(date.getFullYear(isoString));
    day = day.length < 2 ? '0' + day : day;
    month = month.length < 2 ? '0' + month : month;
    return `${day}.${month}.${year}`
};

exports.getQuery = (object) => `SELECT * FROM c WHERE c.${Object.keys(object)[0]} = '${Object.values(object)[0]}'`;

exports.getEmailContent = async (bodyTemplatePath) => {
    let emailTemplateString = await this.readFile(`${emailTemplatePaths.basePath}${emailTemplatePaths.mainTemplate}`)
    let bodyTemplateString = await this.readFile(`${emailTemplatePaths.basePath}${bodyTemplatePath}`)
    return emailTemplateString.replace("[BODY]", bodyTemplateString)
}
exports.getWelcomeContent = async (bodyTemplatePath) => {
    let emailTemplateString = await this.readFile(`${emailTemplatePaths.basePath}${emailTemplatePaths.welcomePath}`)
    let bodyTemplateString = await this.readFile(`${emailTemplatePaths.basePath}${bodyTemplatePath}`)
    return emailTemplateString.replace("[BODY]", bodyTemplateString)
}
exports.getRandomIndex = (array) => {
    const randomBytes = crypto.randomBytes(4);
    const index = randomBytes.readUInt32LE(0) % array.length;
    return index;
}

exports.getRandomArrayElements = (array, numElements) => {
    const shuffledArray = array.slice();

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = getRandomIndexforArray(i + 1);
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray.slice(0, numElements);
};

exports.formatDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}.${month}.${year}`;
}