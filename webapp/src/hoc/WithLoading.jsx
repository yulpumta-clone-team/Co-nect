/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import PropTypes from 'prop-types';
import useAxios from 'hooks/useAxios';
import Callback from 'pages/Callback';
import Spinner from 'components/Common/Loader/Spinner';

// ! propTypes가 적용이 안 됨.
WithLoading.propTypes = {
  Component: PropTypes.element.isRequired,
  responseDataKey: PropTypes.string.isRequired,
  axiosInstance: PropTypes.func.isRequired,
  axiosConfig: PropTypes.object.isRequired,
};

export default function WithLoading({ Component, responseDataKey, axiosInstance, axiosConfig }) {
  return function Wrapper(props) {
    const { state, forceRefetch } = useAxios({
      axiosInstance,
      axiosConfig,
    });
    const { responseData, isLoading, error } = state;

    if (isLoading) return <Spinner withLogo isFullPage />;

    if (error) {
      return (
        <Callback
          errorStatus={error.httpStatus}
          errorMessage={error.message}
          forceRefetch={forceRefetch}
        />
      );
    }
    const propsWithResponseData = { ...props, [responseDataKey]: responseData };
    return <Component {...propsWithResponseData} />;
  };
}
