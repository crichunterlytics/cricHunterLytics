import React, { useEffect, useState } from 'react';
import { DEFAULT_DETAILS_VIEW_TAB, MATCHES_DETAILS_TAB, SERIES_DETAILS_VIEW_TAB, TEAMS_DETAILS_TAB } from '../../constants/generalApp';
import { CustomTab, CustomTabs } from '../components/CustomTabs/CustomTabs.js';
import SpinnerOverlay from '../components/SpinnerOverlay/SpinnerOverlay';
import { useParams } from 'react-router-dom';
import SeriesMatchesPage from './SeriesMatchesPage';
import { FormatDate } from '../../utils/FormatDate';
import SeriesTeamsPage from './SeriesTeams';
import PlayerStatsPage from '../PlayerStatsPages/PlayerStatsPage';

const SeriesDetailView = () => {
  const { seriesId, seriesName, seriesStartDate, seriesEndDate } = useParams();
  const [spinLoading, setSpinLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(DEFAULT_DETAILS_VIEW_TAB);

  const onClickTabChange = (type) => {
    setActiveTab(type);
  };

  return (
    <div className="series-detail-view-page">
      <div className='chl-page-header-h1title'>
        <div className='chl-h1-cs'>{seriesName}</div>
        <div>{FormatDate(seriesStartDate, "DD MMM YYYY")} - {FormatDate(seriesEndDate, "DD MMM YYYY")}</div>
      </div>

        <CustomTabs>
            {Object.keys(SERIES_DETAILS_VIEW_TAB).map((tabKey) => (
            <CustomTab 
                key={tabKey} 
                tab={SERIES_DETAILS_VIEW_TAB[tabKey]}
                onSetActiveTab={(t)=>onClickTabChange(t)}
            >
                <></>
            </CustomTab>
            ))}
        </CustomTabs>

        {activeTab === MATCHES_DETAILS_TAB ? 
        <SeriesMatchesPage seriesId={seriesId} /> 
        :
        activeTab === TEAMS_DETAILS_TAB ?
        <SeriesTeamsPage seriesId={seriesId} />
        :
        <PlayerStatsPage seriesId={seriesId} />
        }

        <section>This is the gap between two teams</section>
        <SpinnerOverlay spinning={spinLoading}></SpinnerOverlay>  
    </div>
  );
};

export default SeriesDetailView;
