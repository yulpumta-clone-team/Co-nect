import authApi from 'api/auth';

export function handleLogin(dataTosubmit) {
  const { password, email } = dataTosubmit;
  return authApi.POST_LOGIN({ pwd: password, email });
}

export async function handleSignUp(dataTosubmit) {
  return authApi.POST_SIGN_UP(dataTosubmit);
}
