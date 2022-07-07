import { ComponentStory, ComponentMeta } from '@storybook/react'
import Country, { CountryBlockProps } from '../components/Dashboard/Country/Country'

export default {
  title: 'Example/Country',
  component: Country,
} as ComponentMeta<typeof Country>

const Template: ComponentStory<typeof Country> = (args: CountryBlockProps) => <Country {...args} />

export const Default = Template.bind({})

Default.args = {
  countryName: 'Argentina',
  countryPath: './flags/AR.svg',
  collapsed: false,
}

export const Collapsed = Template.bind({})

Collapsed.args = {
  countryName: 'Argentina',
  countryPath: './flags/AR.svg',
  collapsed: true,
}
