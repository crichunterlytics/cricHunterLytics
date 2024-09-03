import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSeriesIndividualMatchApi } from '../../services/seriesMatchesApi';
import { getMatchStatus } from '../../utils/matchStatus';
import MatchCard from '../SeriesDetailPages/MatchCard';
import PlayerStatsPage from './PlayerStatsPage';

const MultipleTeamStatsPages = () => {
    const { seriesId, matchId } = useParams();
    const [matchesListData, setMatchesListData] = useState([]);
    const [spinLoading, setSpinLoading] = useState(false);

    useEffect(() => {
        setSpinLoading(true);
        getMatchesListData();
    },[]);

    const getMatchesListData = async () => {
        try {
            setSpinLoading(false);
          const response = await getSeriesIndividualMatchApi({ series_id: seriesId, match_id: matchId});
          if (response && response.data) {
            console.log("Series Matches List=",response.data);
            if(response.data.status_code === 200) {
                let resData = response.data.data.map((item) => {
                    return {
                        ...item,
                        matchStatus: getMatchStatus(item.start_date, item.end_date)
                    }
                })
                setMatchesListData(resData);
            }
            else {
                setMatchesListData([]);
            }
          }
        } catch (e) {
            setSpinLoading(false);
            setMatchesListData([]);
            console.log("error=",e)
        }
    };

    return(
        <Row>
            <Col xs={24}>
            <Row style={{marginTop: "10px"}}>
                <Col xs={24}>
                    {matchesListData.length > 0 ? 
                    matchesListData.map((mld) => (
                        <MatchCard
                            key={mld.series_id}
                            team1Logo="/path/to/team1logo.png"
                            team1Name={mld.team1_name}
                            team2Logo="/path/to/team2logo.png"
                            team2Name={mld.team2_name}
                            matchDate= {mld.date_display_text}
                            // matchResult="Team 1 won by 20 runs"
                            groundName={mld.ground_name}
                            cityName={mld.ground_city}
                            matchStatus={mld.matchStatus}
                            matchType={mld.match_format}
                            hide_view_match_stats= {true}
                        />
                    ))
                    :
                    <div>No Data...</div>
                    }
                    
                </Col>
            </Row>
            </Col>
            {matchesListData.length > 0 ? 
            <>
            <Col xs={24}>
                <PlayerStatsPage 
                seriesId={matchesListData[0].series_id}
                teamId_prop={matchesListData[0].team1_id}
                multipleTeamStats={true}
                teamName_prop={matchesListData[0].team1_shortname}
                />
            </Col>
            <Col xs={11}></Col><Col xs={4}>
                <div className='chl-page-header-h1title'>
                    <div className='chl-h1-cs'>VS</div>
                </div>
            </Col>
            <Col xs={24}>
                <PlayerStatsPage 
                seriesId={matchesListData[0].series_id}
                teamId_prop={matchesListData[0].team2_id}
                multipleTeamStats={true}
                teamName_prop={matchesListData[0].team2_shortname}
                />
            </Col>
            </>
            :
            <div>No Data...</div>
            }
        </Row>
    )
}

export default MultipleTeamStatsPages;