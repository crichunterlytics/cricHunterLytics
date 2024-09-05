import React, { useEffect, useState } from "react";
import AddSeriesTeamsModal from "../components/SeriesMatchesModal/AddSeriesTeamsModal";
import SpinnerOverlay from "../components/SpinnerOverlay/SpinnerOverlay";
import { Col, Row } from "antd";
import { getSeriesTeamsApi, getTeamsSquadStatusApi } from "../../services/SeriesTeamsApi";
import TeamCard from "./TeamCard";

const SeriesTeamsPage = ({seriesId}) => {
    const [teamsListData, setTeamsListData] = useState([]);
    const [spinLoading, setSpinLoading] = useState(false);
    const [teamsSquadStatusData, setTeamsSquadStatusData] = useState([]);

    useEffect(() => {
        setSpinLoading(true);
        getTeamsListData();
    }, []);

    const getTeamsSquadStatusData = async (data) => {
        const squadData = data.map((item) => {
            return {
                squad_id: item.squad_id,
                series_id: item.series_id
            }
        })
        try {
          const response = await getTeamsSquadStatusApi(squadData);
          if (response && response.data) {
            console.log("Series Teams Squad status List=",response.data);
            if(response.data.status_code === 200) {
                let tmpArr = [];
                for(let i in response.data.data) {
                    if(response.data.data[i].result) {
                        tmpArr.push(response.data.data[i].squad_id);
                    }
                }
                setTeamsSquadStatusData(tmpArr);
            }
            else {
                setTeamsSquadStatusData([]);
            }
          }
        } catch (e) {
            setTeamsSquadStatusData([]);
            console.log("error=",e)
        }
    };

    const getTeamsListData = async () => {
        try {
            setSpinLoading(false);
          const response = await getSeriesTeamsApi({ series_id: seriesId});
          if (response && response.data) {
            console.log("Series Teams List=",response.data);
            if(response.data.status_code === 200) {
                setTeamsListData(response.data.data);
                if(response.data.data.length > 0) {
                    getTeamsSquadStatusData(response.data.data);
                }
            }
            else {
                setTeamsListData([]);
            }
          }
        } catch (e) {
            setSpinLoading(false);
            setTeamsListData([]);
            console.log("error=",e)
        }
    };

    return(
        <div className="series_matches-root">
            {teamsListData.length === 0 && (
                <Row style={{marginBottom: "10px"}}>
                    <Col xs={20}></Col>
                    <Col xs={4}>
                        <AddSeriesTeamsModal seriesId={seriesId} />
                        </Col>
                </Row>
            )}

            <Row>
                <Col xs={4}></Col>
                <Col xs={16}>
                    {teamsListData.length > 0 ? 
                    teamsListData.map((mld) => (
                        <TeamCard
                            key={mld.team_id}
                            teamLogo={mld.team_image_url}
                            teamName={mld.team_name}
                            seriesId={mld.series_id}
                            squadId={mld.squad_id}
                            teamId={mld.team_id}
                            displayTeamSquadBtn={teamsSquadStatusData.indexOf(mld.squad_id) === -1 ? true : false}
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

export default SeriesTeamsPage;