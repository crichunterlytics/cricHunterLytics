//JWT Token constansts
const JWT_SECRET_KEY = 'CHL_TOKEN_SKEY';
const JWT_TOKEN_EXPIRY_TIME = '15d';

//Database : Available Tables Constant
const CHL_USERS = 'chl_users';
const CHL_SERIES = 'chl_series';
const CHL_SERIES_TEAMS = 'chl_series_teams';
const CHL_USER_SERIES = 'user_series';
const CHL_TEAM_SQUAD = "team_squad_players";
const CHL_SERIES_MATCHES = "series_matches_list";
const CHL_PLAYERS_MATCH_STATS = "player_match_stats";

//Fetch URL Paths Constants
//Login and signup level APIS
const REGISTER_NEW_USER = '/register';
const LOGIN_USER_API = '/login';
const GENERATE_NEW_TOKEN = '/getToken';
const LOGOUT_API = '/logout';

//Series Level APIS
const SERIES_LIST = '/series_list/:seriesType';
const ADD_SERIES = '/add_series';
const SERIES_TEAMS_LIST = '/teams_list';
const ADD_SERIES_TEAMS_LIST = '/add_teams';
const USER_SERIES_LIST = '/user_series_list';
const ADD_USER_SERIES_LIST = '/add_user_series';
const TEAMS_SQUAD_LIST = '/series/:seriesId/squad/:squadId';
const ADD_TEAMS_SQUAD = '/add_squad';
const SERIES_MATCHES_LIST = '/series_matches/:seriesId';
const ADD_SERIES_MATCHES = '/add_series_matches';
const ADD_MATCHES_SCORECARD = '/scorecard';
const PLAYERS_STATS_PERTEAM = '/players_stats/:seriesId/:teamId';
const PLAYERS_STATS_TWOTEAM = '/twoteams_players_stats';

//api RETURN STATUS CODE
const SUCCESS_STATUS_CODE = 200;
const ERROR_STATUS_CODE = 201;
const DB_QUERY_FAILED_CODE = 500;
const INVALID_MOBILE_PASSWORD = 400;
const ACCESS_DENIED_ERROR = 401;
const INVALID_TOKEN_ERROR = 402;

const ERROR_MESSAGES_STATUS_CODE = {
    DB_QUERY_FAILED_CODE: "Database query failed",
    INVALID_MOBILE_PASSWORD: "Invalid mobile number or password",
    ACCESS_DENIED_ERROR: "Access denied. No token provided"
}

module.exports = {
    JWT_SECRET_KEY,
    JWT_TOKEN_EXPIRY_TIME,
    CHL_USERS,
    CHL_SERIES,
    CHL_SERIES_TEAMS,
    CHL_USER_SERIES,
    REGISTER_NEW_USER,
    LOGIN_USER_API,
    GENERATE_NEW_TOKEN,
    LOGOUT_API,
    SERIES_LIST,
    ADD_SERIES,
    SERIES_TEAMS_LIST,
    ADD_SERIES_TEAMS_LIST,
    USER_SERIES_LIST,
    ADD_USER_SERIES_LIST,
    SUCCESS_STATUS_CODE,
    ERROR_STATUS_CODE ,
    DB_QUERY_FAILED_CODE,
    INVALID_MOBILE_PASSWORD,
    ACCESS_DENIED_ERROR,
    INVALID_TOKEN_ERROR,
    ERROR_MESSAGES_STATUS_CODE,
    TEAMS_SQUAD_LIST,
    CHL_TEAM_SQUAD,
    ADD_TEAMS_SQUAD,
    CHL_SERIES_MATCHES,
    SERIES_MATCHES_LIST,
    ADD_SERIES_MATCHES,
    CHL_PLAYERS_MATCH_STATS,
    ADD_MATCHES_SCORECARD,
    PLAYERS_STATS_PERTEAM,
    PLAYERS_STATS_TWOTEAM
}