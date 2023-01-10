import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useForm from 'hooks/useForm';
import { ESSENTIAL_INFO_LINKS, ROUTE } from 'constant/route.constant';
import { essentialInfoParser } from 'service/user/user.parser';
import useAuthService from 'hooks/useAuthService';
import useFileUploader from 'hooks/useFileUploader';
import { essentialValidation } from 'service/user/user.validation';
import useCheckUserDuplicate from 'hooks/useCheckUserDuplicate';

const initialValues = {
  nickname: '', // 입력하지 않으면 서브 페이지가 넘어가지 않습니다.
  profileImage: '',
  techSkills: [], // 입력하지 않으면 서브 페이지가 넘어가지 않습니다.
  slogan: '', // 입력하지 않으면 서브 페이지가 넘어가지 않습니다.
  hopeSession: '',
  job: '',
  belongTeam: false,
  introduction: '',
  portfolio: '',
};

const essentialSubPagesRouteOrder = [
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

  const { requestUpdateUserProfile } = useAuthService();

  const { isNicknameDuplicate, onClickCheckDuplicateNickname } = useCheckUserDuplicate(
    initialValues.nickname,
  );
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
    requestUpdateUserProfile(parsedSubmitData);
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
    const currentSubPageIndex = essentialSubPagesRouteOrder.indexOf(currentPathname);
    const isCurrentSubPageInLast = currentSubPageIndex === essentialSubPagesRouteOrder.length - 2;
    const isCurrentSubPageOverLast = currentSubPageIndex > essentialSubPagesRouteOrder.length - 2;

    if (isCurrentSubPageInLast) {
      handleApiRequestInLastSubPage();
    }

    if (isCurrentSubPageOverLast) return;

    navigate(essentialSubPagesRouteOrder[currentSubPageIndex + 1], {
      state: { isFirstLogin: true },
    });
  }, [location.pathname, navigate]);

  const handleClickPrevButton = useCallback(() => {
    const currentPathname = location.pathname;
    const currentSubPageIndex = essentialSubPagesRouteOrder.indexOf(currentPathname);
    const isCurrentSubPageUnderInit = currentSubPageIndex <= 0;

    if (isCurrentSubPageUnderInit) {
      navigate(ROUTE.LOGIN);
      return;
    }
    navigate(essentialSubPagesRouteOrder[currentSubPageIndex - 1], {
      state: { isFirstLogin: true },
    });
  }, [location.pathname, navigate]);

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
