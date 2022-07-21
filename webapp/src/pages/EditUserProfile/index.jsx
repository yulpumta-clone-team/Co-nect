import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MarkdownEditor from 'components/MdEditor';
import useFileUploader from 'hooks/useFileUploader';
import useInput from 'hooks/useInput';
import { hopeSessionOption, skillOptions } from 'constant';
import Loader from 'components/Loader';
import { handleFetcher } from 'utils';
import userApi from 'api/user';

import WithLoading from 'hoc/WithLoading';
import * as S from './style';
import EdiitUserProfileForm from './EdiitUserProfileForm';

const USER_ID = 3;

export default function EditUserProfile() {
  const navigate = useNavigate();

  const onClickback = () => {
    navigate(-1);
  };

  const EditUserProfileFormWithLoading = WithLoading({
    Component: EdiitUserProfileForm,
    responseDataKey: 'targetUser',
    axiosInstance: userApi.GET_USER_DETAIL,
    axiosConfig: { id: USER_ID },
  });

  return (
    <S.Container>
      <button onClick={onClickback}>back</button>
      <br />
      <EditUserProfileFormWithLoading onClickback={onClickback} />
    </S.Container>
  );
}
