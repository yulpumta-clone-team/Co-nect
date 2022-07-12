import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { handleSignUp } from 'apiAction/auth';
<<<<<<< HEAD
import { isStatusOk } from 'constant/serverStatus';

import MarkdownEditor from 'components/MdEditor';
import useInput from 'hooks/useInput';

const skillOptions = [
  { id: 0, value: 'javascript', label: 'javascript' },
  { id: 1, value: 'java', label: 'java' },
  { id: 2, value: 'typescript', label: 'typescript' },
  { id: 3, value: 'python', label: 'python' },
  { id: 4, value: 'react', label: 'react' },
  { id: 5, value: 'spring', label: 'spring' },
  { id: 6, value: 'xd', label: 'xd' },
];
const hopeSessionOption = [
  { id: 0, value: '무관' },
  { id: 1, value: '1개월 이하' },
  { id: 2, value: '3개월 이하' },
  { id: 3, value: '6개월 이하' },
  { id: 4, value: '6개월 이상' },
];
=======
import MarkdownEditor from 'components/MdEditor';
import useInput from 'hooks/useInput';
import { hopeSessionOption, skillOptions } from 'constant';
import { handleFetcher } from 'utils';
>>>>>>> fetch_head

function SignUp() {
  const navigate = useNavigate();
  const [userImg, onImgChange] = useInput('');
  const [userJob, onJobChange] = useInput('');
  const [userPortfolio, onPortfolioChange] = useInput('');
  const [hopeSession, onHopeSessionChange] = useInput('무관');
  const [userSlogan, onSloganChange] = useInput('');
<<<<<<< HEAD
  const [userSkill, setUserSkill] = useInput('');
  const [mdcontent, setMdContent] = useInput('');

  const [selectedSkills, setSelectedSkills] = useState([]);
=======
  const [mdcontent, setMdContent] = useState('');
  const [userSkill, setUserSkill] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);

>>>>>>> fetch_head
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
    // TODO: input validation 추가해야함.
<<<<<<< HEAD
    const {
      payload: { status, code, data, message },
    } = await dispatch(handleSignUp(signUpInfo));
    if (isStatusOk(status)) {
      navigate('/login');
=======
    const { value, error, isError } = await handleFetcher(handleSignUp, signUpInfo);
    if (isError) {
      console.log(error);
      return;
>>>>>>> fetch_head
    }
    navigate('/login');
  };
  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onValid)}>
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
          {...register('nickname', {
            required: '2자리 이상 닉네임을 입력해주세요.',
            minLength: 2,
          })}
          placeholder="nickname"
        />
        <span>{errors?.nickname?.message}</span>
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
        <span>선택한 기술 스킬: {selectedSkills.join(', ')}</span>
        <select value={userSkill} onChange={onSkillChange}>
          {skillOptions.map(({ id, value, label }) => (
            <option key={id} value={value}>
              {label}
            </option>
          ))}
        </select>
        <span>희망 작업 기간</span>
        <select value={hopeSession} onChange={onHopeSessionChange}>
          {hopeSessionOption.map(({ id, value }) => (
            <option key={id} value={value}>
              {value}
            </option>
          ))}
        </select>
        <input
          name="profile-image"
          onChange={onImgChange}
          value={userImg}
          placeholder="임시 프로필 이미지 문자열로 입력"
        />
        <input name="slogan" onChange={onSloganChange} value={userSlogan} placeholder="slogan" />
        <input name="job" onChange={onJobChange} value={userJob} placeholder="직업" />
        <input
          name="portfolio"
          onChange={onPortfolioChange}
          value={userPortfolio}
          placeholder="포트폴리오"
        />
        <button>가입</button>
        <div>
          <MarkdownEditor mdValue={mdcontent} setContent={setMdContent} />
        </div>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default SignUp;
