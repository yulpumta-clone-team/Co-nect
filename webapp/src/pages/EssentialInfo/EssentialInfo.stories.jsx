import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Common/Button';
import EssentialInfo from './index';
import Nickname from './Nickname';
import ProfileImage from './ProfileImage';
import * as S from './EssentialInfo.style';

export default {
  title: 'pages/EssentialInfo',
  component: EssentialInfo,
  layout: 'fullscreen',
};

Template.propTypes = {
  children: PropTypes.node.isRequired,
};

function Template({ children }) {
  return (
    <S.Layout>
      <S.DialogContainer>
        <Button theme="none" customStyle={S.CloseButton}>
          <S.CloseLarge />
        </Button>
        <S.AngleContainer>
          <Button theme="none" customStyle={S.AngleButton}>
            <S.LeftAngle />
          </Button>
          <Button theme="none" customStyle={S.AngleButton}>
            <S.RightAngle />
          </Button>
        </S.AngleContainer>
        <S.Form>{children}</S.Form>
      </S.DialogContainer>
    </S.Layout>
  );
}

export const NicknameModal = Template.bind({});
NicknameModal.args = {
  children: <Nickname />,
};

export const ProfileImageModal = Template.bind({});
ProfileImageModal.args = {
  children: <ProfileImage />,
};
