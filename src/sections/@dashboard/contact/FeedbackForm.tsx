import {
  Clean,
  FaceActivated,
  FaceCool,
  FaceDissatisfied,
  FaceNeutral,
  FaceSatisfied,
  SendAlt
} from '@carbon/icons-react'
import { Button, TextArea } from '@carbon/react'
import { FeedbackForm as FeedbackFormType } from 'src/@types'
import { sendFeedback } from 'src/api/feedback'
import FormProvider from 'src/components/hook-form/FormProvider'
import { Stack } from 'src/components/stack'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { useFeedbackSchema } from 'src/validations/feedback'

export default function FeedbackForm() {
  const { translate } = useLocales()
  const { spacing } = useTheme()
  const { pushSuccess, pushError } = useSnackbar()

  const methods = useFeedbackSchema()
  const { setValue, handleSubmit, reset, watch } = methods

  const handleReset = () => reset()

  const handlePost = (ticket: FeedbackFormType) => {
    sendFeedback(ticket)
      .then(() => pushSuccess('push.sent_feedback'))
      .catch(() => pushError('push.sent_feedback_error'))

    handleReset()
  }
  const buttons = [
    {
      value: 1,
      icon: FaceDissatisfied,
      iconDescription: 'I feel dissatisfied'
    },
    {
      value: 2,
      icon: FaceNeutral,
      iconDescription: 'It could be better'
    },
    {
      value: 3,
      icon: FaceSatisfied,
      iconDescription: 'I like it'
    },
    {
      value: 4,
      icon: FaceActivated,
      iconDescription: 'I like it a lot'
    },
    {
      value: 5,
      icon: FaceCool,
      iconDescription: 'I love it'
    }
  ]

  return (
    <FormProvider style={{ width: '100%' }} methods={methods} onSubmit={handleSubmit(handlePost)}>
      <Stack orientation="vertical" gap={spacing.xl}>
        <Stack
          style={{ width: '100%', padding: spacing.xl }}
          orientation="horizontal"
          justifyContent="center"
          alignItems="center"
          gap={spacing.md}
        >
          {buttons.map((b) => (
            <Button
              className="btn-max-width-limit"
              renderIcon={b.icon}
              kind={watch().rate === b.value ? 'primary' : 'tertiary'}
              key={b.value}
              onClick={() => setValue('rate', b.value)}
              size="xl"
              style={{ width: '20%' }}
              iconDescription={b.iconDescription}
            />
          ))}
        </Stack>
        <TextArea
          labelText=""
          name="comment"
          placeholder={translate('ticket.description.placeholder')}
          rows={4}
          value={watch().comment}
          onChange={(e) => {
            setValue('comment', e.target.value)
          }}
          maxCount={5000}
          enableCounter
        />
        <Stack orientation="horizontal" gap={0}>
          <Button
            style={{ width: '50%' }}
            className="btn-max-width-limit"
            size="sm"
            renderIcon={Clean}
            iconDescription={capitalizeFirstLetter(translate('clean_form'))}
            kind="secondary"
            onClick={handleReset}
          >
            {capitalizeFirstLetter(translate('clean_form'))}
          </Button>
          <Button
            className="btn-max-width-limit"
            style={{ width: '50%' }}
            size="sm"
            renderIcon={SendAlt}
            iconDescription={capitalizeFirstLetter(translate('send'))}
            type="submit"
          >
            {capitalizeFirstLetter(translate('send'))}
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  )
}
