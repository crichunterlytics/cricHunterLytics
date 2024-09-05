import React, { useEffect, useState } from "react";
import AddSeriesMatchesModal from "../components/SeriesMatchesModal/AddSeriesMatchesModal";
import { addSeriesMatchesStatsApi, getSeriesMatchesApi } from "../../services/seriesMatchesApi";
import SpinnerOverlay from "../components/SpinnerOverlay/SpinnerOverlay";
import { Col, Row } from "antd";
import MatchCard from "./MatchCard";
import { getMatchStatus } from "../../utils/matchStatus";
import { useNavigate } from "react-router-dom";
import { SERIES_INDIVIDUAL_MATCH_PAGE_ROUTE } from "../../constants/routes";
import { MATCH_STATUS_COMPLETED, MATCH_STATUS_NEXT_COMING } from "../../constants/generalApp";

const SeriesMatchesPage = ({seriesId}) => {
    const navigate = useNavigate();
    const [matchesListData, setMatchesListData] = useState([]);
    const [spinLoading, setSpinLoading] = useState(false);

    useEffect(() => {
        setSpinLoading(true);
        getMatchesListData();
    },[]);

    const getMatchesListData = async () => {
        try {
            setSpinLoading(false);
          const response = await getSeriesMatchesApi({ series_id: seriesId});
          if (response && response.data) {
            console.log("Series Matches List=",response.data);
            if(response.data.status_code === 200) {
                let reqBody = [];
                let resData = response.data.data.map((item) => {
                    reqBody.push({series_id: item.series_id, match_id: item.match_id})
                    return {
                        ...item,
                        matchStatus: getMatchStatus(item.start_date, item.end_date)
                    }
                })
                setMatchesListData(resData);
                if(response.data.length) {
                    getMatchesStatsData(reqBody, resData);
                }                
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

    //Get Match Players Status
    const getMatchesStatsData = async (reqBody, resData) => {
        try {
            setSpinLoading(false);
          const response = await addSeriesMatchesStatsApi(reqBody);
          if (response && response.data) {
            console.log("Series Matches Stats Status=",response.data);
            if(response.data.status_code === 200) {
                let matchesDt = [...resData];
                for(let item in response.data.data) {
                    for(let m in matchesDt) {
                        if(response.data.data[item].match_id === matchesDt[m].match_id) {
                            matchesDt[m] = {
                                ...matchesDt[m],
                                statsStatus: response.data.data[item].result
                            }
                            break;
                        }
                        
                    }
                }
                console.log("matches=", matchesDt)
                setMatchesListData(matchesDt);
            }
          }
          else {
            setMatchesListData(resData);
          }
        } catch (e) {
            setSpinLoading(false);
            setMatchesListData(resData);
            console.log("error=",e)
        }
    };

    const onSeriesMatchSelect = (seriesData) => {
        navigate(`/${SERIES_INDIVIDUAL_MATCH_PAGE_ROUTE}/${seriesData.series_id}/${seriesData.match_id}`);
    }

    return(
        <div className="series_matches-root">
            {/* {matchesListData.length === 0 && ( */}
                <Row style={{marginBottom: "10px"}}>
                    <Col xs={20}></Col>
                    <Col xs={4}>
                        <AddSeriesMatchesModal seriesId={seriesId} />
                        </Col>
                </Row>
            {/* // )} */}
            
            
            <Row>
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
                            matchResult="Team 1 won by 20 runs"
                            groundName={mld.ground_name}
                            cityName={mld.ground_city}
                            matchStatus={mld.matchStatus}
                            matchId={mld.match_id}
                            hide_view_match_stats={mld.matchStatus === MATCH_STATUS_NEXT_COMING ? false : true}
                            matchType={mld.match_format}
                            viewTeamsSeriesPerformance={() => onSeriesMatchSelect(mld)}
                            hide_add_match_stats = {(mld.matchStatus === MATCH_STATUS_COMPLETED && !mld.statsStatus) ? false : true}
                        />
                    ))
                    :
                    <div>No Data...</div>
                    }
                    
                </Col>
            </Row>

            <SpinnerOverlay spinning={spinLoading}></SpinnerOverlay>  
        </div>
    )
}

export default SeriesMatchesPage;