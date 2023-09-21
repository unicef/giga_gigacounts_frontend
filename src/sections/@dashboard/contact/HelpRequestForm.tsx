import { Button, TextArea } from '@carbon/react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import {
  HelpRequestForm as HelpRequestFormType,
  HelpRequestPossibleValue,
  Translation
} from 'src/@types'
import { getHelpRequestPossibleValues, sendHelpRequest } from 'src/api/help-request'
import { RHFSelect } from 'src/components/hook-form'
import FormProvider from 'src/components/hook-form/FormProvider'
import { Stack } from 'src/components/stack'
import { ICONS } from 'src/constants'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { useLocales } from 'src/locales'
import { redirectOnError } from 'src/pages/errors/handlers'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { useHelpRequestSchema } from 'src/validations/help-request'

export default function HelpRequestForm() {
  const { translate } = useLocales()
  const { spacing } = useTheme()
  const navigate = useNavigate()
  const { pushSuccess, pushError } = useSnackbar()
  const { state, pathname } = useLocation()

  const [possibleValues, setPossibleValues] = useState<HelpRequestPossibleValue[]>([])

  useEffect(() => {
    getHelpRequestPossibleValues()
      .then(setPossibleValues)
      .catch((err) => redirectOnError(err, navigate))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const methods = useHelpRequestSchema()
  const { setValue, getValues, handleSubmit, reset, watch } = methods
  const type = getValues('type')

  const handleReset = () => reset()

  const handlePost = (ticket: HelpRequestFormType) => {
    sendHelpRequest({ ...ticket, path: state?.previousPath ?? pathname })
      .then(() => pushSuccess('push.sent_help_request'))
      .catch(() => pushError('push.sent_help_request_error'))
    handleReset()
  }

  return (
    <FormProvider style={{ width: '100%' }} methods={methods} onSubmit={handleSubmit(handlePost)}>
      <Stack orientation="vertical" gap={spacing.xl}>
        <RHFSelect
          style={{ paddingBlock: spacing.md }}
          id="feedback type selection"
          options={(possibleValues.find((t) => t.code === 'bug')?.option ?? []).map((t) => ({
            label: capitalizeFirstLetter(translate(`help_request.types.${t}` as Translation)),
            value: t
          }))}
          name="type"
          label={translate('ticket.type')}
        />

        <TextArea
          labelText=""
          name="description"
          placeholder={translate('ticket.description.placeholder')}
          rows={4}
          onChange={(e) => {
            setValue('description', e.target.value)
          }}
          value={watch().description}
          maxCount={1000}
          enableCounter
        />
        <Stack orientation="horizontal" gap={0}>
          <Button
            style={{ width: '50%' }}
            className="btn-max-width-limit"
            size="sm"
            renderIcon={ICONS.Clean}
            iconDescription={capitalizeFirstLetter(translate('clean_form'))}
            kind="secondary"
            onClick={handleReset}
          >
            {capitalizeFirstLetter(translate('clean_form'))}
          </Button>
          <Button
            disabled={!type}
            className="btn-max-width-limit"
            style={{ width: '50%' }}
            size="sm"
            renderIcon={ICONS.Send}
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
