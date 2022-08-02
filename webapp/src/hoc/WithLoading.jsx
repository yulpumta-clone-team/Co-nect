/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import PropTypes from 'prop-types';
import useAxios from 'hooks/useAxios';

// ! propTypes가 적용이 안 됨.
WithLoading.propTypes = {
  Component: PropTypes.element.isRequired,
  responseDataKey: PropTypes.string.isRequired,
  axiosInstance: PropTypes.func.isRequired,
  axiosConfig: PropTypes.object.isRequired,
  LoadingFallback: PropTypes.element.isRequired,
  ErrorFallback: PropTypes.element.isRequired,
};

export default function WithLoading({
  Component,
  responseDataKey,
  axiosInstance,
  axiosConfig,
  LoadingFallback,
  ErrorFallback,
}) {
  return function Wrapper(props) {
    const [state, _, forceRefetch] = useAxios({
      axiosInstance,
      axiosConfig,
    });
    const { responseData, isLoading, error } = state;
    if (isLoading) return <div>Loading....</div>;

    if (error)
      return (
        <div>
          <button onClick={forceRefetch}>refetch</button>
        </div>
      );
    const propsWithResponseData = { ...props, [responseDataKey]: responseData };
    return <Component {...propsWithResponseData} />;
  };
}
