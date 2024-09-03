import React from 'react';
import { Card, Badge } from 'antd';
import './MatchCard.scss'; // Assuming you want to style it with SCSS
import AddTeamSquadModal from '../components/SeriesMatchesModal/AddMatchStats';
const { Ribbon } = Badge;

const MatchCard = ({ 
    team1Logo, 
    team1Name, 
    team2Logo, 
    team2Name, 
    matchDate, 
    matchResult,
    matchId, 
    groundName, 
    cityName, 
    matchStatus,
    matchType,
    viewTeamsSeriesPerformance,
    hide_view_match_stats,
    hide_add_match_stats
}) => {
    return (
        <Ribbon text={matchType} placement="start" className='match-type-label'> {/* You can change the color as needed */}
            <Card className="match-card" bordered={false}>
                {matchStatus && <div className={`match-label ${matchStatus.toLowerCase().replace(/\s+/g, '-')}`}>{matchStatus}</div>}
                {hide_view_match_stats ? "" : <div className={`match-stats-label`} onClick={viewTeamsSeriesPerformance}>View Both Teams Series Performance</div>}
                {hide_add_match_stats ? "" : <AddTeamSquadModal matchId={matchId} />}
                <div className="match-info">
                    <div className="team">
                        {/* <img src={team1Logo} alt={`${team1Name} logo`} className="team-logo" /> */}
                        <span className="team-name">{team1Name}</span>
                    </div>
                    <span className="vs-text">Vs</span>
                    <div className="team">
                        {/* <img src={team2Logo} alt={`${team2Name} logo`} className="team-logo" /> */}
                        <span className="team-name">{team2Name}</span>
                    </div>
                </div>
                <div className="match-location">{`${groundName}, ${cityName}`}</div>
                <div className="match-date">{matchDate}</div>
                <div className="match-result">{matchResult}</div>
            </Card>
        </Ribbon>
    );
};

export default MatchCard;
