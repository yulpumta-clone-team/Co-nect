import { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import useForm from 'hooks/useForm';
import authApi from 'api/auth.api';
import userApi from 'api/user.api';
import { ROUTE } from 'constant/route.constant';
import essentialValidation from 'service/essentialForm.validation';
import { essentialInfoParser } from 'service/auth.parser';

const initialValues = {
  nickname: '',
  profileImage: '',
  techSkills: [],
  slogan: '',
  hopeSession: '',
  job: '',
  belongTeam: '',
  introduction: '',
  portfolio: '',
};

const essentailSubPagesRouteOrder = [
  ROUTE.ESSENTIAL_INFO.NICKNAME,
  ROUTE.ESSENTIAL_INFO.SKILL,
  ROUTE.ESSENTIAL_INFO.PROFILE_IMAGE,
  ROUTE.ESSENTIAL_INFO.SESSION_JOB,
  ROUTE.ESSENTIAL_INFO.SLOGAN,
  ROUTE.ESSENTIAL_INFO.BELONG_TEAM,
  ROUTE.ESSENTIAL_INFO.CONTENT,
  ROUTE.ESSENTIAL_INFO.PROTFOLIO,
  ROUTE.ESSENTIAL_INFO.CALLBACK,
];

const useEssentialForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const notifyDispatch = useToastNotificationAction();
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(true);

  const submitCallback = async (submitData) => {
    const parsedSubmitData = essentialInfoParser(submitData);
    // TODO: 1초가 넘으면 처리중입니다 메세지 보여지게 수정
    notifyNewMessage(notifyDispatch, '처리 중입니다...', TOAST_TYPE.Info);

    try {
      const response = await userApi.POST_ESSENTIAL_INFO({ submitData: parsedSubmitData });
      const { message } = response.data;
      notifyNewMessage(notifyDispatch, message, TOAST_TYPE.Success);
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      console.error(error);
      notifyNewMessage(notifyDispatch, error, TOAST_TYPE.Error);
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

  const handleClickLayout = useCallback(() => {
    navigate(ROUTE.LOGIN);
  }, [navigate]);

  const handleClickNextButton = useCallback(() => {
    const currentPathname = location.pathname;
    const currentSubPageIndex = essentailSubPagesRouteOrder.indexOf(currentPathname);
    // 타켓팅한 요소의 인덱스가 배열의 길이보다 크거가 같을 때는 이동하지 않는다.
    if (currentSubPageIndex >= essentailSubPagesRouteOrder.length - 1) return;
    navigate(essentailSubPagesRouteOrder[currentSubPageIndex + 1]);
  }, [location.pathname, navigate]);

  const handleClickPrevButton = useCallback(() => {
    const currentPathname = location.pathname;
    const currentSubPageIndex = essentailSubPagesRouteOrder.indexOf(currentPathname);
    // 타켓팅한 요소의 인덱스가 배열의 길이보다 작거나 같을 때는 이동하지 않는다.
    if (currentSubPageIndex <= 0) {
      navigate(ROUTE.LOGIN);
      return;
    }
    navigate(essentailSubPagesRouteOrder[currentSubPageIndex - 1]);
  }, [location.pathname, navigate]);

  const onClickCheckDuplicateNickname = useCallback(async () => {
    // TODO: 1초가 넘으면 처리중입니다 메세지 보여지게 수정
    notifyNewMessage(notifyDispatch, '처리 중입니다...', 'Info');
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
      notifyNewMessage(notifyDispatch, error, 'Error');
      setIsNicknameDuplicate(true);
    }
  }, [inputValues.nickname, notifyDispatch]);

  // try {
  //   const response = await authApi.GET_ESSENTIAL_INFO();
  //   console.log(response);
  //   updateUserInfo({
  //     userId: response.data.id,
  //     profileImg: response.data.image,
  //     name: response.data.name,
  //   });
  //   navigate('/');
  // } catch (apiError) {
  //   console.error(apiError);
  // }

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
    ],
  );

  const states = useMemo(
    () => ({
      inputValues,
      validateError,
      satisfyAllValidates,
      isNicknameDuplicate,
    }),
    [inputValues, validateError, satisfyAllValidates, isNicknameDuplicate],
  );

  return [states, actions];
};

export default useEssentialForm;
