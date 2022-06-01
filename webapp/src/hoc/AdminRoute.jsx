import React from 'react';
import PropTypes from 'prop-types';
import NotAllow from 'pages/NotAllow';
import { isLogin } from 'service/auth';

// isAdmin = true여야지만 접근 가능
function AdminRoute({ Component, isAdmin }) {
  return isLogin() && isAdmin ? (
    <Component />
  ) : (
    <NotAllow warnMessage="관리자만 접근할 수 있어요." />
  );
}

AdminRoute.propTypes = {
  Component: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default AdminRoute;
