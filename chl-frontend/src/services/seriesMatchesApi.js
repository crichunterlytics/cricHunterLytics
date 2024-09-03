import { SERIES_API_URL } from "../constants/generalApp";
import { http } from "./app";

export const getExternalSeriesMatchesApi = (payload) =>
  http.get(`https://cricbuzz-cricket.p.rapidapi.com/${SERIES_API_URL}/${payload.series_id}`);

export const addSeriesMatchesApi = (payload) =>
  http.post(`/series/add_series_matches/`, payload);

export const getSeriesMatchesApi = (payload) =>
  http.get(`/series/series_matches/${payload.series_id}`);

export const getSeriesIndividualMatchApi = (payload) =>
  http.get(`/series/series_individual_match/${payload.series_id}/${payload.match_id}`);

export const addSeriesMatchesStatsApi = (payload) =>
  http.post(`/team/series_match_players_stats/`, payload);

