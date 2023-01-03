import React from 'react';
import PropTypes from 'prop-types';

import * as S from './Tabs.style';

Tabs.propTypes = {
  type: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  activeId: PropTypes.string.isRequired,
  onClickTab: PropTypes.func.isRequired,
};

export default function Tabs({ type, tabs, activeId, onClickTab }) {
  return (
    <S.Tabs>
      {tabs.map(({ id, title }) => (
        <S.Tab key={id} isActive={id === activeId} onClick={() => onClickTab(type, id)}>
          {title}
        </S.Tab>
      ))}
    </S.Tabs>
  );
}
