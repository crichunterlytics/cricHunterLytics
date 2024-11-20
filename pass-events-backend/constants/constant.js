//JWT Token constansts
const JWT_SECRET_KEY = 'PSS_TOKEN_SKEY';
const JWT_TOKEN_EXPIRY_TIME = '30d';

//Database : Available Tables Constant
const PSS_USERS = 'pss_shops_user';
const PSS_EVENTS_LIST = 'pss_events_list';
const PSS_EVENT_THEMES_LIST = 'pss_event_themes_list';
const PSS_SHOP_EVENTS_LIST = 'pss_shops_event_list';
const PSS_SHOP_EVENT_THEMES_LIST = 'pss_shops_event_theme_list';
const PSS_EVENT_CUSTOMERS = 'pss_event_customers';
const PSS_EVENT_ASSIGNEES = 'pss_event_assignees';
const PSS_FEEDBACK_REVIEW_TABLE = 'pss_event_feedback_review';
const PSS_PACKAGES_TABLE = 'packages_data';

//Login and signup level APIS
const REGISTER_NEW_USER = '/register';
const UPDATE_SHOP_DETAILS = '/update_shop_details';
const LOGIN_USER_API = '/login';
const GENERATE_NEW_TOKEN = '/getToken';
const LOGOUT_API = '/logout';
const FORGOT_PASSWORD_API = '/forgot-password';
const RESET_PASSWORD_API = '/reset-password';

//Event APIs
const ADD_PSS_EVENTS_API = '/add_pss_events';
const UPDATE_PSS_EVENTS_API = '/update_pss_events';
const ADD_SHOP_EVENT_TYPE_API = '/add_shop_event_type';
const REMOVE_EVENT_TYPE_SHOP_API = '/remove_shop_event_type';
const GET_ALL_PSS_EVENTS_API = '/get_all_pss_events';
const GET_ALL_EVENTS_API = '/getAllEvent/:shop_id';

// Event Themes APIs 
const ADD_PSS_THEMES_API = '/add_pss_themes';
const UPDATE_PSS_THEMES_API = '/update_pss_themes';
const ADD_SHOP_THEME_API = '/add_shop_event_theme';
const REMOVE_THEME_TYPE_SHOP_API = '/remove_shop_event_theme';
const GET_ALL_PSS_THEMES_API = '/get_all_pss_event_themes';
const GET_ALL_SHOP_THEMES_API = '/get_shop_event_themes/:shop_id/:event_id';

// Assignee APIs 
const ADD_ASSIGNEE_API = '/add_assignee';
const UPDATE_ASSIGNEE_API = '/update_assignee';
const DELETE_ASSIGNEE_API = '/delete_assignee';
const GET_ALL_ASSIGNEE = '/getEventAssignees/:shop_id';
const GET_EVENT_ASSIGNEE = '/getEventAssignees/:shop_id/:event_id';

// Customers APIS
const ADD_CUSTOMER_API = '/add_customer';
const UPDATE_CUSTOMER_API = '/update_customer';
const UPDATE_EVENT_STATUS_API = '/update_event_status';
const UPDATE_EVENT_PAYMENTS_API = '/update_payments';
const UPDATE_EVENT_ASSIGNEE_API = '/update_event_assignee';
const GET_ALL_CUSTOMER_API = '/getAllCustomers/:shop_id';
const GET_ALL_UPCOMING_EVENT_API = '/get_all_upcoming_events';
const GET_EVENT_UPCOMING_EVENT_API = '/get_upcoming_events/:shop_id/:event_id';
const GET_EVENT_CUSTOMER_API = '/getEventsCustomers/:shop_id/:event_id';
const GET_EVENT_THEME_CUSTOMER_API = '/getEventThemesCustomer/:shop_id/:event_id/:theme_id';
const GET_INDIVIDUAL_CUSTOMER_EVENT = '/get_individual_customer/:shop_id/:customer_id';
const GET_CUSTOMER_EVENTS_API = '/get_customer_events_api';


//Customer Feedback Form
const ADD_REVIEW_COMMENT_API = "/add_review_comment";
const GET_ALL_REVIEWS = "/get_event_reviews";
const GET_INDIVIDUAL_CUSTOMER_REVIEWS = "/get_individual_event_reviews";

//Event Packages APIs
const ADD_PACKAGES_API = '/add_packages';
const UPDATE_PACKAGES_API = '/update_packages';
const DELETE_PACKAGES_API = '/delete_pckages';
const GET_PACKAGES_API = '/get_packages';
// const ADD_SHOP_EVENT_TYPE_API = '/add_shop_event_type';
// const REMOVE_EVENT_TYPE_SHOP_API = '/remove_shop_event_type';
// const GET_ALL_PSS_EVENTS_API = '/get_all_pss_events';
// const GET_ALL_EVENTS_API = '/getAllEvent/:shop_id';


//api RETURN STATUS CODE
const BAD_REQUEST_CODE = 400;
const INVALID_MOBILE_PASSWORD = 400;
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
    MOBILE_NUMBER_NOT_EXITS: "Mobile number does not exist.",
    INVALID_MOBILE_PASSWORD: "Mobile number or Email id already exists."
}

// Event APIs Messages
const SUCCESS_ADD_EVENT_TYPE_MSG = "Event type added successfully."
const SUCCESS_UPDATE_EVENT_TYPE_MSG = "Event type updated successfully."
const SUCCESS_REMOVE_EVENT_TYPE_MSG = "Removed event type successfully.";

