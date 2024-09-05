import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import './PlayerStatsPage.scss';
import StatsTable from './StatsTable';
import SpinnerOverlay from '../components/SpinnerOverlay/SpinnerOverlay';
import { getSeriesTeamsApi } from '../../services/SeriesTeamsApi';
import { modifyPlayerStatsResponse } from "../../utils/modifyPlayerStatsResponse";
import { getPlayersStatsApi } from '../../services/playerStatsApi';

const { Sider, Content } = Layout;

const PlayerStatsPage = ({seriesId, multipleTeamStats, teamId_prop, teamName_prop, matchType}) => {
    const[selectedTeam, setSelectedTeam] = useState("");
    const [spinLoading, setSpinLoading] = useState(false);
    const [teamsListData, setTeamsListData] = useState([]);
    const [playerStatsData, setPlayerStatsData] = useState([]);

    useEffect(() => {
        if(multipleTeamStats) {
          setSelectedTeam(teamId_prop);
          setTeamsListData([{team_shortname:teamName_prop, team_id:teamId_prop}]);
          getPlayerStats(teamId_prop);
        }
        else {
          setSpinLoading(true);
          getTeamsListData();
        }
    }, []);

    const getTeamsListData = async () => {
        try {
            setSpinLoading(false);
          const response = await getSeriesTeamsApi({ series_id: seriesId});
          if (response && response.data) {
            console.log("Series Teams List=",response.data);
            if(response.data.status_code === 200 && response.data.data.length > 0) {
                console.log(response.data.data[0].team_id);
                setSelectedTeam(response.data.data[0].team_id);
                setTeamsListData(response.data.data);
                getPlayerStats(response.data.data[0].team_id)
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

    const getPlayerStats = async (teamId) => {
        try {
          const response = await getPlayersStatsApi({seriesId, teamId });
          const finalData = modifyPlayerStatsResponse(response.data.data, matchType); 
          console.log("team details response= ",finalData)
          setPlayerStatsData(finalData);
        } catch (e) {
            console.log("error=",e)
        }
    };

    const onClickTeamSelect = (teamId) => {
      setSelectedTeam(teamId);
      getPlayerStats(teamId);
    }

  return (
    <>
    <Layout className="player-stats-table">
      <Sider width={100} className="site-layout-background">
        <Menu
          mode="inline"
          selectedKeys={[`${selectedTeam}`]}  // Use selectedKeys instead of defaultSelectedKeys
          style={{ height: '100%', borderRight: 0 }}
          onClick={(e) => onClickTeamSelect(e.key)}
        >
        {teamsListData.map((item) => (
            <Menu.Item key={item.team_id}>{item.team_shortname}</Menu.Item>
        ))}
        </Menu>
      </Sider>
      <Layout>
        <Content
          style={{
            padding: 0,
            margin: 0,
            minHeight: 280,
            background: '#fff',
          }}
        >
          <StatsTable tableData={playerStatsData} />
        </Content>
      </Layout>
    </Layout>
    <SpinnerOverlay spinning={spinLoading}></SpinnerOverlay>  
    </>
  );
};

export default PlayerStatsPage;
