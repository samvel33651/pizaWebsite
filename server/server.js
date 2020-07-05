const express = require('express');
const apiRouter = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');

const  app = express();
app.use(cors());
app.use(express.json())
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', apiRouter)

app.listen('3001', () => {
    console.log(`Srever is runing on Port : ${process.env.PORT || 3001}`);
});
