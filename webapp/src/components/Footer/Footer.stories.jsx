import React from 'react';
import Footer from './index';

export default {
  title: 'Component/Footer',
  component: Footer,
  layout: 'fullscreen',
};

function Template(args) {
  return <Footer {...args} />;
}

export const Default = Template.bind({});
Default.args = {};
