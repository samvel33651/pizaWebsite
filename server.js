const express = require('express');
const apiRouter = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const  app = express();
app.use(cors());
app.use(express.json())
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', apiRouter)


if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Srever is runing on Port : ${PORT}`);
});
