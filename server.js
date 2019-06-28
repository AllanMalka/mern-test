const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
// const path = require('path');

const app = express();

// Bodyparser middleware
app.use(express.json());

//DB config
const db = config.get('mongoURI');

// Connect
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('\x1b[34m%s\x1b[0m', 'MongoDB Connected'))
    .catch(err => console.log('\x1b[31m%s\x1b[0m', err));

mongoose.set('useFindAndModify', false);
//Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets if in production
// if(process.env.NODE_ENV === 'production'){
//     //Set static folder
//     app.use(express.static('client/build'))
//
//     app.get('*', (req, req) =>{
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('\x1b[36m%s\x1b[0m',`Server started on port ${port}`));