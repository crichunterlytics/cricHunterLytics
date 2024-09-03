import React, { useState } from 'react';
import { Button } from 'antd';
import SpinnerOverlay from '../SpinnerOverlay/SpinnerOverlay';
import { addTeamSquadPlayers, getExternalTeamSquadApi } from '../../../services/SeriesTeamsApi';

const AddTeamSquadModal = ({seriesId, squadId, teamId}) => {
  const [spinLoading, setSpinLoading] = useState(false);

  const getTeamSquad = async () => {
    setSpinLoading(true);
    try {
      const response = await getExternalTeamSquadApi({ series_id: seriesId, squad_id: squadId});
      if (response && response.data) {
        console.log("response external Team Squad API's=",response.data);
        addSeriesTeamsSquad(response.data.player);  
      }
      else {
        setSpinLoading(false);
      }
    } catch (e) {
        setSpinLoading(false);
        console.log("error=",e)
    }
};

const addSeriesTeamsSquad = async (plData) => {
  let playersData = [];
  let addedPlayers = [];
  plData.map((item) => {
      if(!item.isHeader) {
          if(addedPlayers.indexOf(item.id) === -1) {
              addedPlayers.push(item.id);
              playersData.push({
                  seriesId: seriesId,
                  squadId: squadId,
                  teamId: teamId,
                  playerId: item.id,
                  playerName: item.name,
                  playerRole: item.role ? item.role : '',
                  playerImageId: item.imageId,
                  playerBatStyle: item.battingStyle ? item.battingStyle : '',
                  playerBowlStyle: item.bowlingStyle ? item.bowlingStyle : '',
              })
          }
      }
  });

  console.log("Players Data =", playersData);
  try {
      const response = await addTeamSquadPlayers(playersData);
      console.log("Added player response=", response);
      setSpinLoading(false);
  } catch (e) {
      console.log("error=",e)
      setSpinLoading(false);
  }
};

  return (
    <div>
      {/* Button to open the modal */}
      <Button type="primary" className='add-series-btn' onClick={getTeamSquad}>
        Add Team Squad
      </Button>
      
      <SpinnerOverlay spinning={spinLoading}></SpinnerOverlay>
    </div>
  );
};

export default AddTeamSquadModal;
