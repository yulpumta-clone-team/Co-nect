import React from 'react';
import handlers from 'mocks/handlers';
import PropTypes from 'prop-types';
import Button from 'components/Common/Button';
import EssentialFormProvider from 'contexts/EssentialForm/EssentialForm.Provider';
import EssentialInfo from './index';
import Nickname from './SubPages/Nickname';
import ProfileImage from './SubPages/ProfileImage';
import SessionJob from './SubPages/SessionJob';
import BelongTeam from './SubPages/BelongTeam';
import Slogan from './SubPages/Slogan';
import Introduction from './SubPages/Introduction';
import Skills from './SubPages/Skills';
import Portfolio from './SubPages/Portfolio';
import * as S from './EssentialInfo.style';

export default {
  title: 'pages/EssentialInfo',
  component: EssentialInfo,
  parameters: {
    msw: handlers,
  },
  layout: 'fullscreen',
};

Template.propTypes = {
  children: PropTypes.node.isRequired,
};

function Template({ children }) {
  return (
    <EssentialFormProvider>
      <S.Layout>
        <S.DialogContainer>
          <Button theme="none" customStyle={S.CloseButton}>
            <S.CloseLarge />
          </Button>
          <S.AngleContainer>
            <Button theme="none" customStyle={S.AngleButton}>
              <S.LeftAngle />
            </Button>
          </S.AngleContainer>
          {children}
        </S.DialogContainer>
      </S.Layout>
    </EssentialFormProvider>
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

export const SessionJobModal = Template.bind({});
SessionJobModal.args = {
  children: <SessionJob />,
};

export const BelongTeamModal = Template.bind({});
BelongTeamModal.args = {
  children: <BelongTeam />,
};

export const SloganModal = Template.bind({});
SloganModal.args = {
  children: <Slogan />,
};

export const IntroductionModal = Template.bind({});
IntroductionModal.args = {
  children: <Introduction />,
};

export const SkillsModal = Template.bind({});
SkillsModal.args = {
  children: <Skills />,
};

export const PortfolioModal = Template.bind({});
PortfolioModal.args = {
  children: <Portfolio />,
};
