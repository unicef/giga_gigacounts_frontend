import { Modal } from '@carbon/react'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'

type CancelDialogProps = {
  open: boolean
  onCancel: () => void
  onDismiss: () => void
  title: string
  content: string
}

export default function CancelDialog({
  open,
  onCancel,
  onDismiss,
  title,
  content
}: CancelDialogProps) {
  const { translate } = useLocales()
  return (
    <Modal
      open={open}
      danger
      modalHeading={content}
      modalLabel={title}
      primaryButtonText={capitalizeFirstLetter(translate('yes'))}
      secondaryButtonText={capitalizeFirstLetter(translate('no'))}
      onRequestClose={onDismiss}
      onRequestSubmit={onCancel}
    />
  )
}
