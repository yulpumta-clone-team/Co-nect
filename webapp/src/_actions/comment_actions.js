import { GET_COMMENT } from '_types/commentType';

export function actionGetComment(responseData) {
  return {
    type: GET_COMMENT,
    payload: responseData,
  };
}
export function actionPostComment() {}
export function actionPatchComment() {}
export function actionDeleteComment() {}
export function actionhandleSecretComment() {}
export function actionPostReply() {}
export function actionPathReply() {}
export function actionDeleteReply() {}
export function actionHandleSecretReply() {}
export function actionPatchLikeComment() {}
