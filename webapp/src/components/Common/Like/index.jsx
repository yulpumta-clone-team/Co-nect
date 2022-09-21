import React from 'react';

import PropTypes from 'prop-types';

import BlueHeartIcon from 'assets/icons/blue-heart.svg';
import FullHeartIcon from 'assets/icons/full-heart.svg';

import * as S from './style';

Like.propTypes = {
  like: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default function Like({ like, onClick }) {
  return <S.Heart src={like ? FullHeartIcon : BlueHeartIcon} onClick={onClick} />;
}
