import { DialogContainer } from './styles'

interface DialogProps {
  type?: string // message, warning
  message?: string
  acceptLabel?: string
  rejectLabel?: string
  onAccepted?: () => void
  onRejected?: () => void
}

const styles = (value: string) => {
    if ( value === 'warning') {
        return { 
            "icon" : "icon icon-60 icon-error icon-red-on-blue", 
            "button" : "btn-red" 
            }
    }
    else {
        return { 
            "icon" : "icon icon-60 icon-expired icon-light-blue", 
            "button" : "btn-blue" 
        }
    }
  }

const Dialog: React.FC<DialogProps> = ({
  type = 'message',
  message = 'Do you really want to perform this action',
  acceptLabel = 'Ok',
  rejectLabel = 'Cancel',
  onAccepted,
  onRejected
}: DialogProps): JSX.Element => {
  return (
    <DialogContainer>
      <div className='dialog'>
          <span className={styles(type).icon}></span>
          <p>{message}</p>
          <div className='cta'>
              <button className={styles(type).button} onClick={onAccepted}> {acceptLabel} </button>
              <button className='btn-transparent-grey' onClick={onRejected}> {rejectLabel} </button>
          </div>
      </div>
    </DialogContainer>

  )
}

export default Dialog
