import { USER_INFO } from 'constant';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'utils/cookie';

export default function AuthHOC({ SpecificComponent, option = true, adminRoute = null }) {
  // option: null => 아무나 출입 가능
  // option: true => 로그인 유저만
  // option: false => 로그인 하면 출입 불가능한 곳(회원가입 등...)
  function AuthenticationCheck() {
    const userInfo = getCookie(USER_INFO);
    const navigate = useNavigate();
    useEffect(() => {
      if (!userInfo) {
        if (option) {
          navigate('/login');
        }
      } else {
        // 로그인 한 상태
        option === false && navigate('/');
      }
    }, [navigate, userInfo]);
    return <SpecificComponent />;
  }

  return AuthenticationCheck();
}
