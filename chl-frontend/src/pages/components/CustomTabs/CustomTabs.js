import React, { useState } from 'react';
import './CustomTabs.scss'; // Make sure to style your tabs accordingly

const CustomTabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="custom-tabs">
      <div className="tab-titles">
        {React.Children.map(children, (child, index) => (
          <div
            className={`tab-title ${index === activeTab ? 'active' : ''}`}
            onClick={() => {
                child.props.onSetActiveTab(children[index].key)
                setActiveTab(index);
            }}
            key={index}
          >
            {child.props.tab}
          </div>
        ))}
      </div>
      <div className="tab-content">
        {React.Children.toArray(children)[activeTab].props.children}
      </div>
    </div>
  );
};

const CustomTab = ({ children }) => {
  return <>{children}</>;
};

export { CustomTabs, CustomTab };
