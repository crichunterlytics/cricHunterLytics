import React from 'react';
import { Modal, Row, Col, Avatar, Card } from 'antd';
import './TeamPreviewModal.scss';

const TeamPreviewModal = ({ visible, onClose, players, modalTitle }) => {
  const { wk, batters, allrounders, bowlers, captainName, voiceCaptainName} = players;

  return (
    <Modal
      title={`${modalTitle}`}
      visible={visible}
      onCancel={onClose}
      footer={null}
      className="team-preview-modal"
    >
      <div className="ground-background">
        <div className='player-cvc-cls'>
          <div>C : {captainName}</div>
          <div>VC : {voiceCaptainName}</div>
        </div>
        {/* Wicketkeeper */}
        <Row justify="center" className="player-row">
        <Col xs={24} className="preview-section-title">Wicket Keeper</Col>
          {wk.map((player, index) => (
            <Col key={index} span={4}>
              <Card className="player-card">
                <Avatar src={player.logo} />
                <div className="player-name">{player.name}</div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Batters */}
        <Row justify="space-around" className="player-row">
        <Col xs={24} className="preview-section-title">Batters</Col>
          {batters.map((player, index) => (
            <Col key={index} span={4}>
              <Card className="player-card">
                <Avatar src={player.logo} />
                <div className="player-name">{player.name}</div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Allrounders */}
        <Row justify="space-around" className="player-row">
        <Col xs={24} className="preview-section-title">Allrounders</Col>
          {allrounders.map((player, index) => (
            <Col key={index} span={4}>
              <Card className="player-card">
                <Avatar src={player.logo} />
                <div className="player-name">{player.name}</div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Bowlers */}
        <Row justify="space-around" className="player-row">
        <Col xs={24} className="preview-section-title">Bowlers</Col>
          {bowlers.map((player, index) => (
            <Col key={index} span={4}>
              <Card className="player-card">
                <Avatar src={player.logo} />
                <div className="player-name">{player.name}</div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Modal>
  );
};

export default TeamPreviewModal;
