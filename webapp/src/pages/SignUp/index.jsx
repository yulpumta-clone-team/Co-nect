import React, { useCallback, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { handleFetcher } from 'utils';
import authApi from 'api/auth';
import useInput from 'hooks/useInput';
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
  const { register, handleSubmit } = useForm();
  const {
    setError,
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

  const onValid = async (submitData) => {
    const { email, nickname, password, verifiedPassword } = submitData;
    if (password !== verifiedPassword) {
      setError('verifiedPassword', { message: 'Password is not same' }, { shouldFocus: true });
    }
    const signUpInfo = {
      email,
      name: nickname,
      pwd: password,
      content: mdcontent,
      hope_session: hopeSession,
      img: userImg,
      job: userJob,
      portfolio: userPortfolio,
      skills: selectedSkills,
      slogan: userSlogan,
    };
    // TODO: input validation 추가해야 함.
    const { value, error, isError } = await handleFetcher(authApi.POST_SIGN_UP, signUpInfo);
    if (isError) {
      console.log(error);
      return;
    }
    console.log(signUpInfo);
    navigate('/login');
  };
  return (
    <S.ModalContainer>
      <S.Backdrop>
        <S.DialogBox>
          <button onClick={() => navigate('/')}>x</button>
          <form
            style={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={handleSubmit(onValid)}
          >
            <ModalHeader />
            <Routes>
              <Route path="" element={<IdPassword register={register} errors={errors} />} />
              <Route path="nickname" element={<Nickname register={register} errors={errors} />} />
              <Route
                path="skill"
                element={
                  <Skill
                    userSkill={userSkill}
                    onSkillChange={onSkillChange}
                    selectedSkills={selectedSkills}
                  />
                }
              />
              <Route
                path="img"
                element={<Img userImg={userImg} onImgChange={onImgChange} errors={errors} />}
              />
              <Route
                path="session-job"
                element={<SessionJob register={register} errors={errors} />}
              />
              <Route
                path="slogan-portfolio"
                element={<SloganPortfolio register={register} errors={errors} />}
              />
              <Route
                path="content"
                element={
                  <Content mdcontent={mdcontent} setMdContent={setMdContent} errors={errors} />
                }
              />
            </Routes>
          </form>
        </S.DialogBox>
      </S.Backdrop>
    </S.ModalContainer>
  );
}
