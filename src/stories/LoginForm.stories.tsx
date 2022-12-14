import { ComponentStory, ComponentMeta } from '@storybook/react'

import { LoginForm } from '../components/Login/LoginForm/LoginForm'

export default {
  title: 'Example/LoginForm',
  component: LoginForm,
} as ComponentMeta<typeof LoginForm>

const Template: ComponentStory<typeof LoginForm> = () => <LoginForm />

export const Default = Template.bind({})
