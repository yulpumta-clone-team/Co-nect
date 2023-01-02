import React from 'react';
import CommentProvider from 'contexts/Comment/Comment.Provider';
import { userComment } from 'mocks/commentHandler.mock/userComments';
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
  postWriterId: 9021279491,
  commentInfo: userComment,
};
