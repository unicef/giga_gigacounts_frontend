import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProfileIcon } from '../components/screens/Dashboard/ProfileIcon';

export default {
  title: 'Example/ProfileIcon',
  component: ProfileIcon,
} as ComponentMeta<typeof ProfileIcon>;

const Template: ComponentStory<typeof ProfileIcon> = (args) => <ProfileIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'Juan Pablo',
  role: 'Admin',
  collapsed: false,
};

export const Collapsed = Template.bind({});
Collapsed.args = {
  name: 'Juan Pablo',
  role: 'Admin',
  collapsed: true,
};
