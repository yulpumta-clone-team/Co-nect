import App from 'layouts/App';
import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import worker from 'mocks/browser';

if (process.env.REACT_APP_MOCK_TOOL === 'msw') {
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
