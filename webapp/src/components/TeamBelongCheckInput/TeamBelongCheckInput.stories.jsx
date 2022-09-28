import React, { useState } from 'react';
import TeamBelongCheckInput from './index';

export default {
  title: 'component/TeamBelongCheckInput',
  component: TeamBelongCheckInput,
  args: {},
  layout: 'fullscreen',
};

function Template(args) {
  const [value, setValue] = useState(true);
  const onChange = ({ name, value }) => {
    setValue(value);
  };
  return <TeamBelongCheckInput {...args} onChange={onChange} value={value} />;
}

export const Default = Template.bind({});
Default.args = {
  name: 'belongTeam',
  label: '팀 소속 여부',
};

export const LargeCustomButtonSize = Template.bind({});
LargeCustomButtonSize.args = {
  name: 'belongTeam',
  label: '팀 소속 여부',
  buttonSize: '60px',
};

export const SmallCustomButtonSize = Template.bind({});
SmallCustomButtonSize.args = {
  name: 'belongTeam',
  label: '팀 소속 여부',
  buttonSize: '20px',
};
