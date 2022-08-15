import React from 'react';
import { css } from 'styled-components';
import Button from './index';

export default {
  title: 'Common/Button',
  component: Button,
  args: {},
  layout: 'fullscreen',
};

function Template(args) {
  return <Button {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  children: <span>버튼</span>,
  theme: 'primary',
};

export const Primary = Template.bind({});
Primary.args = {
  children: <span>버튼</span>,
  theme: 'primary',
};

export const PrimaryWithCustomStyle = Template.bind({});
PrimaryWithCustomStyle.args = {
  children: <span>버튼</span>,
  theme: 'primary',
  customStyle: css`
    border: 3px solid black;
    background-color: tomato;
  `,
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: <span>버튼</span>,
  theme: 'secondary',
};

export const Important = Template.bind({});
Important.args = {
  children: <span>버튼</span>,
  theme: 'important',
};

export const Gray = Template.bind({});
Gray.args = {
  children: <span>버튼</span>,
  theme: 'gray',
};

// TODO: disabled일 때 피그마 추가되면 추가하기
// export const Disabled = Template.bind({});
// Disabled.args = {
//   children: <span>버튼</span>,
//   theme: 'primary',
//   disabled: true,
// };
