import { v4 as uuidv4 } from 'uuid';

export const formatData = (data) => JSON.stringify(data, null, 2);

export const getCurrentDateTime = () => new Date();

export const hasNoText = (str) => !(str && str.trim() !== "");

export const hasText = (str) => !!(str && str.trim() !== "");

export const isEmptyArray = (val) => val && !val.length;

export const isNullOrEmpty = (str) => !str;

export const isEmptyObject = (val) => isNullOrEmpty(val) || (val && Object.keys(val).length === 0);

export const isPastDateTime = (datetime) => datetime < getCurrentDateTime();

export const parseArray = (arr, replaceStr = []) => isNullOrEmpty(arr) || isEmptyArray(arr) ? replaceStr : arr;

export const parseStr = (str, replaceStr = "") => isNullOrEmpty(str) ? replaceStr : str;

export const strToLowercase = (str) => str.toLowerCase();

export const strToUppercase = (str) => str.toUpperCase();

export const sortArrayOfObjects = (arr, keyToSort, direction) => {
    if (direction === 'none') return arr;

    const compare = (objectA, objectB) => {
        const valueA = objectA[keyToSort]
        const valueB = objectB[keyToSort]

        if (valueA === valueB) return 0;

        if (valueA > valueB) {
            return direction === 'ascending' ? 1 : -1
        }
        return direction === 'ascending' ? -1 : 1

    }

    return arr.slice().sort(compare)
}

export const disableBackNavigation = () => {
    const stateObj = { page: 'your-page' };
    window.history.pushState(stateObj, '', window.location.href);

    window.addEventListener('popstate', () => {
        window.history.pushState(stateObj, '', window.location.href);
    });
};

export const currentMonth = () => {
    const currentDate = new Date();
    // console.log(currentDate.toLocaleString('default', { month: 'long' }))
    return currentDate.toLocaleString('default', { month: 'long' });
}

export const currentYear = () => new Date().getFullYear();

export const getRandomArrayElements = (array, numElements) => {
    const shuffledArray = array.slice();

    for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
        const randomUUID = uuidv4();
        const index = parseInt(randomUUID.replace(/[^0-9]/g, ''), 10) % (i + 1);

        [shuffledArray[i], shuffledArray[index]] = [shuffledArray[index], shuffledArray[i]];
    }
    return shuffledArray.slice(0, numElements);
}

export const fileToBuffer = (file) => {
    const reader = new FileReader();

    reader.onload = function (event) {
        const buffer = event.target.result;
        return (null, buffer);
    };

    reader.onerror = function (event) {
        return (event.target.error, null);
    };

    reader.readAsArrayBuffer(file);
}

export const fileUpload = async (url, file) => {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: file,
            headers: {
                // 'Content-Type': selectedFile.type,
                "x-ms-blob-type": "BlockBlob",
                "x-ms-version": "2017-11-09"
            },
        });

        if (response.ok) {
            console.log('File uploaded successfully.', response);
            return response;
        }
        console.error('Failed to upload file. Status:', response);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

export const ISOFormat = (date) => {
    const Isodate = new Date(date);

    return Isodate.toISOString();
}

export const DateFormat = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
