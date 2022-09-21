import React from 'react';

import PropTypes from 'prop-types';

import BlueHeartIcon from 'assets/icons/blue-heart.svg';
import RedHeartIcon from 'assets/icons/red-heart.svg';

import * as S from './style';

Like.propTypes = {
  like: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default function Like({ like, onClick }) {
  return <S.Heart src={like ? RedHeartIcon : BlueHeartIcon} onClick={onClick} />;
}
