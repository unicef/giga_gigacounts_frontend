import { MessageContainer } from './styles'

interface MessageProps {
  type?: string // notice, warning, error
  title?: string
  description?: string
  onClose?: () => void
}

const bgColor = (value: string) => {
    let color
    switch (value) {
        case 'notice':
            color = 'var(--color-light-blue)'
            break
        case 'warning':
            color = 'var(--color-orange)'
            break
        case 'error':
            color = 'var(--color-red)'
            break
        default:
            color = 'var(--color-light-blue)'
    }
    return color
      
  }

const Message: React.FC<MessageProps> = ({
  type = 'notice',
  title = 'Title',
  description = 'Description',
  onClose
}: MessageProps): JSX.Element => {
  return (
    <MessageContainer color={bgColor(type)}>
      <div>
        <p><b>{title}</b></p>
        <span className='icon icon-24 icon-close icon-white-60' onClick={ onClose }></span>
      </div>
        <small>{description}</small>
    </MessageContainer>

  )
}

export default Message
