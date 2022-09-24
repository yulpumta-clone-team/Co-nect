import React from 'react';
import CommentProvider from 'contexts/Comment/Comment.Provider';
import NestedCommentList from './Nested.CommentList';
import * as S from '../style';
import CreateReplyCommentForm from '../CommentForm/Create.Reply.CommentForm';

export default {
  title: 'CATEGORY/NestedCommentList',
  component: NestedCommentList,
  args: {},
  layout: 'fullscreen',
};

function Template(args) {
  return (
    <CommentProvider>
      <S.RootCommentBox>
        <NestedCommentList {...args} />
        <CreateReplyCommentForm />
      </S.RootCommentBox>
    </CommentProvider>
  );
}

export const Default = Template.bind({});
Default.args = {
  postWriter: 'front_temp',
  comments: [
    {
      id: 10,
      img: '',
      userId: 12512512,
      writer: 'front_temp',
      parentId: 999,
      secret: false,
      content: '연습용',
      feeling: [901092146501],
    },
    {
      id: 12,
      img: '',
      userId: 12512512,
      writer: 'string',
      parentId: 999,
      secret: false,
      content: '수정된',
      feeling: [784833333333, 19148710],
    },
  ],
};
