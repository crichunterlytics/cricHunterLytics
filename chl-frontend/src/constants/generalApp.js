//API parent URL constants
export const SERIES_API_URL = 'series/v1';
export const MATCH_SCORECARD_API_URL = 'mcenter/v1';

export const SERIES_ID = 7525;

export const PLAYER_PLAYING_STYLE = {
    "Right-hand bat": "RHB",
    "Left-hand bat": "LHB",
    "Right-arm medium": "RAM",
    "Left-arm medium": "LAM",
    "Right-arm fast-medium": "RAF",
    "Left-arm fast-medium": "LAF",
    "Left-arm orthodox": "LAO",
    "Right-arm orthodox": "RAO",
    "Left-arm Leagbreak": "LAL",
    "Right-arm Leagbreak": "RAL",
    "Right-arm offbreak": "RAO",
    "Left-arm offbreak": "LAO"
}

export const DEFAULT_SERIES_TYPE = 'international';
export const SERIES_TYPE_STR = {
    international : 'International',
    league: 'League',
    domestic: 'Domestic',
    women: 'Women'
}

export const DEFAULT_DETAILS_VIEW_TAB = 'series_matches';
export const MATCHES_DETAILS_TAB = 'series_matches';
export const TEAMS_DETAILS_TAB = 'teams';
export const TEAMSTATS_DETAILS_TAB = 'team_stats';
export const SERIES_DETAILS_VIEW_TAB = {
    series_matches : 'Series Matches',
    teams: 'Teams',
    team_stats: 'Team Stats',
}

// Match Level Constants
export const PLAYER_ROLE_BATTER = "Batter";
export const PLAYER_ROLE_BOWLING = "Bowler";
export const PLAYER_ROLE_BATALL = "Batting Allrounder";
export const PLAYER_ROLE_BOWLALL = "Bowling Allrounder";
export const PLAYER_ROLE_WKBAT = "WK-Batter";

export const MATCH_RUNS = "match_run";
export const MATCH_WICKETS = "total_wicket_taken";
export const MATCH_TOTAL_FOUR = "total_four";
export const MATCH_TOTAL_SIX = "total_six";
export const MATCH_MAIDENS = "maidens";
export const MATCH_PLAYED_BALL = "played_ball";
export const MATCH_STRIKERATE = "match_strikerate";
export const MATCH_TOTAL_BALLS_BOWLED = "total_balls_bowled";
export const MATCH_BOWLING_ECONOMY = "bowling_economy";
 

export const MATCHPOINT_MATCH_RUN = "mp_match_run";
export const MATCHPOINT_MATCH_WICKETS = "mp_match_wicket";
export const MATCHPOINT_TOTAL = "mp_total_point";

//Series Level constants
export const TOTAL_SERIES_RUNS = "ts_runs";
export const TOTAL_SERIES_BALL_PLAYED = "ts_ball_played";
export const TOTAL_SERIES_FOURS = "ts_fours";
export const TOTAL_SERIES_SIXES = "ts_sixes";

export const TOTAL_SERIES_WICKETS = "ts_wickets";
export const TOTAL_SERIES_BALLS_BOWLED = "ts_ball_bowled";
export const TOTAL_SERIES_OVERS_BOWLED = "ts_overs_bowled";
export const TOTAL_SERIES_RUNS_GIVEN = "ts_runs_given";
export const TOTAL_SERIES_MAIDENS = "ts_maidens";

export const SERIESPOINT_MATCH_RUN = "sp_match_runs";
export const SERIESPOINT_MATCH_WICKETS = "sp_match_wickets";
export const SERIESPOINT_TOTAL = "sp_total_points";

// Display Purposes Keys Created
export const DISPLAY_PLAYING_STYLE = "display_playing_style";
export const DISPLAY_PLAYER_SERIES_RUNS = "display_player_series_runs";
export const DISPLAY_PLAYER_SERIES_WICKETS = "display_player_series_wickets";

//Team Status
export const MATCH_STATUS_NEXT_COMING = "Next Coming";
export const MATCH_STATUS_INPROGRESS = "In Progress";
export const MATCH_STATUS_COMPLETED = "Completed";