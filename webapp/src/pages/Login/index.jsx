import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { OAUTH_URL } from 'constant/route';
import { handleFetcher } from 'utils';
import { updateUserInfo } from 'service/auth';
import authApi from 'api/auth';

export default function Login() {
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
    const { email, password, verifiedPassword } = submitData;
    if (password !== verifiedPassword) {
      setError('verifiedPassword', { message: 'Password is not same' }, { shouldFocus: true });
    }
    const { value, error, isError } = await handleFetcher(authApi.POST_LOGIN, {
      email,
      pwd: password,
    });
    if (isError) {
      console.log(error);
      return;
    }
    updateUserInfo(value);
    navigate('/');
    window.location.reload();
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
            required: '비밀번호를 입력해주세요.',
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
