import { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import useForm from 'hooks/useForm';
import authApi from 'api/auth.api';
import userApi from 'api/user.api';
import { ESSENTIAL_INFO } from 'constant/route.constant';
import essentialValidation from 'service/essentialForm.validation';

const initialValues = {
  nickname: '',
  profileImage: '',
  skills: '',
  slogan: '',
  hopeSession: '',
  job: '',
  belongTeam: '',
  introduction: '',
  portfolio: '',
};

const essentailSubPagesRouteOrder = [
  ESSENTIAL_INFO.NICKNAME,
  ESSENTIAL_INFO.SKILL,
  ESSENTIAL_INFO.PROFILE_IMAGE,
  ESSENTIAL_INFO.SESSION_JOB,
  ESSENTIAL_INFO.SLOGAN,
  ESSENTIAL_INFO.BELONG_TEAM,
  ESSENTIAL_INFO.CONTENT,
  ESSENTIAL_INFO.PROTFOLIO,
];

const useEssentialForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const notifyDispatch = useToastNotificationAction();
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(true);

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
    // 타켓팅한 요소의 인덱스가 배열의 길이보다 크거가 같을 때는 이동하지 않는다.
    if (currentSubPageIndex <= 0) return;
    navigate(essentailSubPagesRouteOrder[currentSubPageIndex - 1]);
  }, [location.pathname, navigate]);

  const submitCallback = async (submitData) => {
    // TODO: 1초가 넘으면 처리중입니다 메세지 보여지게 수정
    notifyNewMessage(notifyDispatch, '처리 중입니다...', TOAST_TYPE.Info);
    try {
      const response = await userApi.POST_ESSENTIAL_INFO(submitData);
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
    submitHandler,
    satisfyAllValidates,
    isTargetSatisfyValidate,
  } = useForm({
    initialValues,
    submitCallback,
    validate: essentialValidation,
  });

  const onClickCheckDuplicateNickname = useCallback(async () => {
    // TODO: 1초가 넘으면 처리중입니다 메세지 보여지게 수정
    notifyNewMessage(notifyDispatch, '처리 중입니다...', 'Info');
    try {
      const response = await authApi.checkDuplicateNickName({ email: inputValues.email });
      const { message } = response.data;
      notifyNewMessage(notifyDispatch, message, 'Success');
      setIsNicknameDuplicate(false);
    } catch (error) {
      console.error(error);
      notifyNewMessage(notifyDispatch, error, 'Error');
      setIsNicknameDuplicate(true);
    }
  }, [inputValues.email, notifyDispatch]);

  const actions = useMemo(
    () => ({
      onChangeHandler,
      submitHandler,
      onClickCheckDuplicateNickname,
      isTargetSatisfyValidate,
      handleClickNextButton,
      handleClickPrevButton,
    }),
    [
      onChangeHandler,
      submitHandler,
      onClickCheckDuplicateNickname,
      isTargetSatisfyValidate,
      handleClickNextButton,
      handleClickPrevButton,
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
