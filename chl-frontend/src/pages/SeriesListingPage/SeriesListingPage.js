import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';
import SeriesCard from './SeriesCard';
import './SeriesListingPage.scss';
import { DEFAULT_SERIES_TYPE, SERIES_TYPE_STR } from '../../constants/generalApp';
import { getSeriesListApi } from '../../services/seriesApis';
import { CustomTab, CustomTabs } from '../components/CustomTabs/CustomTabs.js';
import { FormatDate } from '../../utils/FormatDate';
import AddNewSeriesModal from './AddNewSeriesModal';
import SpinnerOverlay from '../components/SpinnerOverlay/SpinnerOverlay';
import { useNavigate } from 'react-router-dom';
import { SERIES_DETAILS_VIEW_ROUTE } from '../../constants/routes';

const SeriesListingPage = () => {
  const navigate = useNavigate();
  const [activeSeriesType, setActiveSeriesType] = useState(DEFAULT_SERIES_TYPE);
  const [seriesListData, setSeriesListData] = useState([]);
  const [spinLoading, setSpinLoading] = useState(false);

  useEffect(() => {
    setSpinLoading(true);
    getSeriesListData(activeSeriesType);
  }, []);

  // Get Series List from database
  const getSeriesListData = async (series_type) => {
    try {
      const response = await getSeriesListApi({ series_type });
      setSpinLoading(false);
      if (response && response.data) {
        console.log("Series List Response=",response.data);
        if(response.data.status_code === 200) {
          let resDbj = {};
          for(let k in response.data.data) {
            let rd = response.data.data[k];
            if(resDbj[rd['series_header_text']]) {
              resDbj[rd['series_header_text']] = {
                series_list: [...resDbj[rd['series_header_text']].series_list, rd],
                series_header_text: rd['series_header_text'],
              }
            }
            else {
              resDbj[rd['series_header_text']] = {
                series_list: [rd],
                series_header_text: rd['series_header_text'],
              }
            }
          }
          console.log("resDbj=",resDbj)
          const resData = Object.keys(resDbj).map((item) => {
            return {...resDbj[item]}
          })
          console.log(resData)
          setSeriesListData(resData);
        }
        else {
          setSeriesListData([]);
          setSpinLoading(false);
        }
      }
    } catch (e) {
        console.log("error=",e)
    }
  };

  const onClickTabChange = (type) => {
    setSpinLoading(true);
    setActiveSeriesType(type);
    getSeriesListData(type);
  };

  const onNewSeriesAdded = (sT) => {
    setSpinLoading(false);
    // setActiveSeriesType(sT);
    // getSeriesListData(sT);
  }

  //On click Select Card to view Series Details View
  const onSeriesSelect = (seriesData) => {
    navigate(`/${SERIES_DETAILS_VIEW_ROUTE}/${seriesData.series_id}/${seriesData.start_date}/${seriesData.end_date}/${seriesData.series_name}`);
  }

  return (
    <div className="series-listing-page">
      <Row>
        <Col xs={20}></Col>
        <Col xs={4}>
          <AddNewSeriesModal onNewSeriesAdded={(stype)=>onNewSeriesAdded(stype)}/>
        </Col>
      </Row>
      <CustomTabs>
        {Object.keys(SERIES_TYPE_STR).map((tabKey) => (
          <CustomTab 
            key={tabKey} 
            tab={SERIES_TYPE_STR[tabKey]}
            onSetActiveTab={(t)=>onClickTabChange(t)}
          >
            <></>
          </CustomTab>
        ))}
      </CustomTabs>
      {seriesListData.length > 0 ? 
          seriesListData.map((item, index) => (
            <Row key={index} style={{ marginBottom: '10px', marginTop: '10px'}}>
              <Col xs={24}>
                <Card title={item.series_header_text}>
                  <Row gutter={[24, 24]}>
                    {item.series_list.map((series, idx) => (
                      <Col xs={24} sm={12} md={8} key={idx}>
                        <SeriesCard
                          onClickSeries={()=>onSeriesSelect(series)}
                          seriesName={series.series_name}
                          startDate={FormatDate(series.start_date)}
                          endDate={FormatDate(series.end_date)}
                        />
                      </Col>
                    ))}
                  </Row>
                </Card>
              </Col>
            </Row>
          ))
        : <p>Loading...</p>
      }
      <SpinnerOverlay spinning={spinLoading}></SpinnerOverlay>  
    </div>
  );
};

export default SeriesListingPage;
