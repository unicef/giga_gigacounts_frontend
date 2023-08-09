import { Checkbox, Column, FlexGrid, Row, TextArea } from '@carbon/react'
import { Dispatch, SetStateAction } from 'react'
import { useFormContext } from 'react-hook-form'
import { ICurrency } from 'src/@types'
import AttachmentsList from 'src/components/attachment-list/AttachmentList'
import { ContractInfo } from 'src/components/contract-info'
import { ErrorList } from 'src/components/errors'
import { Panel } from 'src/components/panel'
import { QosCard } from 'src/components/qos-card'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { useBusinessContext } from 'src/context/BusinessContext'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { formatDate } from 'src/utils/date'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { ContractSchoolsAndAttachments } from './types'

type Step4Props = {
  fields: ContractSchoolsAndAttachments
  changeTab: (value: 0 | 1 | 2 | 3) => void
  publishErrors: string[]
  termsAndConditions: boolean
  setTermsAndConditions: Dispatch<SetStateAction<boolean>>
  currencies: ICurrency[]
}

export default function Step4({
  fields,
  changeTab,
  publishErrors,
  termsAndConditions,
  setTermsAndConditions,
  currencies
}: Step4Props) {
  const { getValues, setValue } = useFormContext()
  const { countries } = useBusinessContext()
  const { translate } = useLocales()
  const { palette, spacing } = useTheme()
  const charLimit = 16
  const { ltas, internetProviders } = useBusinessContext()

  return (
    <Stack gap={spacing.xs}>
      <Panel label={translate('contract_details')}>
        <Stack orientation="vertical" gap={spacing.lg}>
          <FlexGrid narrow className="remove-gutters-2-columns" orientation="horizontal">
            <Row>
              <Column>
                <Stack gap={spacing.lg}>
                  <ContractInfo
                    charLimit={charLimit}
                    title={translate('contract_name')}
                    value={getValues('name')}
                  />
                  <ContractInfo
                    charLimit={charLimit}
                    title="ISP contact person"
                    value="Joe johnsons"
                  />
                </Stack>
              </Column>
              <Column>
                <Stack gap={spacing.lg}>
                  <ContractInfo
                    charLimit={charLimit}
                    title={translate('contract_id')}
                    value={getValues('id')}
                  />
                  <ContractInfo
                    charLimit={charLimit}
                    title={translate('internet_provider')}
                    value={internetProviders.find((i) => i.id === getValues('isp'))?.name ?? ''}
                  />
                </Stack>
              </Column>
              <Column>
                <Stack gap={spacing.lg}>
                  <ContractInfo
                    charLimit={charLimit}
                    title={translate('country')}
                    value={countries.find((c) => c.id === getValues('country'))?.name ?? ''}
                  />
                  <ContractInfo
                    charLimit={charLimit}
                    title={translate('lta')}
                    value={ltas.find((lta) => getValues('ltaId') === lta.id)?.name ?? ''}
                  />
                </Stack>
              </Column>
            </Row>
          </FlexGrid>
          <FlexGrid narrow className="remove-gutters-2-columns" orientation="horizontal">
            <Row>
              <Column>
                <Stack gap={spacing.xs}>
                  <ContractInfo
                    charLimit={charLimit}
                    title={translate('start_date')}
                    value={getValues('startDate') ? formatDate(getValues('startDate')) : ''}
                  />
                </Stack>
              </Column>
              <Column>
                <Stack gap={spacing.xs}>
                  <ContractInfo
                    charLimit={charLimit}
                    title={translate('end_date')}
                    value={getValues('endDate') ? formatDate(getValues('endDate')) : ''}
                  />
                </Stack>
              </Column>
              <Column>
                <Stack gap={spacing.xs}>
                  <ContractInfo
                    charLimit={charLimit}
                    title={translate('launch_date')}
                    value={getValues('launchDate') ? formatDate(getValues('launchDate')) : ''}
                  />
                </Stack>
              </Column>
            </Row>
          </FlexGrid>
        </Stack>
      </Panel>

      <Panel label={translate('isp_contacts')}>
        {/* {fields.contacts.map(c=>({}))} */}
        <Typography as="span" variant="disabled">
          {translate('no_collaborators_added')}
        </Typography>
      </Panel>
      <Panel label={translate('contract_team')}>
        {/* {fields.stakeholders.map(c=>({}))} */}
        <Typography as="span" variant="disabled">
          {translate('no_collaborators_added')}
        </Typography>
      </Panel>

      <Panel label={translate('documents_and_attachments')}>
        <Stack orientation="vertical" gap={spacing.lg}>
          {fields.attachments.length > 0 ? (
            <AttachmentsList status="complete" attachments={fields.attachments} />
          ) : (
            <h5>{translate('no_attachments_added')}</h5>
          )}
        </Stack>
      </Panel>

      <Panel label={translate('schools_and_budget')}>
        <FlexGrid narrow className="remove-gutters-2-columns" orientation="horizontal">
          <Stack gap={spacing.md}>
            <Row>
              <Column>
                <ContractInfo
                  charLimit={charLimit}
                  title={translate('budget')}
                  value={`${
                    currencies.find((c) => c.id === getValues('currency'))?.code ?? ''
                  } ${getValues('budget')}`}
                />
              </Column>
              <Column>
                <ContractInfo
                  charLimit={charLimit}
                  title={translate('schools')}
                  link={translate('see_all_schools')}
                  value={`${String(fields.schools.length)} ${translate('schools')}`}
                  onClickLink={() => changeTab(1)}
                />
              </Column>
            </Row>
          </Stack>
        </FlexGrid>
      </Panel>

      <Panel label={translate('quality_of_service')}>
        <FlexGrid
          narrow
          className="remove-gutters-2-columns"
          orientation="horizontal"
          gap={spacing.xs}
        >
          <Row>
            <Column>
              <Stack gap={spacing.md}>
                <QosCard
                  width={300}
                  name="uptime"
                  subtitle={capitalizeFirstLetter(translate('agreement'))}
                  value={getValues('uptime')}
                  style={{ backgroundColor: palette.background.neutral }}
                />
                <QosCard
                  width={300}
                  name="upload_speed"
                  subtitle={capitalizeFirstLetter(translate('agreement'))}
                  value={getValues('uploadSpeed')}
                  style={{ backgroundColor: palette.background.neutral }}
                />
              </Stack>
            </Column>
            <Column>
              <Stack gap={spacing.md}>
                <QosCard
                  width={300}
                  name="latency"
                  subtitle={capitalizeFirstLetter(translate('agreement'))}
                  value={getValues('latency')}
                  style={{ backgroundColor: palette.background.neutral }}
                />
                <QosCard
                  width={300}
                  name="download_speed"
                  subtitle={capitalizeFirstLetter(translate('agreement'))}
                  value={getValues('downloadSpeed')}
                  style={{ backgroundColor: palette.background.neutral }}
                />
              </Stack>
            </Column>
          </Row>
        </FlexGrid>
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
        labelText={capitalizeFirstLetter(translate('accept_the_terms'))}
        onChange={() => setTermsAndConditions((prev) => !prev)}
      />
    </Stack>
  )
}
