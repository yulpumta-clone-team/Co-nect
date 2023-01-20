import React from 'react';
import CommentProvider from 'contexts/Comment/Comment.Provider';
import { createComment } from 'mocks/commentHandler.mock/comment.mock';
import RootCommentElement from './Root.CommentElement';

export default {
  title: 'component/Comment.RootCommentElement',
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

const comment = createComment();

export const Default = Template.bind({});
Default.args = {
  postWriterId: 9021279491,
  commentInfo: { ...comment, secret: false, replies: [] },
};

export const Secret = Template.bind({});
Secret.args = {
  postWriterId: 9021279491,
  commentInfo: { ...comment, secret: true, replies: [] },
};

export const WithReplies = Template.bind({});
WithReplies.args = {
  postWriterId: 9021279491,
  commentInfo: { ...comment, secret: false },
};
