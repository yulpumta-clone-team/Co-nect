import React from 'react';
import CommentProvider from 'contexts/Comment/Comment.Provider';
import NestedCommentElement from './Nested.CommentElement';
import * as S from '../style';

export default {
  title: 'CATEGORY/NestedCommentElement',
  component: NestedCommentElement,
  args: {},
  layout: 'fullscreen',
};

function Template(args) {
  return (
    <CommentProvider>
      <S.CommentContainer>
        <NestedCommentElement {...args} />
      </S.CommentContainer>
    </CommentProvider>
  );
}

export const Default = Template.bind({});
Default.args = {
  commentId: 10,
  commentInfo: {
    img: '',
    userId: 12512512,
    writer: 'front_temp',
    parentId: 999,
    secret: false,
    content: '연습용',
    feeling: [901092146501],
  },
};
