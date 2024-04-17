// require('dotenv').config();

const Url = {
    // baseApiUrl: "http://localhost:5000",
    baseApiUrl: "https://time-tracker-mnpv.onrender.com"
}

const apiRoutes = {
    userLogin: "/userLogin",
    userRegister: "/userRegister",
    getLastTimeEntries: "/getLastTimeEntries",
    createTimeEntries: "/createTimeEntries",
    updateTimeEntries: "/updateTimeEntries",
}

export { Url, apiRoutes };
