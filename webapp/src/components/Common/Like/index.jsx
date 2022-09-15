import React from 'react';

import PropTypes from 'prop-types';

import * as S from './style';

Like.propTypes = {
  like: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

function Like({ like, onClick }) {
  return <S.Heart src={like ? <S.FilledHeart /> : <S.EmptyHeart />} onClick={onClick} />;
}

export default Like;
