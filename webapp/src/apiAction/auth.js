import authApi from 'api/auth';
import { actionLogin, actionSignUp } from '_actions/auth_action';
import { catchError } from '_actions/global_action';

export function handleLogin(dataTosubmit) {
  return (dispatch) => {
    const { password, email } = dataTosubmit;
    return authApi
      .POST_LOGIN({ pwd: password, email })
      .then((response) => dispatch(actionLogin(response)))
      .catch((error) => dispatch(catchError(error)));
  };
}

export async function handleSignUp(dataTosubmit) {
  return (dispatch) => {
    return authApi
      .POST_SIGN_UP(dataTosubmit)
      .then((response) => dispatch(actionSignUp(response)))
      .catch((error) => dispatch(catchError(error)));
  };
}
