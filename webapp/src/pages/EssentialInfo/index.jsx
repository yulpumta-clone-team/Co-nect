import React, { useCallback, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SIGN_UP_INFO } from 'constant/route';
import { updateUserInfo } from 'service/auth';
import authApi from 'api/auth.api';
import Button from 'components/Common/Button';
import Nickname from './Nickname';
import Skill from './Skill';
import Slogan from './Slogan';
import SessionJob from './SessionJob';
import ProfileImage from './ProfileImage';
import Content from './Content';
import BelongTeam from './BelongTeam';
import * as S from './EssentialInfo.style';

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
      image: '',
      portfolio: '',
    },
  });
  // 팀 소속 여부
  const [isTeamBelong, setIsTeamBelong] = useState(false);
  const onChecked = () => {
    setIsTeamBelong((prev) => !prev);
  };
  // 기술
  const [skillId, setSkillId] = useState('');
  const [userSkill, setUserSkill] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const onSkillChange = useCallback((e) => {
    setUserSkill(e.target.id);
    setSelectedSkills((prev) => [...prev, e.target.value]);
  }, []);
  // 공고글 (내용)
  const [mdcontent, setMdContent] = useState('');
  // api error
  const [apiError, setApiError] = useState({ isError: false, msg: '' });
  // form 제출 시 작동
  const onValid = async (submitData) => {
    const { nickname, userSkill, slogan, image, portfolio, hopeSession, userJob, isTeamBelong } =
      submitData;

    const signUpInfo = {
      name: nickname,
      portfolio,
      slogan,
      content: mdcontent,
      image,
      hope_session: hopeSession,
      job: userJob,
      skills: userSkill,
      status: isTeamBelong,
    };
    // TODO: input validation 추가해야 함.
    try {
      const response = await authApi.POST_ESSENTIAL_INFO(signUpInfo);
      console.log(response);
    } catch (apiError) {
      console.error(apiError);
      setApiError({
        isError: true,
        msg: apiError,
      });
    }
    try {
      const response = await authApi.GET_ESSENTIAL_INFO();
      console.log(response);
      updateUserInfo({
        userId: response.data.id,
        profileImg: response.data.image,
        name: response.data.name,
      });
      navigate('/');
    } catch (apiError) {
      console.error(apiError);
      setApiError({
        isError: true,
        msg: apiError,
      });
    }
  };
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
        <S.Form onSubmit={handleSubmit(onValid)}>
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
                  id={skillId}
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
              element={<BelongTeam onChecked={onChecked} isTeamBelong={isTeamBelong} />}
            />
            <Route
              path={SIGN_UP_INFO.IMG_PORTFOLIO}
              element={
                <ProfileImage
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
        </S.Form>
      </S.DialogContainer>
    </S.Layout>
  );
}
