import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import MarkdownEditor from 'components/MdEditor';
import useInput from 'hooks/useInput';
import { hopeSessionOption, skillOptions } from 'constant';
import { handleFetcher } from 'utils';
import authApi from 'api/auth';
import * as S from './style';

SignUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.bool.isRequired,
};

export default function SignUp({ isOpen, close }) {
  const navigate = useNavigate();
  const [userImg, onImgChange] = useInput('');
  const [userJob, onJobChange] = useInput('');
  const [userPortfolio, onPortfolioChange] = useInput('');
  const [hopeSession, onHopeSessionChange] = useInput('무관');
  const [userSlogan, onSloganChange] = useInput('');
  const [mdcontent, setMdContent] = useState('');
  const [userSkill, setUserSkill] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);

  const onSkillChange = useCallback((e) => {
    setUserSkill(e.target.value);
    setSelectedSkills((prev) => [...prev, e.target.value]);
  }, []);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
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
    navigate('/login');
  };
  return (
    <div>
      {isOpen ? (
        <S.ModalContainer>
          <form
            style={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={handleSubmit(onValid)}
          >
            <S.Backdrop>
              <S.DialogBox>
                <div onClick={() => close()} role="button" tabIndex="-1">
                  <div onClick={(e) => e.stopPropagation()} role="button" tabIndex="-1">
                    <div>
                      <span onClick={() => close()} role="button" tabIndex="-1">
                        &times;
                      </span>
                      <div onClick={() => isOpen()} role="button" tabIndex="-1">
                        <input
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\w+\.)+\w+$/i,
                              message: '이메일 형식으로 입력해주세요.',
                            },
                          })}
                          placeholder="email"
                        />
                        <span>{errors?.email?.message}</span>
                        <input
                          {...register('password', {
                            required: '4자리 이상 비밀번호를 입력해주세요.',
                            minLength: 4,
                            pattern: {
                              value: /(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&+=])(?=\S+$).{8,20}/,
                              message:
                                '8자 이상 20자 이하, 숫자 한개이상 특수문자 한개이상 영어 한개이상 포함 공백 불가',
                            },
                          })}
                          placeholder="password"
                        />
                        <span>{errors?.password?.message}</span>
                        <input
                          {...register('verifiedPassword', {
                            required: '비밀번호가 일치하지 않습니다.',
                          })}
                          placeholder="verifiedPassword"
                        />
                        <span>{errors?.verifiedPassword?.message}</span>
                        <button>다음</button>
                      </div>
                    </div>
                  </div>
                </div>
              </S.DialogBox>
            </S.Backdrop>
          </form>
        </S.ModalContainer>
      ) : null}
    </div>
  );
}
