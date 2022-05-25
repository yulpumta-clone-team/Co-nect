import React from 'react';
import PropTypes from 'prop-types';
import NotAllow from 'pages/NotAllow';
import { isLogin } from 'service/auth';

// restricted = false  => public route
// restricted = true => 로그인한 유저는 못들어감 (회원가입 페이지, 로그인 페이지)
function PublicRoute({ Component, restricted }) {
  return isLogin() && restricted ? (
    <NotAllow warnMessage="로그인한 유저는 접근할 수 없어요" />
  ) : (
    <Component />
  );
}

PublicRoute.propTypes = {
  Component: PropTypes.func.isRequired,
  restricted: PropTypes.bool.isRequired,
};

export default PublicRoute;
