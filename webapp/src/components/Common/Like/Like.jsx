import React, { useState } from 'react';

import BlueHeartIcon from 'assets/icons/blue-heart.svg';
import FullHeartIcon from 'assets/icons/full-heart.svg';

import PropTypes from 'prop-types';

import * as S from './style';

Like.propTypes = {
  like: PropTypes.bool.isRequired,
  toggleLike: PropTypes.func.isRequired,
};

export default function Like({ like, toggleLike }) {
  return <S.Heart src={like ? FullHeartIcon : BlueHeartIcon} onClick={toggleLike} />;
}
