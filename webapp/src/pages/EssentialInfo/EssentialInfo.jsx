import React, { useCallback, useState } from 'react';
import { Route, Router, Routes, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import authApi from 'api/auth';
import useInput from 'hooks/useInput';
import { SIGN_UP_INFO } from 'constant/route';
import Nickname from './Nickname';
import Skill from './Skill';
import Img from './Img';
import SessionJob from './SessionJob';
import SloganPortfolio from './SloganPortfolio';
import Content from './Content';
import * as S from './style';

export default function EssentialInfo() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const {
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const [userSkill, setUserSkill] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const onSkillChange = useCallback((e) => {
    setUserSkill(e.target.value);
    setSelectedSkills((prev) => [...prev, e.target.value]);
  }, []);
  const [userImg, onImgChange] = useInput('');
  const [mdcontent, setMdContent] = useState('');
  const [hopeSession, onHopeSessionChange] = useInput('무관');
  const [userJob, onJobChange] = useInput('');
  const [userSlogan, onSloganChange] = useInput('');
  const [userPortfolio, onPortfolioChange] = useInput('');
  const [error, setError] = useState({ isError: false, msg: '' });

  const onValid = async (submitData) => {
    const { nickname, skill, slogan } = submitData;
    const signUpInfo = {
      name: nickname,
      content: mdcontent,
      hope_session: hopeSession,
      img: userImg,
      job: userJob,
      portfolio: userPortfolio,
      skills: selectedSkills,
      slogan: userSlogan,
    };
    // TODO: input validation 추가해야 함.

    navigate('/');
  };
  return (
    <S.ModalContainer>
      <S.Backdrop>
        <S.DialogBox>
          <form
            style={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={handleSubmit(onValid)}
          >
            <Routes>
              <Route path="" element={<Nickname register={register} errors={errors} />} />
              <Route
                path={SIGN_UP_INFO.SKILL}
                element={
                  <Skill
                    userSkill={userSkill}
                    onSkillChange={onSkillChange}
                    selectedSkills={selectedSkills}
                  />
                }
              />
              <Route
                path={SIGN_UP_INFO.IMG}
                element={<Img userImg={userImg} onImgChange={onImgChange} />}
              />
              <Route
                path={SIGN_UP_INFO.SESSION_JOB}
                element={
                  <SessionJob
                    hopeSession={hopeSession}
                    onHopeSessionChange={onHopeSessionChange}
                    userJob={userJob}
                    onJobChange={onJobChange}
                  />
                }
              />
              <Route
                path={SIGN_UP_INFO.SLOGAN_PORTFOLIO}
                element={
                  <SloganPortfolio
                    userPortfolio={userPortfolio}
                    onPortfolioChange={onPortfolioChange}
                    userSlogan={userSlogan}
                    onSloganChange={onSloganChange}
                  />
                }
              />
              <Route
                path={SIGN_UP_INFO.CONTENT}
                element={<Content mdcontent={mdcontent} setMdContent={setMdContent} />}
              />
            </Routes>
          </form>
        </S.DialogBox>
      </S.Backdrop>
    </S.ModalContainer>
  );
}
