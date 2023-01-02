import React from 'react';
import BackButton from 'components/Common/BackButton';
import UpperButton from 'components/Common/UpperButton';
import NewTeamPostDetail from './NewTeamPostDetail';
import * as S from './NewTeamPost.style';

export default function NewTeamPost() {
  return (
    <S.Container>
      <BackButton />
      <NewTeamPostDetail />
      <UpperButton />
    </S.Container>
  );
}
