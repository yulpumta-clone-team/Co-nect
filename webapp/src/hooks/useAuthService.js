import authApi from 'api/auth.api';
import { TOKEN } from 'constant/api.constant';
import { ESSENTIAL_INFO_LINKS } from 'constant/route.constant';
import { useNavigate } from 'react-router-dom';
import { handleToken } from 'service/auth';
import useUserInfo from './useUserInfo';

/**
 * handleLogin이 동작하기 위해 외부에서 주입해야하는 params
 * @typedef {Object} saveJwtTokenParams
 * @property {string} accessToken
 * @property {string} refreshToken
 */

const useAuthService = () => {
  const navigate = useNavigate();
  const { handleUpdateUserInfo } = useUserInfo();

  const handleShowEssesntialModal = (isFirstLogin) => {
    navigate(ESSENTIAL_INFO_LINKS.NICKNAME, { state: { isFirstLogin } });
  };

  const requestSignUp = async (submitData) => {
    await authApi.signUp({ submitData });
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const requestLogin = async (submitData) => {
    const response = await authApi.login({ submitData });
    const {
      headers,
      data: { isFirst: isFirstLogin },
    } = response;
    saveJwtToken({ accessToken: headers[TOKEN.ACCESS], refreshToken: headers[TOKEN.REFRESH] });
    checkIsFirstLogin(isFirstLogin);
  };

  /**
   * access token과 refresh token을 저장g하는 함수
   * @param {Object} saveJwtTokenParams
   */
  const saveJwtToken = ({ accessToken, refreshToken }) => {
    handleToken.saveAccessToken(accessToken);
    handleToken.saveRefreshToken(refreshToken);
  };

  /**
   * 최초로그인인지여부를 판단해서 다음 동작을 실행하는 함수
   * @param {boolean} isFirstLogin
   */
  const checkIsFirstLogin = (isFirstLogin) => {
    setTimeout(() => {
      if (isFirstLogin) {
        handleShowEssesntialModal(isFirstLogin);
      } else {
        handleUpdateUserInfo();
      }
    }, 1000);
  };

  return { requestSignUp, requestLogin, saveJwtToken, checkIsFirstLogin };
};

export default useAuthService;
