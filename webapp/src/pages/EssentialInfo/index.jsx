import React, { useCallback, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SIGN_UP_INFO } from 'constant/route';
import Nickname from './Nickname';
import Skill from './Skill';
import Slogan from './Slogan';
import SessionJob from './SessionJob';
import ImgPortfolio from './ImgPortfolio';
import Content from './Content';
import * as S from './style';
import BelongTeam from './BelongTeam';

export default function EssentialInfo() {
  const navigate = useNavigate();
  const {
    getFieldState,
    register,
    formState,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      nickname: '',
      slogan: '',
      skill: '',
      hopeSession: '',
      userJob: '',
      belongTeam: '',
      img: '',
      portfolio: '',
    },
  });
  // 기술
  const [userSkill, setUserSkill] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const onSkillChange = useCallback((e) => {
    setUserSkill(e.target.value);
    setSelectedSkills((prev) => [...prev, e.target.value]);
  }, []);
  // 공고글 (내용)
  const [mdcontent, setMdContent] = useState('');
  // form 제출 시 작동
  const onValid = async (submitData) => {
    const { nickname, skill, slogan, img, portfolio, hopeSession, userJob, belongTeam } =
      submitData;

    const signUpInfo = {
      value: {
        name: nickname,
        content: mdcontent,
        hope_session: hopeSession,
        img,
        job: userJob,
        belong_team: belongTeam,
        portfolio,
        skills: selectedSkills,
        slogan,
      },
    };
    // TODO: input validation 추가해야 함.

    navigate('/');
    console.log(signUpInfo);
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
              <Route
                path=""
                element={
                  <Nickname
                    register={register}
                    errors={errors}
                    getFieldState={getFieldState}
                    formState={formState}
                  />
                }
              />
              <Route
                path={SIGN_UP_INFO.SKILL}
                element={
                  <Skill
                    userSkill={userSkill}
                    onSkillChange={onSkillChange}
                    errors={errors}
                    selectedSkills={selectedSkills}
                  />
                }
              />
              <Route
                path={SIGN_UP_INFO.SLOGAN}
                element={
                  <Slogan
                    register={register}
                    errors={errors}
                    getFieldState={getFieldState}
                    formState={formState}
                  />
                }
              />
              <Route
                path={SIGN_UP_INFO.SESSION_JOB}
                element={
                  <SessionJob
                    register={register}
                    getFieldState={getFieldState}
                    formState={formState}
                    errors={errors}
                  />
                }
              />
              <Route
                path={SIGN_UP_INFO.BELONG_TEAM}
                element={
                  <BelongTeam
                    register={register}
                    errors={errors}
                    getFieldState={getFieldState}
                    formState={formState}
                  />
                }
              />
              <Route
                path={SIGN_UP_INFO.IMG_PORTFOLIO}
                element={
                  <ImgPortfolio
                    register={register}
                    errors={errors}
                    getFieldState={getFieldState}
                    formState={formState}
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
