/* eslint-disable no-prototype-builtins */

export function successHandler(response) {
  const { data, headers } = response;
  return { ...data, headers };
}

export function errorHandler(error) {
  // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
  // 응답 오류가 있는 작업 수행
  if (error.response) {
    // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.

    // 서버에서 설정한 커스텀 에러 타입 키값들
    // code, message, status

    const {
      response: { data: apiData, status },
    } = error;
    const hasCode = apiData && apiData.hasOwnProperty('code');
    const hasMessage = apiData && apiData.hasOwnProperty('message');
    const hasStatus = apiData && apiData.hasOwnProperty('status');

    if (hasCode && hasMessage && hasStatus) {
      return Promise.reject(apiData.message);
    }

    return Promise.reject(error.response.message);
  }
  if (error.request) {
    // 요청이 이루어 졌으나 응답을 받지 못했습니다.
    // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
    // Node.js의 http.ClientRequest 인스턴스입니다.
    console.log(error.request);
  } else {
    // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
    console.log('Error', error.message);
  }

  return Promise.reject(new Error('요청 도중 에러 발생'));
}
