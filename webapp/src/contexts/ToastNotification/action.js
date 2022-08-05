import { DELETE_TOAST, NOTIFY_TOAST } from './type';

export const notifyNewMessage = (dispatch, message, notifyType) =>
  dispatch({ type: NOTIFY_TOAST, payload: { message, notifyType } });

export const deleteMessage = (dispatch, id) => dispatch({ type: DELETE_TOAST, payload: { id } });
