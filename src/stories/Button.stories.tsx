import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button, ButtonPropType } from '../components/common/Button/Button'

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: { onClick: { action: 'click' } },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args: ButtonPropType) => <Button {...args} />

export const Default = Template.bind({})

Default.args = {
  link: '',
  className: '',
  label: 'Click',
  isDisabled: false,
  type: 'button',
}
