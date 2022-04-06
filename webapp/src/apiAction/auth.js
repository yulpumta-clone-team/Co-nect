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
    const { name, nickname, email, password } = dataTosubmit;
    const test = {
      content: '12341234!@#abc',
      hope_session: 'string',
      img: 'string',
      job: 'string',
      portfolio: 'string',
      skills: ['string'],
      slogan: 'string',
      name: nickname,
      pwd: password,
      email,
    };
    return authApi
      .POST_SIGN_UP(test)
      .then((response) => dispatch(actionSignUp(response)))
      .catch((error) => dispatch(catchError(error)));
  };
}
