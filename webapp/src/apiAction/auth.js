import authApi from 'api/auth';

export function handleLogin(dataTosubmit) {
  const { password, email } = dataTosubmit;
  return authApi.POST_LOGIN({ pwd: password, email });
}

export async function handleSignUp(dataTosubmit) {
<<<<<<< HEAD
  return (dispatch) => {
    return authApi
      .POST_SIGN_UP(dataTosubmit)
      .then((response) => dispatch(actionSignUp(response)))
      .catch((error) => dispatch(catchError(error)));
  };
=======
  return authApi.POST_SIGN_UP(dataTosubmit);
>>>>>>> fetch_head
}
