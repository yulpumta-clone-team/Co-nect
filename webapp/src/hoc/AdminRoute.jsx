import React from 'react';
import PropTypes from 'prop-types';
import NotAllow from 'pages/NotAllow';
import { isLogin } from 'service/auth';

AdminRoute.propTypes = {
  Component: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

// isAdmin = true여야지만 접근 가능
export default function AdminRoute({ Component, isAdmin }) {
  return isLogin() && isAdmin ? (
    <Component />
  ) : (
    <NotAllow warnMessage="관리자만 접근할 수 있어요." />
  );
}
