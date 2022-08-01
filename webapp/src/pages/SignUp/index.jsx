import { handleSignUp } from 'apiAction/auth';
import { isStatusOk } from 'constant/serverStatus';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
=======
import { handleSignUp } from 'apiAction/auth';
import MarkdownEditor from 'components/MdEditor';
import useInput from 'hooks/useInput';
import { hopeSessionOption, skillOptions } from 'constant';
import { isStatusOk } from 'constant/serverStatus';
>>>>>>> back

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
<<<<<<< HEAD
=======
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
>>>>>>> back
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    // watch,
  } = useForm({
    defaultValues: {},
  });
  const onValid = async (submitData) => {
    const { password, verifiedPassword } = submitData;
    if (password !== verifiedPassword) {
      setError('verifiedPassword', { message: 'Password is not same' }, { shouldFocus: true });
    }
    const {
      payload: { status, code, data, message },
<<<<<<< HEAD
    } = await dispatch(handleSignUp(submitData));
    console.log('\nstatus: ', status, '\ncode: ', code, '\ndata: ', data, '\nmessage: ', message);
=======
    } = await dispatch(handleSignUp(signUpInfo));
    console.log(123123123);
>>>>>>> back
    if (isStatusOk(status)) {
      // navigate('/login');
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
                validate: {
                  // async로 만들어서  비동기로 서버에서 요청받을 수도 있음
                  // noYun: (value) => (value.includes('yun') ? 'no yun allowed' : true),
                  // noHo: (value) => (value.includes('ho') ? 'no ho allowed' : true),
                },
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
          <button>가입</button>
          <span>{errors?.extraError?.message}</span>
        </form>
      </div>
  );
}

export default SignUp;