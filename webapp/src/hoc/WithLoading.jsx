import React from 'react';
import PropTypes from 'prop-types';
import useAxios from 'hooks/useAxios';

WithLoading.propTypes = {
  Component: PropTypes.element.isRequired,
  fetcher: PropTypes.func.isRequired,
  LoadingComponent: PropTypes.element.isRequired,
};

export default function WithLoading({ Component, LoadingComponent, fetcher }) {
  const [responseData, isLoading, error, refetch] = useAxios();

  if (isLoading) return <div>Loading....</div>;

  if (error.isError)
    return (
      <div>
        {error.msg}
        <button onClick={refetch}>refetch</button>
      </div>
    );

  return <Component data={responseData} />;
}
