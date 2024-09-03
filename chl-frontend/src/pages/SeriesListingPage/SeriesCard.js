import React from 'react';
import { Card } from 'antd';
import './SeriesCard.scss';

const { Meta } = Card;

const SeriesCard = ({ seriesName, startDate, endDate, onClickSeries}) => (
  <Card
    onClick={onClickSeries}
    hoverable
    className="series-card"
    bordered={false}
  >
    <Meta title={seriesName} description={`From ${startDate} To ${endDate}`} />
  </Card>
);

export default SeriesCard;
