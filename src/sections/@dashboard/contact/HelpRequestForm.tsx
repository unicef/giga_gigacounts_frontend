import { Button, TextArea } from '@carbon/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  HelpRequestForm as HelpRequestFormType,
  HelpRequestFunctionality,
  HelpRequestPossibleValue,
  Translation
} from 'src/@types'
import {
  getHelpRequestFunctionalities,
  getHelpRequestPossibleValues,
  sendHelpRequest
} from 'src/api/help-request'
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
  const navigate = useNavigate()
  const { translate } = useLocales()
  const { spacing } = useTheme()
  const { pushSuccess, pushError } = useSnackbar()

  const [possibleValues, setPossibleValues] = useState<HelpRequestPossibleValue[]>([])
  const [possibleFunctionalities, setPossibleFunctionalities] = useState<
    HelpRequestFunctionality[]
  >([])
  const [selectedCode, setSelectedCode] = useState('bug')
  const [selectedType, setSelectedTyp] = useState('display')

  useEffect(() => {
    getHelpRequestFunctionalities()
      .then(setPossibleFunctionalities)
      .catch((err) => redirectOnError(err, navigate))
    getHelpRequestPossibleValues()
      .then(setPossibleValues)
      .catch((err) => redirectOnError(err, navigate))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const methods = useHelpRequestSchema()
  const { setValue, resetField, handleSubmit, reset, watch } = methods

  const handleReset = () => reset()

  const handlePost = (ticket: HelpRequestFormType) => {
    if (!ticket.code || !ticket.type) return
    sendHelpRequest(ticket)
      .then(() => pushSuccess('push.sent_help_request'))
      .catch(() => pushError('push.sent_help_request_error'))

    handleReset()
  }

  return (
    <FormProvider style={{ width: '100%' }} methods={methods} onSubmit={handleSubmit(handlePost)}>
      <Stack orientation="vertical" gap={spacing.xl}>
        <RHFSelect
          id="help request code selection"
          options={possibleValues.map((t) => ({
            label: capitalizeFirstLetter(translate(`help_request.${t.code}` as Translation)),
            value: t.code
          }))}
          onChange={(e) => {
            if (e.selectedItem?.value !== selectedCode) resetField('type')
            setValue('code', e.selectedItem?.value ?? 'bug')
            setSelectedCode(e.selectedItem?.value ?? 'bug')
          }}
          name="code"
          label={translate('ticket.code')}
        />

        <RHFSelect
          id="feedback type selection"
          options={
            !selectedCode || selectedCode === 'other'
              ? []
              : (possibleValues.find((t) => t.code === selectedCode)?.option ?? []).map((t) => ({
                  label: capitalizeFirstLetter(translate(`help_request.types.${t}` as Translation)),
                  value: t
                }))
          }
          onChange={(e) => {
            if (!selectedType || selectedType === 'new_feature') resetField('functionality')
            setValue('type', e.selectedItem?.value ?? 'display')
            setSelectedTyp(e.selectedItem?.value ?? 'display')
          }}
          name="type"
          label={translate('ticket.type')}
          disabled={!selectedCode || selectedCode === 'other'}
        />

        <RHFSelect
          disabled={!selectedType || selectedType === 'new_feature'}
          id="help request functionality select"
          options={possibleFunctionalities.map((f) => ({
            label: translate(`functionalities.${f.code}` as Translation),
            value: f.code
          }))}
          name="functionality"
          label={translate('functionality')}
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
            disabled={!selectedCode || !selectedType}
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
