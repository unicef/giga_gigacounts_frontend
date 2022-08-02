import { DialogContainer, DialogBody, DialogCta } from './styles'

export enum DialogType {
  MESSAGE = 'message',
  WARNING = 'warning',
}
interface DialogProps {
  type?: DialogType
  message?: string
  acceptLabel?: string
  rejectLabel?: string
  onAccepted?: () => void
  onRejected?: () => void
}

const Dialog: React.FC<DialogProps> = ({
  type = DialogType.MESSAGE,
  message = 'Do you really want to perform this action',
  acceptLabel = 'Ok',
  rejectLabel = 'Cancel',
  onAccepted,
  onRejected,
}: DialogProps): JSX.Element => {
  return (
    <DialogContainer>
      <DialogBody>
        <span
          className={`icon icon-60 ${
            type === DialogType.MESSAGE ? 'icon-expired icon-light-blue' : 'icon-error icon-red-on-blue'
          }`}
        />
        <p>{message}</p>
        <DialogCta>
          <button className={type === DialogType.MESSAGE ? 'btn-blue' : 'btn-red'} onClick={onAccepted}>
            {acceptLabel}
          </button>
          <button className="btn-transparent-grey" onClick={onRejected}>
            {rejectLabel}
          </button>
        </DialogCta>
      </DialogBody>
    </DialogContainer>
  )
}

export default Dialog
