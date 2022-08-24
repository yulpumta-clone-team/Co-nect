import React from 'react';
import PropTypes from 'prop-types';
import * as S from './SelectInput.style';

MultiPlaceHolder.propTypes = {
  values: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
};

export default function MultiPlaceHolder({ values, label }) {
  const isValues = values.length !== 0;

  return isValues ? (
    <S.DisplayValues>
      {values.map((value) => (
        <S.DisplaySingleValue>
          <span>{value}</span>
          <S.CloseNormal />
        </S.DisplaySingleValue>
      ))}
    </S.DisplayValues>
  ) : (
    <S.Label>{label}</S.Label>
  );
}
