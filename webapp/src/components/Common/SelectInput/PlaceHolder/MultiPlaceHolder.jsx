import React from 'react';
import PropTypes from 'prop-types';
import * as S from '../SelectInput.style';

MultiPlaceHolder.propTypes = {
  values: PropTypes.array.isRequired,
  placeHolder: PropTypes.string.isRequired,
  handleClickTargetDelete: PropTypes.func.isRequired,
};

export default function MultiPlaceHolder({ values, placeHolder, handleClickTargetDelete }) {
  const isValues = values.length !== 0;

  return isValues ? (
    <S.DisplayValues>
      {values.map((value) => (
        <S.DisplaySingleValue key={value}>
          <span>{value}</span>
          <S.CloseNormal onClick={() => handleClickTargetDelete({ targetValue: value })} />
        </S.DisplaySingleValue>
      ))}
    </S.DisplayValues>
  ) : (
    <S.PlaceHolder>{placeHolder}</S.PlaceHolder>
  );
}
