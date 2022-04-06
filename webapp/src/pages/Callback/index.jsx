import React, { useEffect } from 'react';
import Loader from 'pages/Loader';
import { useNavigate } from 'react-router-dom';
import { getAuthCookie } from 'utils/cookie';

function Callback() {
  const navigate = useNavigate();
  const authCookie = getAuthCookie();
  useEffect(() => {
    function getToken() {
      authCookie ? navigate('/') : navigate('/login');
      window.location.reload();
    }

    getToken();
  }, [authCookie, navigate]);
  return <Loader />;
}

export default Callback;
