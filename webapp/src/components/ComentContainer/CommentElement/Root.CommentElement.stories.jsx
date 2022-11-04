import React from 'react';
import CommentProvider from 'contexts/Comment/Comment.Provider';
import { userComment } from 'mocks/commentHandler.mock/userComments';
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

export const Default = Template.bind({});
Default.args = {
  postWriterId: 9021279491,
  commentInfo: { ...userComment, secret: false, replies: [] },
};

export const Secret = Template.bind({});
Secret.args = {
  postWriterId: 9021279491,
  commentInfo: { ...userComment, secret: true, replies: [] },
};

export const WithReplies = Template.bind({});
WithReplies.args = {
  postWriterId: 9021279491,
  commentInfo: { ...userComment, secret: false },
};
