import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// const HOST_NAME = 'https://cricbuzz-cricket.p.rapidapi.com';
const HOST_NAME = 'http://88.222.241.104:4000';
// const HOST_NAME = 'http://localhost:4000';
const API_BASE_URL = `${HOST_NAME}/api`;
// const API_BASE_URL = `${HOST_NAME}/`;

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const assignTokenToHeader = (
  config,
  accessToken,
) => {
  if (config.headers && accessToken) {
    config.headers.authorization = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMywibW9iaWxlX251bWJlciI6Ijk2NzMzNTI0NjgiLCJpYXQiOjE3MjQ5MjgxMjcsImV4cCI6MTcyNjIyNDEyN30.mGXRfw1JjkIXxO2gjz6BWeRxBF-TNE5QytoE0SfjdHY`;
    config.headers['x-rapidapi-key'] = accessToken;
  }
  return config;
};

http.interceptors.request.use(
  (config) => {
    // const accessToken = getAccessToken();
    // const accessToken = "5f89e4546bmsh8290f93d0892ed4p171c65jsn4db96acdf2d4"; //Rupali Nile Account
    const accessToken = "c468d42bebmsh80c1a182a8f6274p11cc38jsn22eb3a4cf99d"; //Rupali Kelkar account   
    return assignTokenToHeader(config, accessToken);
  },
  error => {
    return Promise.reject(error);
  },
);