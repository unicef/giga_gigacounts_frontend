import { MessageContainer } from './styles'

export enum MessageType {
  NOTICE = 'notice',
  WARNING = 'warning',
  ERROR = 'error',
}

interface MessageProps {
  type?: MessageType
  title?: string
  description?: string
  onClose?: () => void
}

const Message: React.FC<MessageProps> = ({
  type = MessageType.NOTICE,
  title = 'Title',
  description = 'Description',
  onClose,
}: MessageProps): JSX.Element => {
  return (
    <MessageContainer color={type}>
      <div>
        <p>
          <b>{title}</b>
        </p>
        <span className="icon icon-24 icon-close icon-white-60" onClick={onClose}></span>
      </div>
      <small>{description}</small>
    </MessageContainer>
  )
}

export default Message
