import { SERIES_API_URL } from "../constants/generalApp";
import { http } from "./app";

export const getExternalSeriesTeamsApi = (payload) =>
  http.get(`https://cricbuzz-cricket.p.rapidapi.com/${SERIES_API_URL}/${payload.series_id}/squads`);

export const getSeriesTeamsApi = (payload) =>
  http.get(`/series/teams_list/${payload.series_id}`);

export const getTeamsSquadStatusApi = (payload) =>
  http.post(`/team_squad/series_squad_status`, payload);

export const addSeriesTeamsApi = (payload) =>
  http.post(`/series/add_teams/`, payload);

export const getExternalTeamSquadApi = (payload) =>
  http.get(`https://cricbuzz-cricket.p.rapidapi.com/${SERIES_API_URL}/${payload.series_id}/squads/${payload.squad_id}`);

export const addTeamSquadPlayers = (payload) =>
  http.post(`/team_squad/add_squad`, payload);