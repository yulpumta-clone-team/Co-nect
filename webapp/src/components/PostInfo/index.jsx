import React from 'react';
import PropTypes from 'prop-types';
import EyeSvg from 'assets/icons/EyeSvg';
import Like from 'components/Common/Like';
import ChatBubbleOvalSvg from 'assets/icons/ChatBubbleOvalSvg';
import * as S from './PostInfo.style';

PostInfo.propTypes = {
  postId: PropTypes.number.isRequired,
  readCnt: PropTypes.string.isRequired,
  likeCnt: PropTypes.string.isRequired,
  commentCnt: PropTypes.string.isRequired,
};

export default function PostInfo({ postId, readCnt, likeCnt, commentCnt }) {
  return (
    <S.PostInfo>
      <S.SinglePostInfo>
        <EyeSvg />
        <span>{readCnt}</span>
      </S.SinglePostInfo>
      <S.SinglePostInfo>
        <S.SinglePostInfo>
          <Like id={postId} initValue={false} />
          <span>{likeCnt}</span>
        </S.SinglePostInfo>
        <S.SinglePostInfo>
          <ChatBubbleOvalSvg />
          <span>{commentCnt}</span>
        </S.SinglePostInfo>
      </S.SinglePostInfo>
    </S.PostInfo>
  );
}