// Event Themes APIs Messages
const SUCCESS_ADD_THEME_MSG = "Event theme added successfully."
const SUCCESS_UPDATE_THEME_MSG = "Event theme updated successfully."

// Assignees APIs Messages
const SUCCESS_ADD_ASSIGNEE_MSG = "Assignee added successfully."
const SUCCESS_UPDATE_ASSIGNEE_MSG = "Assignee updated successfully."

// Customers APIs Messages
const SUCCESS_ADD_CUSTOMER_MSG = "Customer added successfully."
const SUCCESS_UPDATE_CUSTOMER_MSG = "Customer updated successfully."
const SUCCESS_UPDATE_CUSTOMER_STATUS_MSG = "Customer status updated successfully."
const SUCCESS_UPDATE_CUSTOMER_ASSIGNEE_MSG = "Customer assignee updated successfully."
const SUCCESS_UPDATE_CUSTOMER_PAYMENTS_MSG = "Customer payments updated successfully."

// Packages API
const SUCCESS_ADD_PACKAGE_MSG = "Packages added successfully."

// Add these constants in your constants file
const BANQUET_DATA_TABLE = 'Banquet_data';
const ADD_BANQUET_API = '/add_banquet';
const UPDATE_BANQUET_API = '/update_banquet';
const DELETE_BANQUET_API = '/delete_banquet';
const GET_BANQUET_API = '/get_banquets';
const SUCCESS_ADD_BANQUET_MSG = 'Banquet added successfully';


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
    INVALID_MOBILE_PASSWORD,

    PSS_USERS,
    PSS_EVENTS_LIST,
    PSS_SHOP_EVENTS_LIST,
    PSS_EVENT_THEMES_LIST,
    PSS_SHOP_EVENT_THEMES_LIST,
    PSS_EVENT_CUSTOMERS,
    PSS_EVENT_ASSIGNEES,
    PSS_FEEDBACK_REVIEW_TABLE,
    PSS_PACKAGES_TABLE,

    RESET_PASSWORD_API,
    LOGOUT_API,
    REGISTER_NEW_USER,
    UPDATE_SHOP_DETAILS,
    LOGIN_USER_API,
    FORGOT_PASSWORD_API,

    ADD_PSS_EVENTS_API,
    UPDATE_PSS_EVENTS_API,
    ADD_SHOP_EVENT_TYPE_API, 
    REMOVE_EVENT_TYPE_SHOP_API,
    GET_ALL_EVENTS_API,

    ADD_PSS_THEMES_API,
    UPDATE_PSS_THEMES_API,
    ADD_SHOP_THEME_API,
    REMOVE_THEME_TYPE_SHOP_API,
    GET_ALL_PSS_THEMES_API,
    GET_ALL_SHOP_THEMES_API,

    ADD_ASSIGNEE_API,    
    UPDATE_ASSIGNEE_API,
    DELETE_ASSIGNEE_API,
    GET_ALL_ASSIGNEE,
    GET_EVENT_ASSIGNEE,
    GET_ALL_PSS_EVENTS_API,

    ADD_CUSTOMER_API,    
    UPDATE_CUSTOMER_API,
    UPDATE_EVENT_STATUS_API,
    UPDATE_EVENT_PAYMENTS_API,
    UPDATE_EVENT_ASSIGNEE_API,
    GET_ALL_CUSTOMER_API,
    GET_ALL_UPCOMING_EVENT_API,
    GET_EVENT_UPCOMING_EVENT_API,
    GET_EVENT_CUSTOMER_API,
    GET_EVENT_THEME_CUSTOMER_API,
    GET_INDIVIDUAL_CUSTOMER_EVENT,
    GET_CUSTOMER_EVENTS_API,
    
    ADD_REVIEW_COMMENT_API,
    GET_ALL_REVIEWS,
    GET_INDIVIDUAL_CUSTOMER_REVIEWS,

    ADD_PACKAGES_API,
    UPDATE_PACKAGES_API,
    DELETE_PACKAGES_API,
    GET_PACKAGES_API,

    SUCCESS_ADD_EVENT_TYPE_MSG,
    SUCCESS_UPDATE_EVENT_TYPE_MSG,
    SUCCESS_REMOVE_EVENT_TYPE_MSG,

    SUCCESS_ADD_THEME_MSG,
    SUCCESS_UPDATE_THEME_MSG,
    SUCCESS_ADD_ASSIGNEE_MSG,
    SUCCESS_UPDATE_ASSIGNEE_MSG,
    SUCCESS_ADD_CUSTOMER_MSG,
    SUCCESS_UPDATE_CUSTOMER_MSG,
    SUCCESS_UPDATE_CUSTOMER_STATUS_MSG,
    SUCCESS_UPDATE_CUSTOMER_ASSIGNEE_MSG,
    SUCCESS_ADD_PACKAGE_MSG,
    SUCCESS_UPDATE_CUSTOMER_PAYMENTS_MSG,

    BANQUET_DATA_TABLE,
    ADD_BANQUET_API,
    UPDATE_BANQUET_API,
    DELETE_BANQUET_API,
    GET_BANQUET_API,
    SUCCESS_ADD_BANQUET_MSG
}