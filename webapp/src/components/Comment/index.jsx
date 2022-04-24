/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { setDefaultProfileImage } from 'utils';
import { Container, Image, Info } from './style';

function Comment({ id, postId, commentInfo }) {
  const { img, secret, writer, feeling, content, parentId, replies } = commentInfo;
  // console.log(id, img, postId, secret, writer, feeling, content, parentId, replies);
  const feelingCount = feeling.length;
  return (
    <Container>
      <Image>
        <img
          style={{ width: '50px', heigth: '50px' }}
          src={setDefaultProfileImage(img)}
          alt="profile"
        />
        <h3>{writer}</h3>
      </Image>
      <Info>
        <span>{content}</span>
        <span>좋아요수: {feelingCount}</span>
      </Info>
    </Container>
  );
}

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  postId: PropTypes.number.isRequired,
  commentInfo: PropTypes.shape({
    img: PropTypes.string.isRequired,
    secret: PropTypes.bool.isRequired,
    writer: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    feeling: PropTypes.array.isRequired,
    replies: PropTypes.array.isRequired,
    parentId: PropTypes.number,
  }),
};

export default Comment;
