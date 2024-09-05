import { SERIESPOINT_MATCH_WICKETS } from "../constants/generalApp";

export const bestThreeByTwoBowler = (playerData) => {
    let selectedPlayers = [];

    // Sort by performance
    playerData.sort((a, b) => b[SERIESPOINT_MATCH_WICKETS] - a[SERIESPOINT_MATCH_WICKETS]);
    
    selectedPlayers.push(playerData[0]);
    selectedPlayers.push(playerData[1]);
    selectedPlayers.push(playerData[2]);

    let remainingPlayers = [
        ...playerData.slice(3)
    ]

    while (selectedPlayers.length < 5 && remainingPlayers.length > 0) {
        const player = remainingPlayers.shift();
        const teamCount = selectedPlayers.filter(p => p.team_id === player.team_id).length;
        if (teamCount < 3 ) {
            selectedPlayers.push(player);
        }
    }

    selectedPlayers.sort((a, b) => b[SERIESPOINT_MATCH_WICKETS] - a[SERIESPOINT_MATCH_WICKETS]);
    selectedPlayers[0] = {...selectedPlayers[0], isCaptain: true}
    selectedPlayers[1] = {...selectedPlayers[1], isVoiceCaptain: true}

    return selectedPlayers;
};