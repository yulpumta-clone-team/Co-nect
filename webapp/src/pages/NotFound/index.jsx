import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  const backToMain = () => {
    navigate('/');
  };
  return (
    <div>
      NotFound
      <button variant="contained" onClick={backToMain}>
        홈으로 돌아가기
      </button>
    </div>
  );
}
