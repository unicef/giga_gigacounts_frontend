import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NavItem } from '../components/screens/Dashboard/NavItem';

export default {
  title: 'Example/NavItem',
  component: NavItem,
} as ComponentMeta<typeof NavItem>;

const Template: ComponentStory<typeof NavItem> = (args) => <NavItem {...args} />;

export const Selected = Template.bind({});
Selected.args = {
  label: 'Selected',
  number: '5',
  selected: true,
  collapsed: false,
  iconPath: './icons/list.svg'
};

export const Default = Template.bind({});
Default.args = {
  label: 'Unselected',
  collapsed: false,
  number: '5',
  iconPath: './icons/list.svg'
};

export const Collapsed = Template.bind({});
Collapsed.args = {
    collapsed: true,
    iconPath: './icons/list.svg'
}
