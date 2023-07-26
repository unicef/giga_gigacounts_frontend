import { Column, FlexGrid, Row, TextArea } from '@carbon/react'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ContractForm, IFrequency } from 'src/@types'
import { getFrequencies } from 'src/api/payments'
import { RHFRadioGroupButtons, RHFSelect } from 'src/components/hook-form'
import { Typography } from 'src/components/typography'
import SectionTitle from 'src/components/typography/SectionTitle'
import { Translation, useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter, uncapitalizeFirstLetter } from 'src/utils/strings'

type Step3Props = {
  handlePost: (contractForm: ContractForm) => Promise<boolean>
}

const DOWNLOAD_OPTIONS = [50, 30, 20]
const UPLOAD_OPTIONS = [30, 20, 10]
const LATENCY_OPTIONS = [50, 100, 200, 300]
const UPTIME_OPTIONS = [100, 98, 96, 94]

export default function Step3({ handlePost }: Step3Props) {
  const { translate } = useLocales()
  const { spacing } = useTheme()
  const { getValues, setValue } = useFormContext<ContractForm>()
  const [frequencies, setFrequencies] = useState<IFrequency[]>([])
  useEffect(() => {
    getFrequencies().then(setFrequencies)
  }, [])

  return (
    <>
      <SectionTitle label={translate('quality_of_service_terms')} style={{ paddingBottom: 0 }} />
      <Typography variant="disabled" style={{ paddingBottom: spacing.xl }}>
        {translate('add_the_terms_agreed')}
      </Typography>
      <FlexGrid
        narrow
        className="remove-gutters-2-columns"
        orientation="horizontal"
        gap={spacing.xs}
      >
        <Row>
          <Column>
            <RHFRadioGroupButtons
              id={`uptime selection ${getValues('id')}`}
              onBlur={() => handlePost(getValues())}
              onClick={(value) => handlePost({ ...getValues(), uptime: value })}
              type="number"
              labelText={`${translate('uptime')} %`}
              direction="horizontal"
              spacing={8}
              name="uptime"
              options={UPTIME_OPTIONS.map((o) => ({ label: `${o}`, value: o }))}
            />
          </Column>
          <Column>
            <RHFRadioGroupButtons
              id={`latency selection ${getValues('id')}`}
              onBlur={() => handlePost(getValues())}
              onClick={(value) => handlePost({ ...getValues(), latency: value })}
              type="number"
              labelText={`${translate('latency')} Ms`}
              direction="horizontal"
              spacing={8}
              name="latency"
              options={LATENCY_OPTIONS.map((o) => ({ label: `${o}`, value: o }))}
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <RHFRadioGroupButtons
              id={`download speed selection ${getValues('id')}`}
              onBlur={() => handlePost(getValues())}
              onClick={(value) => handlePost({ ...getValues(), downloadSpeed: value })}
              type="number"
              labelText={`${translate('download_speed')} Mb/s`}
              direction="horizontal"
              spacing={8}
              name="downloadSpeed"
              options={DOWNLOAD_OPTIONS.map((o) => ({ label: `${o}`, value: o }))}
            />
          </Column>
          <Column>
            <RHFRadioGroupButtons
              id={`upload speed selection ${getValues('id')}`}
              onBlur={() => handlePost(getValues())}
              onClick={(value) => handlePost({ ...getValues(), uploadSpeed: value })}
              type="number"
              labelText={`${translate('upload_speed')} Mb/s`}
              direction="horizontal"
              spacing={8}
              name="uploadSpeed"
              options={UPLOAD_OPTIONS.map((o) => ({ label: `${o}`, value: o }))}
            />
          </Column>
        </Row>
      </FlexGrid>
      <SectionTitle
        label={capitalizeFirstLetter(translate('contract_breaking_rules'))}
        style={{ paddingBottom: 0 }}
      />
      <Typography variant="disabled" style={{ paddingBottom: spacing.xl }}>
        {capitalizeFirstLetter(translate('add_rules_and_guidelines'))}
      </Typography>
      <TextArea
        labelText={capitalizeFirstLetter(translate('description'))}
        name=""
        placeholder={capitalizeFirstLetter(translate('description'))}
        rows={6}
        onChange={(e) => {
          setValue('notes', e.target.value)
        }}
      />
      <SectionTitle label={translate('payment_settings')} style={{ paddingBottom: 0 }} />
      <Typography variant="disabled" style={{ paddingBottom: spacing.xl }}>
        {capitalizeFirstLetter(translate('add_payment_intervals'))}
      </Typography>
      <RHFSelect
        id="type of intervals selection"
        options={frequencies.map((f) => ({
          value: f.id,
          label: capitalizeFirstLetter(translate(uncapitalizeFirstLetter(f.name) as Translation))
        }))}
        onChange={() => handlePost(getValues())}
        name="frequencyId"
        label={capitalizeFirstLetter(translate('payment_interval'))}
      />
    </>
  )
}
