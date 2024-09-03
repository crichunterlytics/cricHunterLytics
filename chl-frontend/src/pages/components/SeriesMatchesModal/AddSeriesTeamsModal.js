import React, { useState } from 'react';
import { Button } from 'antd';
import SpinnerOverlay from '../SpinnerOverlay/SpinnerOverlay';
import { addSeriesTeamsApi, getExternalSeriesTeamsApi } from '../../../services/SeriesTeamsApi';
import { getInitials } from '../../../utils/getStringInitials';

const AddSeriesTeamsModal = ({seriesId}) => {
  const [spinLoading, setSpinLoading] = useState(false);

  const getSeriesMatches = async () => {
    setSpinLoading(true);
    try {
      const response = await getExternalSeriesTeamsApi({ series_id: seriesId});
      if (response && response.data) {
        console.log("response external series API's=",response.data);
        let modifiedData = [];
            for(let i in response.data.squads) {
                if(!response.data.squads[i].isHeader) {
                    modifiedData.push({...response.data.squads[i]})
                }
            }
            addSeriesTeamsIntoLocal(modifiedData, seriesId);
      }
    } catch (e) {
        setSpinLoading(false);
        console.log("error=",e)
    }
};

const addSeriesTeamsIntoLocal = async (data, sId) => {
  const squadsData = data.map((item) => {
      return {
          teamId: item.teamId,
          team_name: item.squadType,
          imageId: item.imageId,
          squadId: item.squadId,
          seriesId: sId,
          team_image_url: "",
          team_shortname: getInitials(item.squadType)
      }
  })
  try {
    const response = await addSeriesTeamsApi(squadsData);
    if (response && response.data) {
      console.log("Added Squad List =",response.data);
    }
  } catch (e) {
      console.log("error=",e)
  }
};

  return (
    <div>
      {/* Button to open the modal */}
      <Button type="primary" className='add-series-btn' onClick={getSeriesMatches}>
        Add Series Teams
      </Button>
      
      <SpinnerOverlay spinning={spinLoading}></SpinnerOverlay>
    </div>
  );
};

export default AddSeriesTeamsModal;
