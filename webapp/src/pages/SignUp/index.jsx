import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes, useNavigate } from 'react-router-dom';
import IdPassword from './IdPassword';
import Nickname from './Nickname';
import Skill from './Skill';
import Img from './Img';
import SessionJob from './SessionJob';
import SloganPortfolio from './SloganPortfolio';
import Content from './Content';
import ModalHeader from './ModalHeader/ModalHeader';
import * as S from './style';

export default function SignUp() {
  const navigate = useNavigate();
  return (
    <S.ModalContainer>
      <S.Backdrop>
        <S.DialogBox>
          <button onClick={() => navigate('/')}>x</button>
          <ModalHeader />
          <Routes>
            <Route path="" element={<IdPassword />} />
            <Route path="nickname" element={<Nickname />} />
            <Route path="skill" element={<Skill />} />
            <Route path="img" element={<Img />} />
            <Route path="session-job" element={<SessionJob />} />
            <Route path="slogan-portfolio" element={<SloganPortfolio />} />
            <Route path="content" element={<Content />} />
          </Routes>
        </S.DialogBox>
      </S.Backdrop>
    </S.ModalContainer>
  );
}
