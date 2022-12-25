import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import useForm from 'hooks/useForm';
import authApi from 'api/auth.api';

import { ESSENTIAL_INFO_LINKS, ROUTE } from 'constant/route.constant';

import { essentialInfoParser } from 'service/user/user.parser';
import useUserInfo from 'hooks/useUserInfo';
import useFileUploader from 'hooks/useFileUploader';
import userApi from 'api/user.api';
import { essentialValidation } from 'service/user/user.validation';

const initialValues = {
  nickname: '',
  profileImage: '',
  techSkills: [],
  slogan: '',
  hopeSession: '',
  job: '',
  belongTeam: false,
  introduction: '',
  portfolio: '',
};

const essentailSubPagesRouteOrder = [
  ESSENTIAL_INFO_LINKS.NICKNAME,
  ESSENTIAL_INFO_LINKS.SKILL,
  ESSENTIAL_INFO_LINKS.PROFILE_IMAGE,
  ESSENTIAL_INFO_LINKS.SESSION_JOB,
  ESSENTIAL_INFO_LINKS.SLOGAN,
  ESSENTIAL_INFO_LINKS.BELONG_TEAM,
  ESSENTIAL_INFO_LINKS.CONTENT,
  ESSENTIAL_INFO_LINKS.PROTFOLIO,
  ESSENTIAL_INFO_LINKS.CALLBACK,
];

const useEssentialForm = () => {
  const layoutRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleProtectedUrl = (locationState) => {
    if (!locationState) {
      navigate(ROUTE.LOGIN);
      return;
    }
    if (!locationState.isFirstLogin) {
      navigate(ROUTE.LOGIN);
    }
  };

  const notifyDispatch = useToastNotificationAction();
  const { handleUpdateUserInfo } = useUserInfo();
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(true);
  const { uploadFileOnS3, imageFile, onChangeFile } = useFileUploader();

  const uploadImageFileBeforeSubmit = async (submitData) => {
    const response = await uploadFileOnS3();
    if (response) {
      const { id, path } = response;
      return { ...submitData, profileImage: path };
    }
    return submitData;
  };

  const submitCallback = async (submitData) => {
    const changedProfileImageSubmitData = await uploadImageFileBeforeSubmit(submitData);
    const parsedSubmitData = essentialInfoParser(changedProfileImageSubmitData);
    // TODO: 1초가 넘으면 처리중입니다 메세지 보여지게 수정
    notifyNewMessage(notifyDispatch, '처리 중입니다...', TOAST_TYPE.Info);
    try {
      const response = await userApi.POST_ESSENTIAL_INFO({ submitData: parsedSubmitData });
      // // const { message } = response;
      notifyNewMessage(notifyDispatch, '유저정보가 성공적으로 저장되었습니다!', TOAST_TYPE.Success);
      handleUpdateUserInfo();
    } catch (error) {
      console.error(error);
      notifyNewMessage(notifyDispatch, error.message, TOAST_TYPE.Error);
    }
  };

  const {
    inputValues,
    validateError,
    onChangeHandler,
    onChangeHandlerWithSelect,
    submitHandler,
    satisfyAllValidates,
    isTargetSatisfyValidate,
  } = useForm({
    initialValues,
    submitCallback,
    validate: essentialValidation,
  });

  const handleApiRequestInLastSubPage = () => {
    submitHandler();
  };

  const closeEssentialModal = useCallback(() => {
    navigate(ROUTE.LOGIN);
  }, [navigate]);

  const handleClickLayout = useCallback(
    (event) => {
      const isTargetOnlyLayout = layoutRef.current === event.target;
      if (isTargetOnlyLayout) {
        closeEssentialModal();
      }
    },
    [closeEssentialModal],
  );

  const handleClickNextButton = useCallback(() => {
    const currentPathname = location.pathname;
    const currentSubPageIndex = essentailSubPagesRouteOrder.indexOf(currentPathname);
    const isCurrentSubPageInLast = currentSubPageIndex === essentailSubPagesRouteOrder.length - 2;
    const isCurrentSubPageOverLast = currentSubPageIndex > essentailSubPagesRouteOrder.length - 2;

    if (isCurrentSubPageInLast) {
      handleApiRequestInLastSubPage();
    }

    if (isCurrentSubPageOverLast) return;

    navigate(essentailSubPagesRouteOrder[currentSubPageIndex + 1], {
      state: { isFirstLogin: true },
    });
  }, [location.pathname, navigate]);

  const handleClickPrevButton = useCallback(() => {
    const currentPathname = location.pathname;
    const currentSubPageIndex = essentailSubPagesRouteOrder.indexOf(currentPathname);
    const isCurrentSubPageUnderInit = currentSubPageIndex <= 0;

    if (isCurrentSubPageUnderInit) {
      navigate(ROUTE.LOGIN);
      return;
    }
    navigate(essentailSubPagesRouteOrder[currentSubPageIndex - 1], {
      state: { isFirstLogin: true },
    });
  }, [location.pathname, navigate]);

  const onClickCheckDuplicateNickname = useCallback(async () => {
    // TODO: 1초가 넘으면 처리중입니다 메세지 보여지게 수정
    notifyNewMessage(notifyDispatch, '처리 중입니다...', TOAST_TYPE.Info);
    try {
      const response = await authApi.checkDuplicateNickName({ name: inputValues.nickname });
      const isDuplicated = response.data;
      if (isDuplicated) {
        notifyNewMessage(notifyDispatch, '이미 사용중인 닉네임입니다!', TOAST_TYPE.Warning);
        setIsNicknameDuplicate(true);
      } else {
        notifyNewMessage(notifyDispatch, '사용가능한 닉네임입니다!', TOAST_TYPE.Success);
        setIsNicknameDuplicate(false);
      }
    } catch (error) {
      console.error(error);
      notifyNewMessage(notifyDispatch, error.message, TOAST_TYPE.Error);
      setIsNicknameDuplicate(true);
    }
  }, [inputValues.nickname, notifyDispatch]);

  useEffect(() => {
    handleProtectedUrl(location.state);
  }, [location.pathname]);

  const actions = useMemo(
    () => ({
      onChangeHandler,
      onChangeHandlerWithSelect,
      submitHandler,
      onClickCheckDuplicateNickname,
      isTargetSatisfyValidate,
      handleClickNextButton,
      handleClickPrevButton,
      handleClickLayout,
      closeEssentialModal,
      onChangeFile,
    }),
    [
      onChangeHandler,
      onChangeHandlerWithSelect,
      submitHandler,
      onClickCheckDuplicateNickname,
      isTargetSatisfyValidate,
      handleClickNextButton,
      handleClickPrevButton,
      handleClickLayout,
      closeEssentialModal,
      onChangeFile,
    ],
  );

  const states = useMemo(
    () => ({
      layoutRef,
      inputValues,
      validateError,
      satisfyAllValidates,
      isNicknameDuplicate,
      imageFile,
    }),
    [layoutRef, inputValues, validateError, satisfyAllValidates, isNicknameDuplicate, imageFile],
  );

  return [states, actions];
};

export default useEssentialForm;
