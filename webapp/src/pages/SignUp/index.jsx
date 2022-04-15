import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleSignUp } from 'apiAction/auth';
import { isStatusOk } from 'constant/serverStatus';

import MarkdownEditor from 'components/MdEditor';

function SignUp() {
  const skillOptions = [
    { id: 0, value: 'javascript', label: 'javascript' },
    { id: 1, value: 'java', label: 'java' },
    { id: 2, value: 'typescript', label: 'typescript' },
    { id: 3, value: 'python', label: 'python' },
    { id: 4, value: 'react', label: 'react' },
    { id: 5, value: 'spring', label: 'spring' },
    { id: 6, value: 'xd', label: 'xd' },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userImg, setUserImg] = useState('');
  const [userJob, setUserJob] = useState('');
  const [userPortfolio, setUserPortfolio] = useState('');
  const [userSkill, setUserSkill] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [userSlogan, setUserSlogan] = useState('');
  const [mdcontent, setMdContent] = useState('');
  const onImgChange = useCallback((e) => {
    setUserImg(e.target.value);
  }, []);
  const onJobChange = useCallback((e) => {
    setUserJob(e.target.value);
  }, []);
  const onPortfolioChange = useCallback((e) => {
    setUserPortfolio(e.target.value);
  }, []);
  const onSkillChange = useCallback((e) => {
    setUserSkill(e.target.value);
    setSelectedSkills((prev) => [...prev, e.target.value]);
  }, []);
  const onSloganChange = useCallback((e) => {
    setUserSlogan(e.target.value);
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
    const { password, verifiedPassword } = submitData;
    if (password !== verifiedPassword) {
      setError('verifiedPassword', { message: 'Password is not same' }, { shouldFocus: true });
    }
    const signUpInfo = {
      ...submitData,
      userImg,
      userJob,
      userPortfolio,
      selectedSkills,
      userSlogan,
      mdcontent,
    };
    console.log(signUpInfo);
    // TODO: input validation 추가해야함.
    const {
      payload: { status, code, data, message },
    } = await dispatch(handleSignUp(signUpInfo));
    if (isStatusOk(status)) {
      navigate('/login');
    }
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
