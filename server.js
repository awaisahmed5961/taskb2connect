const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));
const cors = require('cors');


// Init Middleware
app.use(express.json({ limit: '50mb', extended: false }));
app.use(cors())


app.use('/api/geo', require('./routes/Geo'));
app.use('/api/exchange', require('./routes/Currency'));


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => { console.log('server started on port' + PORT) });


module.exports = server;