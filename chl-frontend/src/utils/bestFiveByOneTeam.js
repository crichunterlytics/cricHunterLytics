import { SERIESPOINT_TOTAL } from "../constants/generalApp";

export const bestFiveByOneTeam = (playerData) => {
    let selectedPlayers = [];

    // Sort by performance
    playerData.sort((a, b) => b[SERIESPOINT_TOTAL] - a[SERIESPOINT_TOTAL]);

    selectedPlayers.push(playerData[0]);
    selectedPlayers.push(playerData[1]);
    selectedPlayers.push(playerData[2]);
    selectedPlayers.push(playerData[3]);
    selectedPlayers.push(playerData[4]);

    let remainingPlayers = [
        ...playerData.slice(5)
    ]

    while (selectedPlayers.length < 6 && remainingPlayers.length > 0) {
        const player = remainingPlayers.shift();
        const teamCount = selectedPlayers.filter(p => p.team_id === player.team_id).length;
        if (teamCount < 5 ) {
            selectedPlayers.push(player);
        }
    }

    return selectedPlayers;
};