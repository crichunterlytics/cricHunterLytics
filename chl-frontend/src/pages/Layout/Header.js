// Header.js
import React from 'react';
import { Layout, Button } from 'antd';
import '../../styles/Header.scss'

const { Header } = Layout;

const AppHeader = () => (
  <Header className="chl-header-root">
    <div className="logo">
      {/* Replace the text with your logo image */}
      <img src="/path/to/logo.png" alt="Logo" />
    </div>
    <div className="auth-buttons">
      <Button type="primary">Sign In</Button>
    </div>
  </Header>
);

export default AppHeader;

