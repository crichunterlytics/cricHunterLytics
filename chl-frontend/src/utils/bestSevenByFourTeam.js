import { PLAYER_ROLE_BATALL, PLAYER_ROLE_BATTER, PLAYER_ROLE_BOWLALL, PLAYER_ROLE_BOWLING, PLAYER_ROLE_WKBAT, SERIESPOINT_MATCH_RUN, SERIESPOINT_MATCH_WICKETS, SERIESPOINT_TOTAL } from "../constants/generalApp";

export const getBestSevenByFourTeam = (playerData) => {
    let teamPlayers = {};
    
    playerData.forEach(player => {
        const { team_id } = player;
        if (!teamPlayers[team_id])  {
            teamPlayers[team_id] = [];
        }
        teamPlayers[team_id].push(player);
    });

    let selectedPlayers = [];
    let roles = {
        batter: [],
        bowler: [],
        allrounder: [],
        keeper: [],
    };

    Object.values(teamPlayers).forEach(players => {
        players.forEach(player => {
            if (player.player_role === PLAYER_ROLE_BATTER) {
                roles.batter.push(player);
            } else if (player.player_role === PLAYER_ROLE_BOWLING) {
                roles.bowler.push(player);
            } else if (player.player_role.includes(PLAYER_ROLE_BATALL)) {
                roles.allrounder.push(player);
            } 
            else if (player.player_role.includes(PLAYER_ROLE_BOWLALL)) {
                roles.allrounder.push(player);
            } else if (player.player_role.includes(PLAYER_ROLE_WKBAT)) {
                roles.keeper.push(player);
            }
        });
    });

    // Sort by performance
    roles.batter.sort((a, b) => b[SERIESPOINT_MATCH_RUN] - a[SERIESPOINT_MATCH_RUN]);
    roles.bowler.sort((a, b) => b[SERIESPOINT_MATCH_WICKETS] - a[SERIESPOINT_MATCH_WICKETS]);
    roles.allrounder.sort((a, b) => b[SERIESPOINT_TOTAL] - a[SERIESPOINT_TOTAL]);
    roles.keeper.sort((a, b) => b[SERIESPOINT_MATCH_RUN] - a[SERIESPOINT_MATCH_RUN]);

    // Ensure at least 3 from each role
    if (roles.batter.length > 0) { 
        selectedPlayers.push(roles.batter[0]);
        selectedPlayers.push(roles.batter[1]);
        selectedPlayers.push(roles.batter[2]);
    };

    if (roles.bowler.length > 0) { 
        selectedPlayers.push(roles.bowler[0]);
        selectedPlayers.push(roles.bowler[1]);
        selectedPlayers.push(roles.bowler[2]);
    }

    if (roles.allrounder.length > 0) selectedPlayers.push(roles.allrounder[0]);
    if (roles.keeper.length > 0) selectedPlayers.push(roles.keeper[0]);

    // Fill remaining spots based on performance
    let remainingPlayers = [
        ...roles.batter.slice(3),
        ...roles.bowler.slice(3),
        ...roles.allrounder.slice(1),
        ...roles.keeper.slice(1)
    ].sort((a, b) => b[SERIESPOINT_TOTAL] - a[SERIESPOINT_TOTAL]);

    while (selectedPlayers.length < 11 && remainingPlayers.length > 0) {
        const player = remainingPlayers.shift();
        const teamCount = selectedPlayers.filter(p => p.team_id === player.team_id).length;
        if (teamCount < 7) {
            selectedPlayers.push(player);
        }
    }

    selectedPlayers.sort((a, b) => b[SERIESPOINT_TOTAL] - a[SERIESPOINT_TOTAL]);
    selectedPlayers[0] = {...selectedPlayers[0], isCaptain: true}
    selectedPlayers[1] = {...selectedPlayers[1], isVoiceCaptain: true}

    return selectedPlayers;
};