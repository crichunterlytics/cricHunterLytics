import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css'; // Import Ant Design styles by default
import './styles/main.scss';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SeriesListingPage from './pages/SeriesListingPage/SeriesListingPage';
import PrimaryLayout from './pages/Layout/PrimaryLayout';
import { SERIES_DETAILS_VIEW_ROUTE, SERIES_INDIVIDUAL_MATCH_PAGE_ROUTE, SERIES_LIST_PAGE_ROUTE, SERIES_MATCHES_PAGE_ROUTE, SERIES_SQUADS_PAGE_ROUTE, TEAMSLIST_PAGE_ROUTE, TEAM_DETAILS_PAGE_ROUTE } from './constants/routes';
import SeriesDetailView from './pages/SeriesDetailPages/SeriesDetailView';
import MultipleTeamStatsPages from './pages/PlayerStatsPages/MultipleTeamStatsPages';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrimaryLayout />} path="/">
          {/* <Route path={TEAMSLIST_PAGE_ROUTE} element={<TeamListPage />}></Route> */}
          {/* <Route path={`${TEAM_DETAILS_PAGE_ROUTE}/:seriesId/:teamId`} element={<TeamDetails />}></Route> */}
          {/* <Route path={`${SERIES_MATCHES_PAGE_ROUTE}/:seriesId`} element={<SeriesMatches />}></Route> */}
          <Route path={SERIES_LIST_PAGE_ROUTE} element={<SeriesListingPage />}></Route>
          <Route path={`${SERIES_DETAILS_VIEW_ROUTE}/:seriesId/:seriesStartDate/:seriesEndDate/:seriesName`} element={<SeriesDetailView />}></Route>
          <Route path={`${SERIES_INDIVIDUAL_MATCH_PAGE_ROUTE}/:seriesId/:matchId`} element={<MultipleTeamStatsPages />}></Route>
          {/* <Route path={`${SERIES_SQUADS_PAGE_ROUTE}/:seriesId`} element={<SeriesSquadsPage />}></Route> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
