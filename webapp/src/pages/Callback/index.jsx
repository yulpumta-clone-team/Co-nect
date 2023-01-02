import React from 'react';
import PropTypes from 'prop-types';
import AuthErrorCallback from './AuthErrorCallback';
import ApiErrorCallback from './ApiErrorCallback';

Callback.propTypes = {
  errorStatus: PropTypes.number,
  errorMessage: PropTypes.string,
  forceRefetch: PropTypes.func,
};

export default function Callback({ errorStatus, errorMessage, forceRefetch }) {
  if (errorStatus === 401 || errorStatus === 403) {
    return <AuthErrorCallback errorMessage={errorMessage} />;
  }
  return <ApiErrorCallback errorMessage={errorMessage} forceRefetch={forceRefetch} />;
}
