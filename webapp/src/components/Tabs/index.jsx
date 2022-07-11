import React from 'react';
import PropTypes from 'prop-types';

import * as S from './style';

Tabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  activeTabId: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default function Tabs({ tabs, activeTabId, setActiveTab }) {
  return (
    <S.Tabs>
      {tabs.map(({ id, title }) => (
        <S.Tab key={id} isActive={id === activeTabId} onClick={() => setActiveTab(id)}>
          {title}
        </S.Tab>
      ))}
    </S.Tabs>
  );
}
