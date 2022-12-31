import React from 'react';
import PropTypes from 'prop-types';
import MainLogoImage from 'assets/images/main-logo.png';
import Image from 'components/Common/Image';
import SimpleListComponent from 'hoc/SimpleListComponent';
import * as S from './Spinner.style';

Spinner.propTypes = {
  withLogo: PropTypes.bool,
  isFullPage: PropTypes.bool,
};

export default function Spinner({ withLogo = false, isFullPage = false }) {
  return (
    <S.Container isFullPage={isFullPage}>
      {withLogo && <Image alt="main logo" src={MainLogoImage} customStyle={S.MainLogo} />}
      <S.RippleSpinner>
        <SimpleListComponent Component={Div} idx={12} />
      </S.RippleSpinner>
    </S.Container>
  );
}

function Div() {
  return <div />;
}
