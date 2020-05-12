const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors')
const morgan = require('morgan')
const auth_routes = require('./src/routes/auth.routes')

const {PORT} = require('./src/utils/config')
const db = require('./src/database/db')

const app = express()
app.use(cors())

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

app.use(morgan('dev'))

app.use('/api/auth', auth_routes)

app.use("/", (req, res, next) => {
  res.status(404).send("Page Not Found - Nothing to see here");
});


app.listen(PORT, () => {  
console.log(`Listening on port ${PORT}`);
})