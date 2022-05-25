import { DEFAULT_PROFILE_IMG } from 'constant';

export function setDefaultProfileImage(img) {
  return (!img || img.length < 10) && DEFAULT_PROFILE_IMG;
}

export const POST_TYPE = {
  USER: 'user',
  TEAM: 'team',
};

export function checkIsUserPost(postType) {
  return postType === POST_TYPE.USER;
}

export function setPostIdOnSubmitData(postType, postId, submitData) {
  const id = checkIsUserPost(postType) ? 'userId' : 'teamId';
  return {
    [id]: postId,
    ...submitData,
  };
}

export async function handleFetcher(fetcher, submitData) {
  const fetchResult = {
    isError: true,
    value: null,
    error: null,
  };
  try {
    const {
      status,
      data: { data },
    } = await fetcher(submitData);
    fetchResult.value = data;
    fetchResult.isError = false;
  } catch (error) {
    fetchResult.value = null;
    fetchResult.isError = true;
    fetchResult.error = error;
  }
  return fetchResult;
}
