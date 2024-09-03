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

const PORT = process.env.PORT || 4000;
// const PORT = 4000;

const router = require('./routes/chl_user_login.js');
const router1 = require('./routes/chl_series_list.js');
const router2 = require('./routes/chl_user_series_list.js');
const router3 = require('./routes/chl_series_teams.js');
const router4 = require('./routes/chl_teams_squad.js');
const router5 = require('./routes/chl_series_matches.js');
const router6 = require('./routes/chl_match_scorecard.js');
const router7 = require('./routes/chl_players_stats.js');

app.use('/api', router);
app.use('/api/series/', router1);
app.use('/api/series/', router2);
app.use('/api/series/', router3);
app.use('/api/team_squad/', router4);
app.use('/api/series/', router5);
app.use('/api/match/', router6);
app.use('/api/team/', router7);

// Serve static files from the "images" directory
app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(PORT, () => console.log('Server is running on port:'+ PORT));
