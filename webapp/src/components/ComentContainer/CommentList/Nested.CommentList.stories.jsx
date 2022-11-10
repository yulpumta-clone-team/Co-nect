import React from 'react';
import CommentProvider from 'contexts/Comment/Comment.Provider';
import { userComments } from 'mocks/commentHandler.mock/userComments';
import RootCommentList from './Root.CommentList';
import CreateReplyCommentForm from '../CommentForm/Create.Reply.CommentForm';
import * as S from '../style';

export default {
  title: 'component/Root.NestedCommentList',
  component: RootCommentList,
  args: {},
  layout: 'fullscreen',
};

function Template(args) {
  return (
    <CommentProvider>
      <S.RootCommentBox>
        <RootCommentList {...args} />
        <CreateReplyCommentForm />
      </S.RootCommentBox>
    </CommentProvider>
  );
}

export const Default = Template.bind({});
Default.args = {
  postWriterId: 9021279491,
  comments: userComments,
};
