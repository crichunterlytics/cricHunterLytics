import React from 'react';
import { Spin } from 'antd';
import './SpinnerOverlay.scss'; // Optional: for custom styling

const SpinnerOverlay = ({ spinning }) => {
  return (
    <div className={`spinner-overlay ${spinning ? 'active' : ''}`}>
      <Spin size="large" />
    </div>
  );
};

export default SpinnerOverlay;
