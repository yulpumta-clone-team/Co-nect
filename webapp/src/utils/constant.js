import { DEFAULT_PROFILE_IMG } from 'constant';

export function setDefaultProfileImage(img) {
  return (!img || img.length < 10) && DEFAULT_PROFILE_IMG;
}

export const temp = '';
