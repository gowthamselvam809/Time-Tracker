const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');
const { userController, timeEntriesController } = require("./controller");
const { connectToMongoDB } = require('./mongoConfig');

const PORT = process.env.PORT || 3001;

dotenv.config();
app.use(cors());
app.use(express.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 100000,
}));
app.use(express.json({
    type: "application/json",
    limit: '50mb'
}));

connectToMongoDB();

app.get('/', (req, res) => { res.json({ message: 'Welcome Time Tracker!!!' }); });

app.post('/userRegister', userController.userRegister)

app.post('/userLogin', userController.userLogin)

app.post('/getLastTimeEntries', timeEntriesController.getLastTimeEntries)

app.post('/createTimeEntries', timeEntriesController.createTimeEntries)

app.post('/updateTimeEntries', timeEntriesController.updateTimeEntries)


app.use((err, req, res, next) => {
    console.log(`Path: ${req.path} -> Status Code: ${err.status || 500} -> Stack: ${err.stack}`)
    console.log(err)
    res.status(err.body || 500).send(err.status);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server listening on http://localhost:${PORT}`);
});
