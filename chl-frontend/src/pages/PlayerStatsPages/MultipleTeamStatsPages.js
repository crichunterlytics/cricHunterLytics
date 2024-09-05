import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTwoTeamsPlayersStatsApi } from '../../services/playerStatsApi';
import { getSeriesIndividualMatchApi } from '../../services/seriesMatchesApi';
import { calculatePlayerScorePoints } from '../../utils/calculatePlayerScorePoints';
import { getMatchStatus } from '../../utils/matchStatus';
import { modifyPlayerStatsResponse } from '../../utils/modifyPlayerStatsResponse';
import GradientButton from '../components/GradientButton/GradientButton';
import TeamPreviewModal from '../components/TeamPreviewModal/TeamPreviewModal';
import MatchCard from '../SeriesDetailPages/MatchCard';
import PlayerStatsPage from './PlayerStatsPage';
import {getBestTenByOneTeam} from "../../utils/bestTenByOneTeam";
import {getBestSevenByFourTeam} from "../../utils/bestSevenByFourTeam";
import {bestFiveByOneTeam} from "../../utils/bestFiveByOneTeam";
import { bestThreeByTwoBatter } from "../../utils/bestThreeByTwoBatter";
import { bestThreeByTwoBowler } from "../../utils/bestThreeByTwoBowler";
import { PLAYER_ROLE_BATALL, PLAYER_ROLE_BATTER, PLAYER_ROLE_BOWLALL, PLAYER_ROLE_BOWLING, PLAYER_ROLE_WKBAT } from '../../constants/generalApp';

