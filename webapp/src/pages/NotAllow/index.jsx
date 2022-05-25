import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function NotAllow({ warnMessage }) {
  const navigate = useNavigate();
  const backToMain = () => {
    navigate('/');
  };
  return (
    <div>
      NotAllow
      <h1>{warnMessage}</h1>
      <button variant="contained" onClick={backToMain}>
        홈으로 돌아가기
      </button>
    </div>
  );
}

NotAllow.propTypes = {
  warnMessage: PropTypes.string.isRequired,
};

export default NotAllow;
