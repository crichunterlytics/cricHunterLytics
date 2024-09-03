import React from 'react';
import { Table, Checkbox, Badge } from 'antd';
import { DISPLAY_PLAYER_SERIES_RUNS, DISPLAY_PLAYER_SERIES_WICKETS, DISPLAY_PLAYING_STYLE } from '../../constants/generalApp';

const StatsTable = ({tableData}) => {
    const renderScoreWithBadge = (score, badgeText) => (
        <div className="score-badge-container">
        <Badge count={badgeText}/>
        <div className="score-text">{score}</div>
        </div>
    );

    const tableColumns = [
        {
        title: '',
        dataIndex: 'battingPositionModify',
        key: 'battingPositionModify',
        },
        {
        title: 'Player Name',
        dataIndex: 'player_name',
        key: 'player_name',
        },
        {
        title: 'Player Style',
        dataIndex: `${DISPLAY_PLAYING_STYLE}`,
        key: `${DISPLAY_PLAYING_STYLE}`,
        },
        {
            title: 'Series Runs',
            dataIndex: `${DISPLAY_PLAYER_SERIES_RUNS}`,
            key: `${DISPLAY_PLAYER_SERIES_RUNS}`,
            render: (performances) => (
            <div>
                {performances.map((performance, index) => (
                    renderScoreWithBadge(performance.value, performance.team)
                ))}
            </div>
            ),
        },
        {
            title: 'Series Wickets',
            dataIndex: `${DISPLAY_PLAYER_SERIES_WICKETS}`,
            key:   `${DISPLAY_PLAYER_SERIES_WICKETS}`,
            render: (performances) => (
            <div>
                {performances.map((performance, index) => (
                    renderScoreWithBadge(performance.value, performance.team)
                ))}
            </div>
            ),
        },
        {
        title: 'Bat',
        dataIndex: 'isMIPBatter',
        key: 'isMIPBatter',
        render: (checked) => (
            <>
            {checked ? 
            <Checkbox checked={checked} className="imp-checkbox" />
            : ""
            }
            </>
        ),
        },
        {
        title: 'Bowl',
        dataIndex: 'isMIPBowler',
        key: 'isMIPBowler',
        render: (checked) => (
            <>
            {checked ? 
            <Checkbox checked={checked} className="imp-checkbox" />
            : ""
            }
            </>
        ),
        },
        {
        title: 'All',
        dataIndex: 'isMIPAllrounder',
        key: 'isMIPAllrounder',
        render: (checked) => (
            <>
            {checked ? 
            <Checkbox checked={checked} className="imp-checkbox" />
            : ""
            }
            </>
        ),
        },
    ];

  return (
  <Table columns={tableColumns} dataSource={tableData} pagination={false} />
  );
};

export default StatsTable;