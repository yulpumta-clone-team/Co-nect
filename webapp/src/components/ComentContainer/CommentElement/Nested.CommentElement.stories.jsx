import React from 'react';
import CommentProvider from 'contexts/Comment/Comment.Provider';
import NestedCommentElement from './Nested.CommentElement';
import * as S from '../style';

export default {
  title: 'component/Comment.NestedCommentElement',
  component: NestedCommentElement,
  args: {},
  layout: 'fullscreen',
};

function Template(args) {
  return (
    <CommentProvider>
      <S.RootCommentBox>
        <S.NestedListContainer>
          <NestedCommentElement {...args} />
        </S.NestedListContainer>
      </S.RootCommentBox>
    </CommentProvider>
  );
}

export const Default = Template.bind({});
Default.args = {
  commentId: 10,
  postWriter: 'front_temp',
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
