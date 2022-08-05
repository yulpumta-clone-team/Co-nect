import { v4 as uuidv4 } from 'uuid';
import { DELETE_TOAST, NOTIFY_TOAST } from './type';

export const initState = {
  // TODO: 예시 코드입니다. 배포 전에 지워야합니다.
  toastList: [
    // {
    //   id: 'asdf',
    //   type: 'Success',
    //   description: 'This is a success toast component',
    // },
    // {
    //   id: 'bb',
    //   type: 'Error',
    //   description: 'This is an error toast component',
    // },
    // {
    //   id: 'cacaa',
    //   type: 'Warning',
    //   description: 'This is an error toast component',
    // },
  ],
};

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case NOTIFY_TOAST: {
      const { message, notifyType } = payload;
      const { toastList } = state;
      const newNotification = getNewToast(message, notifyType);
      return {
        toastList: [...toastList, newNotification],
      };
    }
    case DELETE_TOAST: {
      const { id } = payload;
      const { toastList } = state;
      const newToastList = toastList.filter((element) => element.id !== id);
      return {
        toastList: newToastList,
      };
    }
    default:
      return { ...state };
  }
};

const getNewToast = (message, notifyType) => ({
  id: uuidv4(),
  type: notifyType,
  description: message,
});
