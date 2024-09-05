import React from 'react';
import { Card } from 'antd';
import './MatchCard.scss'; // Assuming you want to style it with SCSS
import AddTeamSquadModal from '../components/SeriesMatchesModal/AddTeamSquadModal';

const TeamCard = ({ 
    teamLogo, 
    teamName,
    seriesId,
    squadId,
    teamId,
    displayTeamSquadBtn
}) => {
    return (
        <>
        <Card className="match-card" bordered={false}>
            <div className="match-info">
                <div className="team">
                    <img src={teamLogo} alt={`${teamName} logo`} className="team-logo" />
                    <span className="team-name">{teamName}</span>
                </div>
            </div>
            {/* {displayTeamSquadBtn &&  */}
            <div className='display-btn-right-cornor'>
                <AddTeamSquadModal 
                seriesId={seriesId}
                squadId={squadId}
                teamId={teamId}
                />
            </div>
            {/* */}
        </Card>
        </>
    );
};

export default TeamCard;
