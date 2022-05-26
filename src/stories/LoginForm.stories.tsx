import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { LoginForm } from './LoginForm';

export default {
  title: 'Example/LoginForm',
  component: LoginForm,
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm />;

export const Default = Template.bind({});
