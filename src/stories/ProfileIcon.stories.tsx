import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ProfileIcon, NavItemProps } from '../components/Dashboard/Navigation/ProfileIcon/ProfileIcon'

export default {
  title: 'Example/ProfileIcon',
  component: ProfileIcon,
} as ComponentMeta<typeof ProfileIcon>

const Template: ComponentStory<typeof ProfileIcon> = (args: NavItemProps) => <ProfileIcon {...args} />

export const Default = Template.bind({})

Default.args = {
  name: 'Juan Pablo',
  role: 'Admin',
  collapsed: false,
}

export const Collapsed = Template.bind({})

Collapsed.args = {
  name: 'Juan Pablo',
  role: 'Admin',
  collapsed: true,
}
