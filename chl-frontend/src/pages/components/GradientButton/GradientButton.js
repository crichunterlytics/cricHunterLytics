import React from 'react';
import { Button } from 'antd';
import './GradientButton.scss'; // Import the custom CSS

const GradientButton = ({btnText, onClickBtn}) => (
  <Button className="gradient-button" onClick={()=>onClickBtn()}>
    {btnText}
  </Button>
);

export default GradientButton;
