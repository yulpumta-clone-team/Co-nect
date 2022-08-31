import React from 'react';
import PropTypes from 'prop-types';
import * as S from '../SelectInput.style';

SinglePlaceHolder.propTypes = {
  value: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
};

export default function SinglePlaceHolder({ value, placeHolder }) {
  return value ? (
    <S.DisplayValues>
      <span>{value}</span>
    </S.DisplayValues>
  ) : (
    <S.PlaceHolder>{placeHolder}</S.PlaceHolder>
  );
}
