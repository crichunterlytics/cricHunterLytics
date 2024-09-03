import { MATCHPOINT_MATCH_RUN, MATCHPOINT_MATCH_WICKETS, MATCHPOINT_TOTAL, MATCH_BOWLING_ECONOMY, MATCH_MAIDENS, MATCH_PLAYED_BALL, MATCH_RUNS, MATCH_STRIKERATE, MATCH_TOTAL_BALLS_BOWLED, MATCH_TOTAL_FOUR, MATCH_TOTAL_SIX, MATCH_WICKETS } from "../constants/generalApp";

export const calculatePlayerScorePoints = (player, matchType) => {
    // Scoring point run*1, four*1, Six*2, 100>= +16, 50>= +8, 30>= +4 
    let mr = player[MATCH_RUNS] + (player[MATCH_TOTAL_FOUR] * 1) + (player[MATCH_TOTAL_SIX] * 2) + (player[MATCH_RUNS]>=100 ? 16 : player[MATCH_RUNS]>=50 ? 8 : player[MATCH_RUNS]>=30 ? 4 : 0);

    // Wicket Points wicket=25; maiden_over=12; wicket_3=4; wicket_4=8; wicket_5=16;
    let mw = (player[MATCH_WICKETS] *25) + (player[MATCH_MAIDENS]*12) + (player[MATCH_WICKETS] >=5 ? 16 : player[MATCH_WICKETS] ==4 ? 8 : player[MATCH_WICKETS]  == 3 ? 4 : 0)

    if(matchType !== 'TEST') {

        if(player[MATCH_RUNS] >=20 || player[MATCH_PLAYED_BALL] >=10) {
            const sr = player[MATCH_STRIKERATE];
            if(sr >= 170) {
                mr = mr + 6;
            }
            else if(sr >= 150) {
                mr = mr + 4;
            }
            else if(sr >= 130) {
                mr = mr + 2;
            }
            else if(sr >= 70) {
                mr = mr + 0;
            }
            else if(sr >= 60) {
                mr = mr - 2;
            }
            else if(sr >= 50) {
                mr = mr - 4;
            }
            else {
                mr = mr - 6;
            }
        }

        if(player[MATCH_TOTAL_BALLS_BOWLED] > 6) {
            const er = player[MATCH_BOWLING_ECONOMY];
            if(er < 5) { 
                mw = mw + 6;
            }
            else if(er < 5.99) {
                mw = mw + 4;
            }
            else if(er < 6.99) {
                mw = mw + 2
            }
            else if(er < 9.99) {
                mw = mw + 0;
            }
            else if(er < 10.99) {
                mw = mw -2;
            }
            else if(er < 11.99) {
                mw = mw - 4;
            }
            else {
                mw = mw - 6;
            }
        }
    }

    return {
        ...player,
        [MATCHPOINT_MATCH_RUN]: mr,
        [MATCHPOINT_MATCH_WICKETS]: mw,
        [MATCHPOINT_TOTAL]: mr + mw
    }

}