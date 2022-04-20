import { GET_COMMENT, POST_COMMENT } from '_types/commentType';

export function actionGetComment(responseData) {
  return {
    type: GET_COMMENT,
    payload: responseData,
  };
}
export function actionPostComment(responseData) {
  console.log(responseData);
  return {
    type: POST_COMMENT,
    payload: responseData,
  };
}
export function actionPatchComment() {}
export function actionDeleteComment() {}
export function actionhandleSecretComment() {}
export function actionPostReply() {}
export function actionPathReply() {}
export function actionDeleteReply() {}
export function actionHandleSecretReply() {}
export function actionPatchLikeComment() {}
