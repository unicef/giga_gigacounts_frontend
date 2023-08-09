import { Column, FlexGrid, Row, TextArea } from '@carbon/react'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ContractForm, IFrequency, Translation } from 'src/@types'
import { getFrequencies } from 'src/api/payments'
import { RHFRadioGroupButtons, RHFSelect } from 'src/components/hook-form'
import { SectionSubtitle, SectionTitle } from 'src/components/typography'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter, uncapitalizeFirstLetter } from 'src/utils/strings'

type Step3Props = {
  handlePost: (contractForm: ContractForm) => Promise<boolean>
}

const DOWNLOAD_OPTIONS = [50, 30, 20]
const UPLOAD_OPTIONS = [30, 20, 10]
const LATENCY_OPTIONS = [50, 100, 200]
const UPTIME_OPTIONS = [100, 98, 96]

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
      <SectionTitle label="quality_of_service_terms" style={{ paddingBottom: 0 }} />
      <SectionSubtitle subtitle="add_the_terms_agreed" />

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
              optionToString={(o) => String(o)}
              options={UPTIME_OPTIONS}
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
              optionToString={(o) => String(o)}
              options={LATENCY_OPTIONS}
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
              optionToString={(o) => String(o)}
              options={DOWNLOAD_OPTIONS}
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
              optionToString={(o) => String(o)}
              options={UPLOAD_OPTIONS}
            />
          </Column>
        </Row>
      </FlexGrid>
      <SectionTitle label="contract_breaking_rules" style={{ paddingBottom: 0 }} />
      <SectionSubtitle subtitle="add_rules_and_guidelines" />

      <TextArea
        labelText={capitalizeFirstLetter(translate('description'))}
        name="breakingRules"
        placeholder={capitalizeFirstLetter(translate('description'))}
        rows={6}
        onChange={(e) => {
          setValue('breakingRules', e.target.value)
        }}
      />
      <SectionTitle label="payment_settings" style={{ paddingBottom: 0 }} />
      <SectionSubtitle subtitle="add_payment_intervals" />

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
