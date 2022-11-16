import React from 'react';
import PropTypes from 'prop-types';
import NotAllow from 'pages/NotAllow';
import { isLogin } from 'service/auth';

PrivateRoute.propTypes = {
  Component: PropTypes.func.isRequired,
};

export default function PrivateRoute({ Component }) {
  return isLogin() ? <Component /> : <NotAllow warnMessage="로그인한 유저만 접근할 수 있어요." />;
}
