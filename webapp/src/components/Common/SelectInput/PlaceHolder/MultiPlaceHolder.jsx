import React from 'react';
import PropTypes from 'prop-types';
import XMarkSvg from 'assets/icons/XMarkSvg';
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
          <S.XMarkButton onClick={() => handleClickTargetDelete({ targetValue: value })}>
            <XMarkSvg />
          </S.XMarkButton>
        </S.DisplaySingleValue>
      ))}
    </S.DisplayValues>
  ) : (
    <S.PlaceHolder>{placeHolder}</S.PlaceHolder>
  );
}
