import { SERIESPOINT_MATCH_RUN } from "../constants/generalApp";

export const bestThreeByTwoBatter = (playerData) => {
    let selectedPlayers = [];

    // Sort by performance
    playerData.sort((a, b) => b[SERIESPOINT_MATCH_RUN] - a[SERIESPOINT_MATCH_RUN]);

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

    return selectedPlayers;
};