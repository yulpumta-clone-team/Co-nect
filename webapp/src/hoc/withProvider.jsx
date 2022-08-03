import React from 'react';

export default function WithProvider({ Provider, Component }) {
  return function Wrapper(props) {
    return (
      <Provider>
        <Component {...props} />
      </Provider>
    );
  };
}
