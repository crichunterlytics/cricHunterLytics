//A minimal and flexible Node.js web application framework.
const express = require('express');
const app = express();
/**
 * CORS (Cross-Origin Resource Sharing) is a security feature 
 * implemented by web browsers to prevent malicious websites 
 * from making requests to your API or other web services 
 * that are hosted on a different domain.
*/
const cors = require('cors');
const PORT = process.env.PORT || 4000;
// const PORT = 4000;
// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

const router = require('./routes/chl_series_list.js');
const router1 = require('./routes/chl_user_series_list.js');

app.use('/api/series/', router);
app.use('/api/series/', router1);

app.listen(PORT, () => console.log('Server is running on port:'+ PORT));
