const express = require('express');
const PORT = process.env.PORT | 5000;
const app = express();
const cors = require('cors');
const dbConnection = require('./database');
const env = require('dotenv');
env.config();

app.use(cors());
app.use(express.json({limit : '5mb'}));
app.use(express.urlencoded({extended : true}));

app.use('/v1/reachus', require('./Routes/Reach'));
app.use('/v1/blogs', require('./Routes/Blogs'));

app.listen(PORT, () => {
    dbConnection().then(() => {
        console.log('App is on PORT:5000');
    }).catch(() => {
        console.log('Error running App!');
    })
},)