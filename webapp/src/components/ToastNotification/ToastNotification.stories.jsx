import React from 'react';
import ToastNotification from './index';

export default {
  title: 'component/ToastNotification',
  component: ToastNotification,
  args: {},
  layout: 'fullscreen',
};

function Template(args) {
  return <ToastNotification {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  toastList: [
    { id: 1, type: 'Success', description: '성공' },
    { id: 2, type: 'Error', description: '에러' },
    { id: 3, type: 'Warning', description: '경고' },
    { id: 4, type: 'Info', description: '알림' },
  ],
  col: 'top',
  row: 'right',
  autoDelete: false,
  deleteCallback: () => {},
};
