import React from 'react';
import PropTypes from 'prop-types';

function ErrModal({ errorContent }) {
  return <div>{errorContent.message || errorContent.error}</div>;
}

ErrModal.propTypes = {
  errorContent: PropTypes.shape({
    code: PropTypes.number,
    message: PropTypes.string,
    status: PropTypes.number,
    error: PropTypes.string,
  }).isRequired,
};

export default ErrModal;
