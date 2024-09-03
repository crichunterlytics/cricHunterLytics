import React, { useState } from 'react';
import { Button } from 'antd';
import SpinnerOverlay from '../SpinnerOverlay/SpinnerOverlay';
import { addMatchScorecardApi, getExternalMatchScorecardApi } from '../../../services/playerStatsApi';

const AddTeamSquadModal = ({matchId}) => {
  const [spinLoading, setSpinLoading] = useState(false);

const getMatchScorecard = async () => {
  setSpinLoading(true);
  try {
    const response = await getExternalMatchScorecardApi({ match_id: matchId});
    if (response && response.data) {
      console.log("match scorecard response=",response.data);
      modifyMatchScorecardResponse(response.data);
    }
  } catch (e) {
    setSpinLoading(false);
      console.log("error=",e)
  }
};

const modifyMatchScorecardResponse = (data) => {
  let playersData = {};
  if(data.scoreCard) {
      data.scoreCard.map((item) => {
          console.log(item)
          console.log(item.batTeamDetails.batsmenData);

          Object.keys(item.batTeamDetails.batsmenData).map((btKey, index) => {
              const btItem = item.batTeamDetails.batsmenData[btKey];
              if(!playersData[`${btItem.batId}`]) {
                  playersData[`${btItem.batId}`] =  {
                      // matchType: data.matchHeader.matchFormat,
                      series_id: data.matchHeader.seriesId,
                      match_id: data.matchHeader.matchId,
                      team_id: item.batTeamDetails.batTeamId,
                      player_id: btItem.batId,
                      is_captain: btItem.isCaptain ? 1 : 0,
                      is_keeper: btItem.isKeeper? 1 : 0,
                      match_run: btItem.runs,    
                      played_ball: btItem.balls,
                      played_dot:btItem.dots,
                      total_four:btItem.fours,
                      total_six: btItem.sixes,
                      match_strikerate: btItem.strikeRate,
                      lastmatch_batposition: index+1,
                      opposite_teamname: item.bowlTeamDetails.bowlTeamName                          
                  }
              }
              else {
                  console.log("*****Already available ****** =",btItem.batName );
                  console.log("btItem.batName=",btItem.batId);
                  playersData[`${btItem.batId}`] =  {
                      ...playersData[`${btItem.batId}`],
                      match_run: btItem.runs,
                      played_ball: btItem.balls,
                      played_dot:btItem.dots,
                      total_four:btItem.fours,
                      total_six: btItem.sixes,
                      match_strikerate: btItem.strikeRate,
                      lastmatch_batposition: index+1,
                      opposite_teamname: item.batTeamDetails.batTeamName
                  }
              }
          })

          Object.keys(item.bowlTeamDetails.bowlersData).map((bwKey, index) => {
              const bwItem = item.bowlTeamDetails.bowlersData[bwKey];
              if(!playersData[`${bwItem.bowlerId}`]) {
                  playersData[`${bwItem.bowlerId}`] =  {
                      series_id: data.matchHeader.seriesId,
                      match_id: data.matchHeader.matchId,
                      team_id: item.bowlTeamDetails.bowlTeamId,
                      player_id: bwItem.bowlerId,
                      is_captain: bwItem.isCaptain ? 1 : 0,
                      is_keeper: bwItem.isKeeper? 1 : 0,
                      total_over_bowled:bwItem.overs,
                      maidens:bwItem.maidens,
                      given_runs:bwItem.runs,
                      total_wicket_taken:bwItem.wickets,
                      bowling_economy:bwItem.economy,
                      total_balls_bowled: bwItem.balls,
                      opposite_teamname: item.batTeamDetails.batTeamName           
                  }
              }
              else {
                  console.log("*****Bowler Already available ****** =",bwItem );
                  console.log("btItem.batName=",bwItem.bowlerId);
                  playersData[`${bwItem.bowlerId}`] =  {
                      ...playersData[`${bwItem.bowlerId}`],
                      total_over_bowled:bwItem.overs,
                      maidens:bwItem.maidens,
                      given_runs:bwItem.runs,
                      total_wicket_taken:bwItem.wickets,
                      bowling_economy:bwItem.economy,
                      total_balls_bowled: bwItem.balls,
                      opposite_teamname: item.batTeamDetails.batTeamName
                  }
              }
          })
      });
      console.log("playersData=",playersData);
      const requestData = Object.keys(playersData).map((key) => playersData[key]);
      console.log(requestData)
      // Get the top 3 players in each category
      addMatchPlayerDetails(requestData);
  }
}

const addMatchPlayerDetails = async(playersData) => {
  try {
      const response = await addMatchScorecardApi(playersData);
      setSpinLoading(false);
      console.log("Add player response=", response);
  } catch (e) {
      setSpinLoading(false);
      console.log("error=",e)
  }
}

  return (
    <div>
      {/* Button to open the modal */}
      {/* <Button type="primary" className='add-series-btn' onClick={getMatchScorecard}>
        Add Match Stats
      </Button> */}
      <div className="match-stats-label" onClick={getMatchScorecard}>Add Match Stats</div>
      <SpinnerOverlay spinning={spinLoading}></SpinnerOverlay>
    </div>
  );
};

export default AddTeamSquadModal;
