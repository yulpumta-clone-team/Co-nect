import React from 'react';
import CommentProvider from 'contexts/Comment/Comment.Provider';
import RootCommentElement from './Root.CommentElement';

export default {
  title: 'CATEGORY/RootCommentElement',
  component: RootCommentElement,
  args: {},
  layout: 'fullscreen',
};

function Template(args) {
  return (
    <CommentProvider>
      <RootCommentElement {...args} />
    </CommentProvider>
  );
}

export const Default = Template.bind({});
Default.args = {
  commentInfo: {
    id: 999,
    img: '',
    writer: '수정된',
    parentId: null,
    secret: false,
    content: '수정된 연습용 댓긇',
    feeling: [901092146501, 92719182999999, 927191821029312],
  },
  postWriter: 'front_temp',
  replies: [],
};

export const Secret = Template.bind({});
Secret.args = {
  commentInfo: {
    id: 999,
    img: '',
    writer: '수정된',
    parentId: null,
    secret: true,
    content: '수정된 연습용 댓긇',
    feeling: [901092146501, 92719182999999, 927191821029312],
  },
  postWriter: 'front_temp',
  replies: [],
};

export const WithReplies = Template.bind({});
WithReplies.args = {
  commentInfo: {
    id: 999,
    img: '',
    writer: '수정된',
    parentId: null,
    secret: false,
    content: '수정된 연습용 댓긇',
    feeling: [901092146501, 92719182999999, 927191821029312],
  },
  postWriter: 'front_temp',
  replies: [
    {
      id: 1012,
      img: '',
      userId: 123137777,
      writer: 'front_temp',
      parentId: 999,
      secret: true,
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
  ],
};
