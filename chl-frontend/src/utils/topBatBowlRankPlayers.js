import { SERIESPOINT_MATCH_RUN, SERIESPOINT_MATCH_WICKETS, SERIESPOINT_TOTAL } from "../constants/generalApp";

// Function to rank 3 batters
export const getTopBatters = (data) => {
    return data
        .sort((a, b) => {
            return b[SERIESPOINT_MATCH_RUN] - a[SERIESPOINT_MATCH_RUN];
        })
        .slice(0, 3); // Top 3 batters
}

// Function to rank 2 bowlers
export const getTopBowlers = (data) => {
    return data
        .sort((a, b) => {
            return b[SERIESPOINT_MATCH_WICKETS] - a[SERIESPOINT_MATCH_WICKETS]
        })
        .slice(0, 2); // Top 3 bowlers
}

// Function to rank 2 allrounders
export const getTopAllrounders = (data) => {
    return data
        .filter(player => player.player_role == "Batting Allrounder" || player.player_role == "Bowling Allrounder") // Filter allrounders
        .sort((a, b) => {
            return b[SERIESPOINT_TOTAL] - a[SERIESPOINT_TOTAL]
        })
        .slice(0, 2); // Top 3 allrounders
}

//Below Function return all player_id from json data into single array
export const getPlayerIds = (data) => {
    return data.map(item => item.player_id);
}