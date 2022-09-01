import React from 'react';
import PropTypes from 'prop-types';

ApiErrorCallback.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  forceRefetch: PropTypes.func.isRequired,
};

export default function ApiErrorCallback({ errorMessage, forceRefetch }) {
  return (
    <div>
      <h1>{errorMessage}</h1>
      <button onClick={forceRefetch}>refetch</button>
    </div>
  );
}
