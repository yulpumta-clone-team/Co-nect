import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { OAUTH_URL } from 'constant/route';
import { handleFetcher } from 'utils';
import { updateUserInfo } from 'service/auth';
import authApi from 'api/auth';
import { ProfileImg } from 'pages/Main/style';
import { response } from 'msw';

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
  } = useForm({
    defaultValues: {},
  });
  const [error, setError] = useState({ isError: false, msg: '' });
  // const { img, name } = response.data.data;
  const onValid = async (submitData) => {
    const { email, password } = submitData;
    // if (password !== verifiedPassword) {
    //   setError('verifiedPassword', { message: 'Password is not same' }, { shouldFocus: true });
    // }

    try {
      const response = await authApi.POST_LOGIN({ email, pwd: password });
      console.log(response);
      updateUserInfo({
        userId: email,
        profileImg: response.data.data.img,
        name: response.data.data.name,
      });
      // TODO: 성공시 이동할 페이지 정해서 이동시키기
    } catch (error) {
      console.error(error);
      setError({
        isError: true,
        msg: error,
      });
    }
    navigate('/callback');
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
        <button type="submit">로그인</button>
        <span>{errors?.extraError?.message}</span>
      </form>
      <a href={OAUTH_URL.GITHUB}>Github</a>
      <br />
      <a href={OAUTH_URL.GOOGLE}>Google</a>
    </div>
  );
}
