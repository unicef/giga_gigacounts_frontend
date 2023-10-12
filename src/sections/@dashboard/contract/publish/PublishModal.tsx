import { Modal } from '@carbon/react'
import { useEffect, useState } from 'react'
import { Translation, UserRoles } from 'src/@types'
import { getUsers } from 'src/api/user'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { PICTOGRAMS } from 'src/constants'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  open: boolean
  onClose: () => void
  onApproveManually: () => void
  onApproveSent: () => void
  ispId: string
  countryId: string
  isAutomatic: boolean
}
type PublishModalStep = 'choose' | 'manual' | 'send'

export default function PublishModal({
  open,
  onClose,
  onApproveManually,
  onApproveSent,
  ispId,
  countryId,
  isAutomatic
}: Props) {
  const { translate } = useLocales()
  const [publishModalStep, setPublishModalStep] = useState<PublishModalStep>('choose')
  const { spacing } = useTheme()
  const [disableApproveSent, setDisableApproveSent] = useState(true)
  const publishModalSteps: {
    [K in PublishModalStep]: {
      title: Translation
      content: Translation
      primaryText: Translation
      secondaryText: Translation
      onPrimarySubmit: () => void
      onSecondarySubmit: () => void
      primaryButtonDisabled: boolean
      disabledText?: Translation
    }
  } = {
    choose: {
      title: 'contract_published_modal.choose.title',
      content: 'contract_published_modal.choose.content',
      primaryText: 'contract_published_modal.choose.primaryText',
      secondaryText: 'contract_published_modal.choose.secondaryText',
      onPrimarySubmit: () => setPublishModalStep('send'),
      onSecondarySubmit: () => setPublishModalStep('manual'),
      primaryButtonDisabled: false
    },
    manual: {
      title: 'contract_published_modal.manual.title',
      content: 'contract_published_modal.manual.content',
      primaryText: 'contract_published_modal.manual.primaryText',
      secondaryText: 'contract_published_modal.manual.secondaryText',
      onPrimarySubmit: () => {
        onApproveManually()
        onClose()
        setPublishModalStep('choose')
      },
      onSecondarySubmit: () => setPublishModalStep('choose'),
      disabledText: 'contract_published_modal.manual.disabledText',
      primaryButtonDisabled: isAutomatic
    },
    send: {
      title: 'contract_published_modal.send.title',
      content: 'contract_published_modal.send.content',
      primaryText: 'contract_published_modal.send.primaryText',
      secondaryText: 'contract_published_modal.send.secondaryText',
      onPrimarySubmit: () => {
        onApproveSent()
        onClose()
        setPublishModalStep('choose')
      },
      onSecondarySubmit: () => setPublishModalStep('choose'),
      disabledText: 'contract_published_modal.send.disabledText',
      primaryButtonDisabled: !isAutomatic && disableApproveSent
    }
  } as const

  const activeModalStep = publishModalSteps[publishModalStep]
  const {
    content,
    onPrimarySubmit,
    onSecondarySubmit,
    primaryButtonDisabled,
    primaryText,
    secondaryText,
    title,
    disabledText
  } = activeModalStep

  useEffect(() => {
    if (!countryId || !ispId) return
    getUsers(countryId, [UserRoles.ISP_CONTRACT_MANAGER], false, ispId).then((res) =>
      setDisableApproveSent(res.length === 0)
    )
  }, [ispId, countryId])

  return (
    <>
      {countryId && ispId && (
        <Modal
          open={open}
          onRequestClose={onClose}
          onRequestSubmit={onPrimarySubmit}
          onSecondarySubmit={onSecondarySubmit}
          primaryButtonText={capitalizeFirstLetter(translate(primaryText))}
          secondaryButtonText={capitalizeFirstLetter(translate(secondaryText))}
          primaryButtonDisabled={primaryButtonDisabled}
        >
          <Stack
            style={{ paddingInline: spacing.xl }}
            alignItems="flex-start"
            justifyContent="center"
            gap={spacing.lg}
          >
            <PICTOGRAMS.TransactionalTrust style={{ alignSelf: 'center' }} width={84} height={84} />
            <Typography style={{ alignSelf: 'center' }} as="h4">
              {translate(title)}
            </Typography>
            <Typography as="h6">{translate(content)}</Typography>
            {primaryButtonDisabled && disabledText && (
              <Typography>{translate(disabledText)}</Typography>
            )}
          </Stack>
        </Modal>
      )}
    </>
  )
}