const MultipleTeamStatsPages = () => {
    const { seriesId, matchId } = useParams();
    const [matchesListData, setMatchesListData] = useState([]);
    const [twoTeamStatsDatas, setTwoTeamStatsData] = useState([]);
    const[bestElevenTeam, setBestElevenTeam] = useState([]);
    const[bestTeamModalVisible, setBestTeamModalVisible] = useState(false);
    const[previewModalTitle, setPreviewModalTitle] = useState("");
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
                getTwoTeamStatsDetails(resData[0].team1_id, resData[0].team2_id, resData[0].match_format)
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

    const teamPreviewModify = (data) => {
        const players = {
            wk: [],
            batters: [],
            allrounders: [],
            bowlers: [],
            captainName:"",
            voiceCaptainName:""
        };

        for(let d in data) {
            if(data[d].isCaptain) {
                players.captainName = data[d].player_name
            }
            if(data[d].isVoiceCaptain) {
                players.voiceCaptainName = data[d].player_name
            }

            switch(data[d].player_role) {
                case PLAYER_ROLE_WKBAT :
                    players.wk.push({ name: formatPreviewName(data[d].player_name), logo: '' })
                    break;
                case PLAYER_ROLE_BATTER :
                    players.batters.push({ name: formatPreviewName(data[d].player_name), logo: '' })
                    break;
                case PLAYER_ROLE_BOWLING :
                    players.bowlers.push({ name: formatPreviewName(data[d].player_name), logo: '' })
                    break;
                case PLAYER_ROLE_BOWLALL :
                case PLAYER_ROLE_BATALL :
                    players.allrounders.push({ name: formatPreviewName(data[d].player_name), logo: '' })
                    break;
            }
        }
        console.log("pp==",players)
        return players;
    }

    const formatPreviewName = (name) => {
        const words = name.split(" ");
        if (words.length === 2) {
          const firstInitial = words[0].charAt(0);
          const lastName = words[1];
          const formattedLastName = lastName.length > 4 ? lastName.slice(0, 8) + "..." : lastName;
          return `${firstInitial} ${formattedLastName}`;
        }
        return name; // Fallback for cases where the name has more or fewer than 2 words
    };
      

      const getTwoTeamStatsDetails = async (team1_id, team2_id, match_format) => {
        try {
          const response = await getTwoTeamsPlayersStatsApi({series_id: seriesId, team1_id: team1_id, team2_id: team2_id });
          const finalData = modifyPlayerStatsResponse(response.data.data, match_format); 
          setTwoTeamStatsData(finalData);
        } catch (e) {
            console.log("error=",e)
        }
      };

      const onClickTenByOne = () => {
        const best11 = getBestTenByOneTeam(twoTeamStatsDatas);
        for(let b in best11) {
            console.log(`${best11[b].player_name} [${best11[b].player_role}] ${best11[b].team_id} = ${best11[b].sp_total_points}`);
        }
        setBestElevenTeam(teamPreviewModify(best11));
        setPreviewModalTitle("Best analysis Prediction : 10:1 Preview");
        setBestTeamModalVisible(true);
    }

    const onClickSevenByFour = () => {
        const best11 = getBestSevenByFourTeam(twoTeamStatsDatas);
        console.log(best11)
        for(let b in best11) {
            console.log(`${best11[b].player_name} [${best11[b].player_role}] ${best11[b].team_id} = ${best11[b].sp_total_points}`);
        }
        setBestElevenTeam(teamPreviewModify(best11));
        setPreviewModalTitle("Best analysis Prediction : 7:4 Preview");
        setBestTeamModalVisible(true);
    }

    const onClickFiveByOne = () => {
        const best11 = bestFiveByOneTeam(twoTeamStatsDatas);
        for(let b in best11) {
            console.log(`${best11[b].player_name} [${best11[b].player_role}] ${best11[b].team_id} = ${best11[b].sp_total_points}`);
        }
        setBestElevenTeam(teamPreviewModify(best11));
        setPreviewModalTitle("Best analysis Prediction : 5:1 Preview");
        setBestTeamModalVisible(true);
    }

    const onClickThreeByTwoBatter = () => {
        const best11 = bestThreeByTwoBatter(twoTeamStatsDatas);
        for(let b in best11) {
            console.log(`${best11[b].player_name} [${best11[b].player_role}] ${best11[b].team_id} = ${best11[b].sp_total_points}`);
        }
        setBestElevenTeam(teamPreviewModify(best11));
        setPreviewModalTitle("Best analysis Prediction : 3:2 Batters Preview");
        setBestTeamModalVisible(true);
    }

    const onClickThreeByTwoBowler = () => {
        const best11 = bestThreeByTwoBowler(twoTeamStatsDatas);
        for(let b in best11) {
            console.log(`${best11[b].player_name} [${best11[b].player_role}] ${best11[b].team_id} = ${best11[b].sp_total_points}`);
        }
        setBestElevenTeam(teamPreviewModify(best11));
        setPreviewModalTitle("Best analysis Prediction : 3:2 Bowlers Preview");
        setBestTeamModalVisible(true);
    }

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
                <Col xs={24}>
                    <span className='chl-h6-cs'>Best Analysis Prediction :</span>
                    <GradientButton btnText={`10:1 Team`} onClickBtn={()=>onClickTenByOne()} />
                    <GradientButton btnText={`7:4 Team`} onClickBtn={()=>onClickSevenByFour()} />
                    <GradientButton btnText={`5:1 Team`} onClickBtn={()=>onClickFiveByOne()} />
                    <GradientButton btnText={`3:2 Batters`} onClickBtn={()=>onClickThreeByTwoBatter()} />
                    <GradientButton btnText={`3:2 Bowlers`} onClickBtn={()=>onClickThreeByTwoBowler()} />
                    {bestElevenTeam && bestTeamModalVisible ?
                    <TeamPreviewModal
                        visible={bestTeamModalVisible}
                        onClose={() => {
                            setBestTeamModalVisible(false)
                            setBestElevenTeam([]);
                        }}
                        players={bestElevenTeam}
                        modalTitle={previewModalTitle}
                    />
                    : ""
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
                matchType={matchesListData[0].match_format}
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
                matchType={matchesListData[0].match_format}
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