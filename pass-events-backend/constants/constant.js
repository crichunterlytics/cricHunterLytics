//JWT Token constansts
const JWT_SECRET_KEY = 'PSS_TOKEN_SKEY';
const JWT_TOKEN_EXPIRY_TIME = '30d';

//Database : Available Tables Constant
const PSS_USERS = 'pss_shops_user';
const PSS_EVENT_TYPE = 'pss_event_type';
const PSS_EVENT_THEMES = 'pss_event_themes';
const PSS_EVENT_CUSTOMERS = 'pss_event_customers';
const PSS_EVENT_ASSIGNEES = 'pss_event_assignees';

//Login and signup level APIS
const REGISTER_NEW_USER = '/register';
const LOGIN_USER_API = '/login';
const GENERATE_NEW_TOKEN = '/getToken';
const LOGOUT_API = '/logout';
const FORGOT_PASSWORD_API = '/forgot-password';
const RESET_PASSWORD_API = '/reset-password';

//Event APIs
const ADD_EVENT_TYPE_API = '/add_event_type';
const UPDATE_EVENT_TYPE_API = '/update_event_type';
const GET_ALL_EVENTS_API = '/getAllEvent/:shop_id';

// Event Themes APIs 
const ADD_EVENT_THEME_API = '/add_event_theme';
const UPDATE_EVENT_THEME_API = '/update_event_theme';
const GET_EVENT_THEMES_API = '/getEventThemes/:shop_id/:event_id';

// Assignee APIs 
const ADD_ASSIGNEE_API = '/add_assignee';
const UPDATE_ASSIGNEE_API = '/update_assignee';
const GET_ALL_ASSIGNEE = '/getEventThemes/:shop_id';
const GET_EVENT_ASSIGNEE = '/getEventThemes/:shop_id/:event_id';

// Customers APIS
const ADD_CUSTOMER_API = '/add_customer';
const UPDATE_CUSTOMER_API = '/update_customer';
const UPDATE_EVENT_STATUS_API = '/update_event_status';
const UPDATE_EVENT_ASSIGNEE_API = '/update_event_assignee';
const GET_ALL_CUSTOMER_API = '/getAllCustomers/:shop_id';
const GET_ALL_UPCOMING_EVENT_API = '/get_all_upcoming_events/:shop_id';
const GET_EVENT_UPCOMING_EVENT_API = '/get_upcoming_events/:shop_id/:event_id';
const GET_EVENT_CUSTOMER_API = '/getEventsCustomers/:shop_id/:event_id';
const GET_EVENT_THEME_CUSTOMER_API = '/getEventThemesCustomer/:shop_id/:event_id/:theme_id';

//api RETURN STATUS CODE
const BAD_REQUEST_CODE = 400;
const UNAUTHORIZED_CODE = 401;
const LOGIN_UNAUTHORIZED_CODE = 401;
const TOKEN_UNAUTHORIZED_CODE = 401;
const TOKEN_INVALID_CODE = 401;
const FORBIDDEN_CODE = 403;
const MOBILE_NUMBER_NOT_EXITS = 404;

const INTERNAL_SERVER_ERROR = 500;

const SUCCESS_STATUS_CODE = 200;


const ERROR_MESSAGES_STATUS_CODE = {
    BAD_REQUEST_CODE : "Invalid or missing input in the request body",
    UNAUTHORIZED_CODE: "Unauthorized inputs",
    LOGIN_UNAUTHORIZED_CODE: "Invalid mobile number or password",
    FORBIDDEN_CODE: "Your account is locked. Please contact support.",
    INTERNAL_SERVER_ERROR: "An error occurred on the server",
    TOKEN_UNAUTHORIZED_CODE: "Invalid Token",
    MOBILE_NUMBER_NOT_EXITS: "Mobile number does not exist."
}

module.exports = {
    JWT_SECRET_KEY,
    JWT_TOKEN_EXPIRY_TIME,
    GENERATE_NEW_TOKEN,
    SUCCESS_STATUS_CODE,
    BAD_REQUEST_CODE,
    UNAUTHORIZED_CODE,
    LOGIN_UNAUTHORIZED_CODE,
    TOKEN_UNAUTHORIZED_CODE,
    FORBIDDEN_CODE,
    INTERNAL_SERVER_ERROR,
    ERROR_MESSAGES_STATUS_CODE,
    MOBILE_NUMBER_NOT_EXITS,
    TOKEN_INVALID_CODE,

    PSS_USERS,
    PSS_EVENT_TYPE,
    PSS_EVENT_THEMES,
    PSS_EVENT_CUSTOMERS,
    PSS_EVENT_ASSIGNEES,

    RESET_PASSWORD_API,
    LOGOUT_API,
    REGISTER_NEW_USER,
    LOGIN_USER_API,
    FORGOT_PASSWORD_API,

    ADD_EVENT_TYPE_API, 
    UPDATE_EVENT_TYPE_API,
    GET_ALL_EVENTS_API,

    ADD_EVENT_THEME_API,
    UPDATE_EVENT_THEME_API, 
    GET_EVENT_THEMES_API,

    ADD_ASSIGNEE_API,    
    UPDATE_ASSIGNEE_API,
    GET_ALL_ASSIGNEE,
    GET_EVENT_ASSIGNEE,

    ADD_CUSTOMER_API,    
    UPDATE_CUSTOMER_API,
    UPDATE_EVENT_STATUS_API,
    UPDATE_EVENT_ASSIGNEE_API,
    GET_ALL_CUSTOMER_API,
    GET_ALL_UPCOMING_EVENT_API,
    GET_EVENT_UPCOMING_EVENT_API,
    GET_EVENT_CUSTOMER_API,
    GET_EVENT_THEME_CUSTOMER_API
}