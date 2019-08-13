const config = require('config');
const logger = require('./middleware/logger');
const debug = require('debug')('app:startup');
const courses = require('./routes/courses');
const express = require('express');
const app = express();

// Configurations
debug('Debugging...');
console.log(app.get('env'));
console.log(config.get('name'));
console.log(config.get('mail.host'));

// Built-in middleware functions
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // parses the incoming requests with url encoded payloads
app.use(express.static('public')); // to serve files from within a given root directory

// Custom middleware function
app.use(logger);

// router
app.use('/api/courses', courses);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
