import React, { useState } from 'react';
import { Button } from 'antd';
import { addSeriesMatchesApi, getExternalSeriesMatchesApi } from '../../../services/seriesMatchesApi';
import SpinnerOverlay from '../SpinnerOverlay/SpinnerOverlay';

const AddSeriesMatchesModal = ({seriesId}) => {
  const [spinLoading, setSpinLoading] = useState(false);

  const getSeriesMatches = async () => {
    setSpinLoading(true);
    try {
      const response = await getExternalSeriesMatchesApi({ series_id: seriesId});
      if (response && response.data) {
        console.log("response external series API's=",response.data);
        modifySeriesMatchResponse(response.data);
      }
    } catch (e) {
        setSpinLoading(false);
        console.log("error=",e)
    }
};

const modifySeriesMatchResponse = (data) => {
    let matchesData = [];
    if(data.matchDetails) {
        data.matchDetails.map((item) => {
            if(item.matchDetailsMap) {
                let matchD = item.matchDetailsMap;
                let match_obj = {
                    date_display_text: matchD.key
                }
                for(let m in matchD.match) {
                    const md = matchD.match[m].matchInfo;
                    match_obj = {
                        ...match_obj,
                        series_id: md.seriesId,
                        match_id: md.matchId,
                        match_number_text: md.matchDesc,
                        match_format: md.matchFormat,
                        start_date: md.startDate,
                        end_date: md.endDate,
                        team1_id: md.team1.teamId,
                        team1_name: md.team1.teamName,
                        team1_shortname: md.team1.teamSName,
                        team1_imageid: md.team1.imageId,
                        team2_id: md.team2.teamId,
                        team2_name: md.team2.teamName,
                        team2_shortname: md.team2.teamSName,
                        team2_imageid: md.team2.imageId,
                        ground_id: md.venueInfo.id,
                        ground_name: md.venueInfo.ground,
                        ground_city: md.venueInfo.city
                    }
                    matchesData.push(match_obj);
                }
            }
        });
        // setMatchesListData(teamData);
        console.log("matchesData=",matchesData);
        addSeriesMatches(matchesData)
    }
    else {
        setSpinLoading(false);
    }
}

const addSeriesMatches = async (data) => {
    try {
        setSpinLoading(false);
        const response = await addSeriesMatchesApi(data);
        if (response && response.data) {
          console.log("Success Add series Matches Response=",response.data);
        }
      } catch (e) {
        setSpinLoading(false);
        console.log("error=",e)
      }
};

  return (
    <div>
      {/* Button to open the modal */}
      <Button type="primary" className='add-series-btn' onClick={getSeriesMatches}>
        Add Series Matches
      </Button>
      
      <SpinnerOverlay spinning={spinLoading}></SpinnerOverlay>
    </div>
  );
};

export default AddSeriesMatchesModal;
