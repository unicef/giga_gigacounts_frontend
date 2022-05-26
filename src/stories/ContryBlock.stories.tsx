import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CountryBlock } from './CountryBlock';

export default {
  title: 'Example/CountryBlock',
  component: CountryBlock,
} as ComponentMeta<typeof CountryBlock>;

const Template: ComponentStory<typeof CountryBlock> = (args) => <CountryBlock {...args} />;

export const Default = Template.bind({});
Default.args = {
  countryName: 'Argentina',
  countryPath: './flags/AR.svg',
  collapsed: false
};

export const Collapsed = Template.bind({});
Collapsed.args = {
  countryName: 'Argentina',
  countryPath: './flags/AR.svg',
  collapsed: true
}
