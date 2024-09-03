import { SERIES_API_URL } from '../constants/generalApp';
import { http } from './app';

//Fetch series list api's from external
export const getExternalSeriesListApi = (payload) =>
  http.get(`https://cricbuzz-cricket.p.rapidapi.com/${SERIES_API_URL}/${payload.series_type}`);

export const getSeriesListApi = (payload) =>
  http.get(`/series/series_list/${payload.series_type}`);

export const addSeriesListApi = (payload) =>
  http.post(`/series/add_series/`, payload);