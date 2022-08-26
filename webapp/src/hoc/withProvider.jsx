import React from 'react';

export default function WithProvider({ Providers, Component }) {
  return function Wrapper(props) {
    return Providers.reduceRight((acc, Provider) => {
      return <Provider>{acc}</Provider>;
    }, <Component {...props} />);
  };
}
