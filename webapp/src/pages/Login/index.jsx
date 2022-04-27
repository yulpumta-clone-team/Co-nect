import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { OAUTH_URL } from 'constant/route';
import { isStatusOk } from 'constant/serverStatus';
import { handleLogin } from 'apiAction/auth';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      payload: { status },
    } = await dispatch(handleLogin(submitData));
    if (status && isStatusOk(status)) {
      navigate('/');
      window.location.reload();
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
        <button>로그인</button>
        <span>{errors?.extraError?.message}</span>
      </form>
      <a href={OAUTH_URL.GITHUB}>Github</a>
      <br />
      <a href={OAUTH_URL.GOOGLE}>Google</a>
    </div>
  );
}

export default Login;
