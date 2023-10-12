import { Checkbox, Link, TextArea } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { useFormContext } from 'react-hook-form'
import { ContractForm, ICurrency, MetricCamel, MetricSnake, Translation } from 'src/@types'
import { IFrequency, IISP } from 'src/@types/general'
import AttachmentsList from 'src/components/attachment-list/AttachmentList'
import { ContractInfo } from 'src/components/contract-info'
import { ErrorList } from 'src/components/errors'
import { Panel } from 'src/components/panel'
import { QosCard } from 'src/components/qos-card'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { UserList } from 'src/components/user'
import { useBusinessContext } from 'src/context/business/BusinessContext'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { getDraftFromForm, getPublishErrors } from 'src/utils/contracts'
import { formatDate } from 'src/utils/date'
import { downloadFile } from 'src/utils/download'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { ContractSchoolsAndAttachments } from './types'

type Step4Props = {
  fields: ContractSchoolsAndAttachments
  changeTab: (value: 0 | 1 | 2 | 3) => void
  termsAndConditions: boolean
  setTermsAndConditions: Dispatch<SetStateAction<boolean>>
  currencies: ICurrency[]
  frequencies: IFrequency[]
  ispOptions: IISP[]
}

export default function Step4({
  fields,
  changeTab,
  termsAndConditions,
  setTermsAndConditions,
  currencies,
  frequencies,
  ispOptions
}: Step4Props) {
  const { getValues, setValue } = useFormContext<ContractForm>()
  const { countries } = useBusinessContext()
  const { translate, replaceTranslated } = useLocales()
  const { palette, spacing } = useTheme()
  const charLimit = 16

  const publishErrors = getPublishErrors(
    getDraftFromForm(currencies, {
      ...getValues(),
      ...fields
    })
  ).map((err) => replaceTranslated(err.message, '{{field}}', err.field as Translation))

  return (
    <Stack gap={spacing.xs}>
      <Panel label={translate('contract_details')} style={{ marginTop: 0 }}>
        <Stack orientation="vertical" gap={spacing.lg}>
          <Stack
            orientation="horizontal"
            alignItems="center"
            justifyContent="space-between"
            gap={spacing.lg}
          >
            <ContractInfo
              style={{ width: '33%' }}
              charLimit={charLimit}
              title={translate('contract_name')}
              value={getValues('name')}
            />
            <ContractInfo
              style={{ width: '33%' }}
              charLimit={charLimit}
              title={translate('contract_id')}
              value={getValues('id')}
            />
            <ContractInfo
              style={{ width: '33%' }}
              charLimit={charLimit}
              title={translate('country')}
              value={countries.find((c) => c.id === getValues('country'))?.name ?? ''}
            />
          </Stack>
          <Stack
            orientation="horizontal"
            alignItems="center"
            justifyContent="space-between"
            gap={spacing.lg}
          >
            <ContractInfo
              style={{ width: '33%' }}
              charLimit={charLimit}
              title={translate('internet_provider')}
              value={ispOptions.find((i) => i.id === getValues('isp'))?.name ?? ''}
            />
          </Stack>
          <Stack
            orientation="horizontal"
            alignItems="center"
            justifyContent="space-between"
            gap={spacing.lg}
          >
            <ContractInfo
              style={{ width: '33%' }}
              charLimit={charLimit}
              title={translate('start_date')}
              value={getValues('startDate') ? formatDate(getValues('startDate')) : ''}
            />
            <ContractInfo
              style={{ width: '33%' }}
              charLimit={charLimit}
              title={translate('end_date')}
              value={getValues('endDate') ? formatDate(getValues('endDate')) : ''}
            />
            <ContractInfo
              style={{ width: '33%' }}
              charLimit={charLimit}
              title={translate('launch_date')}
              value={getValues('launchDate') ? formatDate(getValues('launchDate')) : ''}
            />
          </Stack>
        </Stack>
      </Panel>

      <Panel label={translate('isp_contacts')}>
        <UserList
          users={fields.contacts}
          paymentRecieverId={Number(getValues('paymentReceiverId'))}
        />
      </Panel>
      <Panel label={translate('contract_team')}>
        <UserList users={fields.stakeholders} />
      </Panel>

      <Panel label={translate('documents_and_attachments')}>
        <AttachmentsList
          attachments={fields.attachments.map((a) => ({ ...a, status: 'complete' }))}
        />
      </Panel>

      <Panel label={translate('schools_and_budget')}>
        <Stack orientation="vertical" gap={spacing.lg}>
          <Stack
            orientation="horizontal"
            alignItems="center"
            justifyContent="space-between"
            gap={spacing.lg}
          >
            <ContractInfo
              style={{ width: '33%' }}
              charLimit={charLimit}
              title={translate('budget')}
              value={`${
                currencies.find((c) => c.id === getValues('currency'))?.code ?? ''
              } ${getValues('budget')}`}
            />
            <ContractInfo
              style={{ width: '33%' }}
              charLimit={charLimit}
              title={translate('schools')}
              link={translate('see_all_schools')}
              value={`${String(fields.schools.length)} ${translate('schools')}`}
              onClickLink={() => changeTab(1)}
            />
            <ContractInfo
              style={{ width: '33%' }}
              charLimit={charLimit}
              title={translate('payment_frequency')}
              value={frequencies.find((f) => f.id === getValues('frequencyId'))?.name}
            />
          </Stack>
        </Stack>
      </Panel>

      <Panel label={translate('quality_of_service')}>
        <Stack alignItems="center" justifyContent="center" orientation="vertical" gap={spacing.md}>
          <Stack orientation="horizontal" gap={spacing.md}>
            <QosCard
              width={300}
              name={MetricSnake.Uptime}
              subtitle={capitalizeFirstLetter(translate('agreement'))}
              value={getValues(MetricCamel.Uptime)}
              style={{ backgroundColor: palette.background.neutral }}
            />
            <QosCard
              width={300}
              name={MetricSnake.Latency}
              subtitle={capitalizeFirstLetter(translate('agreement'))}
              value={getValues(MetricCamel.Latency)}
              style={{ backgroundColor: palette.background.neutral }}
            />
          </Stack>
          <Stack orientation="horizontal" gap={spacing.md}>
            <QosCard
              width={300}
              name={MetricSnake.UploadSpeed}
              subtitle={capitalizeFirstLetter(translate('agreement'))}
              value={getValues(MetricCamel.UploadSpeed)}
              style={{ backgroundColor: palette.background.neutral }}
            />
            <QosCard
              width={300}
              name={MetricSnake.DownloadSpeed}
              subtitle={capitalizeFirstLetter(translate('agreement'))}
              value={getValues(MetricCamel.DownloadSpeed)}
              style={{ backgroundColor: palette.background.neutral }}
            />
          </Stack>
        </Stack>
      </Panel>

      <Panel label={translate('comment_section.title')}>
        <TextArea
          labelText=""
          name="notes"
          placeholder={translate('comment_section.placeholder')}
          rows={6}
          onChange={(e) => {
            setValue('notes', e.target.value)
          }}
          maxCount={1000}
          enableCounter
        />
      </Panel>
      <ErrorList title={translate('publish_error')} errorMessages={publishErrors} />
      <Checkbox
        disabled={publishErrors.length > 0}
        checked={termsAndConditions}
        id="accept terms and conditions checkbox"
        labelText={
          <Typography variant={publishErrors.length > 0 ? 'disabled' : 'default'} size={14}>
            {translate('wallet_external_component.connect.selectingWallet.agreement.agree')}{' '}
            <Link
              style={{ cursor: 'pointer' }}
              onClick={() => downloadFile('/assets/docs/terms_and_conditions.pdf', 'terms and conditions')}
            >
              {translate('wallet_external_component.connect.selectingWallet.agreement.terms')}
            </Link>{' '}
            {translate('wallet_external_component.connect.selectingWallet.agreement.and')}{' '}
            <Link
              style={{ cursor: 'pointer' }}
              onClick={() => downloadFile('/assets/docs/privacy_policy.pdf', 'privacy policy')}
            >
              {translate('wallet_external_component.connect.selectingWallet.agreement.privacy')}
            </Link>
          </Typography>
        }
        onChange={() => setTermsAndConditions((prev) => !prev)}
      />
    </Stack>
  )
}
