import React from 'react';
import { Layout, Row, Col } from 'antd';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';
import '../../styles/Footer.scss';

const { Footer } = Layout;

const AppFooter = () => (
  <Footer className="app-footer">
    <Row justify="space-between" className="footer-content">
      <Col xs={24} sm={12} md={6}>
        <h3>Contact Us</h3>
        <p>1234 Fantasy Cricket Lane</p>
        <p>City, State, 12345</p>
        <p>Email: contact@fantasycricket.com</p>
      </Col>
      <Col xs={24} sm={12} md={12}>
        <p className="footer-paragraph">
          Welcome to our Fantasy Cricket Platform, where you can manage and analyze your dream team.
          Enjoy our features to improve your gameplay and stay ahead in the league.
        </p>
      </Col>
      <Col xs={24} sm={12} md={6} className="social-media-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FacebookOutlined />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <TwitterOutlined />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <InstagramOutlined />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <LinkedinOutlined />
        </a>
      </Col>
    </Row>
    <Row justify="center" className="footer-copyright">
      <Col>
        <p>&copy; 2024 Fantasy Cricket. All Rights Reserved.</p>
      </Col>
    </Row>
  </Footer>
);

export default AppFooter;
