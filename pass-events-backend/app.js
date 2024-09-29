//A minimal and flexible Node.js web application framework.
const express = require('express');
const bodyParser = require('body-parser');
/**
 * CORS (Cross-Origin Resource Sharing) is a security feature 
 * implemented by web browsers to prevent malicious websites 
 * from making requests to your API or other web services 
 * that are hosted on a different domain.
*/
const cors = require('cors');
const mildInterpreterToken = require('./middleware/token_interpreter.js'); 
const path = require('path');


const app = express();
app.use(bodyParser.json());
// Middleware to parse JSON bodies
app.use(express.json());
// Enable CORS for all origins
app.use(cors());

// Apply the middleware to all routes
app.use(mildInterpreterToken.verifyToken);

// const PORT = process.env.PORT || 4000;
const PORT = 4001;

const router = require('./routes/shops_login.js');
const router1 = require('./routes/eventApis');
const router2 = require('./routes/themeApis');
const router3 = require('./routes/assigneesApis');
const router4 = require('./routes/customersApis');
const router5 = require('./routes/customerFeedbackApi');
const router6 = require('./routes/packagesApis');
const router7 = require('./routes/banquetApis');

app.use('/api', router);
app.use('/api/event', router1);
app.use('/api/theme', router2);
app.use('/api/assignee', router3);
app.use('/api/customer', router4);
app.use('/api/review', router5);
app.use('/api/package', router6);
app.use('/api/banquet', router7);

// Serve static files from the "images" directory
// app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(PORT, () => console.log('Server is running on port:'+ PORT));
