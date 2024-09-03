import { MATCH_SCORECARD_API_URL } from "../constants/generalApp";
import { http } from "./app";

//Get players stats details
export const getPlayersStatsApi = (payload) =>
  http.get(`/team/players_stats/${payload.seriesId}/${payload.teamId}`);

//Get Two teams players stats details
export const getTwoTeamsPlayersStatsApi = (payload) =>
  http.post(`/team/twoteams_players_stats`, payload);

export const getExternalMatchScorecardApi = (payload) =>
  http.get(`https://cricbuzz-cricket.p.rapidapi.com/${MATCH_SCORECARD_API_URL}/${payload.match_id}/hscard`);

export const addMatchScorecardApi = (payload) =>
  http.post(`/match/scorecard`, payload);