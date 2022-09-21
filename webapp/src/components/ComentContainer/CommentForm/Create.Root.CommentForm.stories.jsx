import React from 'react';
import CommentProvider from 'contexts/Comment/Comment.Provider';
import CreateRootCommentForm from './Create.Root.CommentForm';

export default {
  title: 'CATEGORY/CreateRootCommentForm',
  component: CreateRootCommentForm,
  args: {},
  layout: 'fullscreen',
};

function Template(args) {
  return (
    <CommentProvider>
      <CreateRootCommentForm {...args} />
    </CommentProvider>
  );
}

export const Default = Template.bind({});
Default.args = {};
