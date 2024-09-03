import { DISPLAY_PLAYER_SERIES_RUNS, DISPLAY_PLAYER_SERIES_WICKETS, DISPLAY_PLAYING_STYLE, MATCHPOINT_MATCH_RUN, MATCHPOINT_MATCH_WICKETS, MATCHPOINT_TOTAL, PLAYER_PLAYING_STYLE, SERIESPOINT_MATCH_RUN, SERIESPOINT_MATCH_WICKETS, SERIESPOINT_TOTAL, TOTAL_SERIES_BALLS_BOWLED, TOTAL_SERIES_BALL_PLAYED, TOTAL_SERIES_FOURS, TOTAL_SERIES_MAIDENS, TOTAL_SERIES_OVERS_BOWLED, TOTAL_SERIES_RUNS, TOTAL_SERIES_RUNS_GIVEN, TOTAL_SERIES_SIXES, TOTAL_SERIES_WICKETS } from "../constants/generalApp";
import { calculatePlayerScorePoints } from "./calculatePlayerScorePoints";
import { getPlayerIds, getTopAllrounders, getTopBatters, getTopBowlers } from "./topBatBowlRankPlayers";

export const modifyPlayerStatsResponse = (data) => {
    let finalModifyData = [];
    let playersData = {};
    
    for(let d in data) {
        const displayRuns = data[d].match_run === 0 && data[d].played_ball === 0 ? '-' : `${data[d].match_run}(${data[d].played_ball})`;
        const displayWickets = data[d].total_balls_bowled === 0 ? '-' : `${data[d].total_wicket_taken}/${data[d].total_over_bowled}`; 
        //Create Match Points - Runs, Wickets, Total
        data[d] = calculatePlayerScorePoints(data[d], "T20");
        
        //Create player key 
        const availPlayerKey = `${data[d].series_id}_${data[d].team_id}_${data[d].player_id}`;

        if(playersData[availPlayerKey]) {
            //already available player
            let pd = playersData[availPlayerKey];
            console.log(pd)
            playersData[availPlayerKey] = {
                ...pd,
                // [DISPLAY_PLAYER_SERIES_RUNS]: `${pd[DISPLAY_PLAYER_SERIES_RUNS]}, ${displayRuns}`,
                // [DISPLAY_PLAYER_SERIES_WICKETS] : `${pd[[DISPLAY_PLAYER_SERIES_WICKETS]]}, ${displayWickets}`,
                [DISPLAY_PLAYER_SERIES_RUNS]: [...pd[DISPLAY_PLAYER_SERIES_RUNS], {value: displayRuns, team:"TBD"}],
                [DISPLAY_PLAYER_SERIES_WICKETS]: [...pd[DISPLAY_PLAYER_SERIES_WICKETS], {value: displayWickets, team:"TBD"}],
                [TOTAL_SERIES_RUNS] : pd[[TOTAL_SERIES_RUNS]] + data[d].match_run,
                [TOTAL_SERIES_BALL_PLAYED] : pd[TOTAL_SERIES_BALL_PLAYED] + data[d].played_ball,
                [TOTAL_SERIES_FOURS] : pd[TOTAL_SERIES_FOURS] + data[d].total_four,
                [TOTAL_SERIES_SIXES] : pd[TOTAL_SERIES_SIXES] + data[d].total_six,
                [TOTAL_SERIES_WICKETS] : pd[TOTAL_SERIES_WICKETS] + data[d].total_wicket_taken,
                [TOTAL_SERIES_BALLS_BOWLED] : pd[TOTAL_SERIES_BALLS_BOWLED] + data[d].total_balls_bowled,
                [TOTAL_SERIES_OVERS_BOWLED] : pd[TOTAL_SERIES_OVERS_BOWLED] + data[d].total_over_bowled,
                [TOTAL_SERIES_RUNS_GIVEN] : pd[TOTAL_SERIES_RUNS_GIVEN] + data[d].given_runs,
                [TOTAL_SERIES_MAIDENS] : pd[TOTAL_SERIES_MAIDENS] + data[d].maidens,
                [SERIESPOINT_MATCH_RUN] : pd[SERIESPOINT_MATCH_RUN] + data[d][MATCHPOINT_MATCH_RUN],
                [SERIESPOINT_MATCH_WICKETS] : pd[SERIESPOINT_MATCH_WICKETS] + data[d][MATCHPOINT_MATCH_WICKETS],
                [SERIESPOINT_TOTAL]: pd[SERIESPOINT_TOTAL] + data[d][MATCHPOINT_TOTAL],
                battingPositionModify: data[d].id > pd['modifyPlayerId'] ? data[d].lastmatch_batposition : pd['battingPositionModify']
            }
        }
        else {
            //not available add new player
            const playerPlayingStyle = `${data[d].player_bat_style ? PLAYER_PLAYING_STYLE[data[d].player_bat_style] : ''} ${data[d].player_bowl_style ? `,${PLAYER_PLAYING_STYLE[data[d].player_bowl_style]}` : ''}`;
            playersData[availPlayerKey] = {
                ...data[d],
                [DISPLAY_PLAYING_STYLE]: playerPlayingStyle,
                [DISPLAY_PLAYER_SERIES_RUNS]: [{value: displayRuns, team:"TBD"}],
                [DISPLAY_PLAYER_SERIES_WICKETS] : [{value: displayWickets, team:"TBD"}],
                [TOTAL_SERIES_RUNS] : data[d].match_run,
                [TOTAL_SERIES_BALL_PLAYED] : data[d].played_ball,
                [TOTAL_SERIES_FOURS] : data[d].total_four,
                [TOTAL_SERIES_SIXES] : data[d].total_six,
                [TOTAL_SERIES_WICKETS] : data[d].total_wicket_taken,
                [TOTAL_SERIES_BALLS_BOWLED] : data[d].total_balls_bowled,
                [TOTAL_SERIES_OVERS_BOWLED] : data[d].total_over_bowled,
                [TOTAL_SERIES_RUNS_GIVEN] : data[d].given_runs,
                [TOTAL_SERIES_MAIDENS] : data[d].maidens,
                [SERIESPOINT_MATCH_RUN] : data[d][MATCHPOINT_MATCH_RUN],
                [SERIESPOINT_MATCH_WICKETS] : data[d][MATCHPOINT_MATCH_WICKETS],
                [SERIESPOINT_TOTAL]: data[d][MATCHPOINT_TOTAL],
                battingPositionModify: data[d].lastmatch_batposition,
                modifyPlayerId: data[d].id
            }
        }
    }

    finalModifyData = Object.keys(playersData).map(key => {
        return {
            ...playersData[key],
            key: key
        }
    })
    
    const topBatters = getTopBatters(finalModifyData);
    const topBowlers = getTopBowlers(finalModifyData);
    const topAllrounders = getTopAllrounders(finalModifyData);

    finalModifyData = finalModifyData.map((item) => {
        return {
            ...item,
            isMIPBatter: getPlayerIds(topBatters).indexOf(item.player_id) !== -1 ? true : false,
            isMIPBowler: getPlayerIds(topBowlers).indexOf(item.player_id) !== -1 ? true : false,
            isMIPAllrounder: getPlayerIds(topAllrounders).indexOf(item.player_id) !== -1 ? true : false,
        }
    });

    finalModifyData = finalModifyData.sort((a, b) => a.battingPositionModify - b.battingPositionModify);
    
    return finalModifyData;
}