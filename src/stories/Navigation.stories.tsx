import { ComponentStory, ComponentMeta } from '@storybook/react'
import Navigation, { CountryProps } from '../components/Dashboard/Navigation/Navigation'

export default {
  title: 'Example/Navigation',
  component: Navigation,
} as ComponentMeta<typeof Navigation>

const Template: ComponentStory<typeof Navigation> = (args: CountryProps) => <Navigation {...args} />

export const Default = Template.bind({})

Default.args = {
  admin: false,
  countryName: 'Argentina',
  countryPath: './flags/AR.svg',
}

export const Admin = Template.bind({})

Admin.args = {
  admin: true,
}
