import React from 'react';
import CommentProvider from 'contexts/Comment/Comment.Provider';
import CreateCommentForm from './Create.Root.CommentForm';

// Create.Root.CommentForm에서 import해왔지만 Create.Reply.CommentForm과 다른게 없어 CreateCommentForm으로 통합했습니다.
export default {
  title: 'component/Comment.CreateCommentForm',
  component: CreateCommentForm,
  args: {},
  layout: 'fullscreen',
};

function Template(args) {
  return (
    <CommentProvider>
      <CreateCommentForm {...args} />
    </CommentProvider>
  );
}

export const Default = Template.bind({});
Default.args = {};
