const express = require('express')
const app = express()
const bodyParser = require('body-parser');
let router = require('./api/router')
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

router(app);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Post:${port}`))
