import { isStatusOk } from 'constant/serverStatus';
import { catchError } from '_actions/global_action';

export function setDefaultProfileImage(img) {
  return (
    img ||
    'https://user-images.githubusercontent.com/71386219/157435570-a48382a8-63e5-4d25-91f4-e506289424b5.png'
  );
}

export const POST_TYPE = {
  USER: 'user',
  TEAM: 'team',
};

export function checkIsUserPost(postType) {
  return postType === POST_TYPE.USER;
}

export function setPostIdOnSubmitData(postType, submitData) {
  const id = checkIsUserPost(postType) ? 'userId' : 'teamId';
  return {
    [id]: checkIsUserPost(postType),
    ...submitData,
  };
}

export async function handleFetcher(fetcher, submitData, dispatch) {
  const fetchResult = {
    isError: true,
    value: null,
  };
  try {
    const {
      status,
      data: { data },
    } = await fetcher(submitData);
    if (isStatusOk(status)) {
      fetchResult.value = data;
      fetchResult.isError = false;
    }
  } catch (error) {
    dispatch(catchError(error));
  }
  return fetchResult;
}
