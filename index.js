const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require('./routes/auth');
const tweetRoutes = require('./routes/tweet');
const followRoutes = require('./routes/follow');

require('./db/connection.js')

// initialize express app
const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json()) // Initialize boday parser middleware. we are using json data in app.
app.use("/api/auth", authRoutes);
app.use("/api/tweet", tweetRoutes);
app.use("/api/follow", followRoutes);

app.all('*', (req, res) => {
    res.status(404).json({
        error: true,
        title: "Unable to find this route!",
        data: null,
    })
});

const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath))
app.get('/', (req, res) => res.send('Twitter Apis'));



app.listen(PORT, () => {
    console.log(`Server runnign on PORT http://localhost:${PORT}`)
});