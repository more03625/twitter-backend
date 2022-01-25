const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const cors = require('cors')
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require('./routes/auth');
const tweetRoutes = require('./routes/tweet');
const followRoutes = require('./routes/follow');
const profileRoutes = require('./routes/profile');

const { sendResponse } = require('./lib/sendResponse');

require('./db/connection.js')

// initialize express app
const app = express();
app.use(cors())

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '50mb' }))// Initialize boday parser middleware. we are using json data in app.
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
}))
let urlencodedParser = bodyParser.urlencoded({ extended: false, limit: '5mb' });

app.use("/api/auth", authRoutes);
app.use("/api/tweet", tweetRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/profile", profileRoutes);

app.all('*', (req, res) => {
    sendResponse(res, 404, true, "Unable to find this route!", null)
});

const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath))
app.get('/', (req, res) => res.send('Twitter Apis'));



app.listen(PORT, () => {
    console.log(`Server runnign on PORT http://localhost:${PORT}`)
});