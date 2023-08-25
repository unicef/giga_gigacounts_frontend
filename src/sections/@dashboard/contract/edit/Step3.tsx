import { TextArea } from '@carbon/react'
import { useFormContext } from 'react-hook-form'
import { ContractForm, IFrequency, Translation } from 'src/@types'
import { RHFRadioGroupButtons, RHFSelect } from 'src/components/hook-form'
import { Stack } from 'src/components/stack'
import { SectionSubtitle, SectionTitle } from 'src/components/typography'
import { useBusinessContext } from 'src/context/business/BusinessContext'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter, uncapitalizeFirstLetter } from 'src/utils/strings'

type Step3Props = {
  handlePost: (contractForm: ContractForm) => Promise<boolean>
  frequencies: IFrequency[]
}

export default function Step3({ handlePost, frequencies }: Step3Props) {
  const { translate } = useLocales()
  const { spacing } = useTheme()
  const { suggestedMetrics } = useBusinessContext()
  const { getValues, setValue } = useFormContext<ContractForm>()

  return (
    <>
      <SectionTitle label="quality_of_service_terms" style={{ paddingBottom: 0 }} />
      <SectionSubtitle subtitle="add_the_terms_agreed" />
      <Stack orientation="vertical" gap={spacing.xs}>
        <Stack
          orientation="horizontal"
          gap={spacing.xs}
          alignItems="center"
          justifyContent="space-between"
        >
          <RHFRadioGroupButtons
            style={{ width: '50%' }}
            id={`uptime selection ${getValues('id')}`}
            onBlur={() => handlePost(getValues())}
            onClick={(value) => handlePost({ ...getValues(), uptime: value })}
            type="number"
            labelText={`${translate('uptime')} %`}
            direction="horizontal"
            spacing={8}
            name="uptime"
            optionToString={(o) => String(o)}
            options={
              // @ts-ignore
              (suggestedMetrics?.uptimeOptions.toSorted((a, b) => b - a) ?? []) as number[]
            }
          />
          <RHFRadioGroupButtons
            style={{ width: '50%' }}
            id={`latency selection ${getValues('id')}`}
            onBlur={() => handlePost(getValues())}
            onClick={(value) => handlePost({ ...getValues(), latency: value })}
            type="number"
            labelText={`${translate('latency')} Ms`}
            direction="horizontal"
            spacing={8}
            name="latency"
            optionToString={(o) => String(o)}
            options={
              // @ts-ignore
              (suggestedMetrics?.latencyOptions.toSorted((a, b) => a - b) ?? []) as number[]
            }
          />
        </Stack>

        <Stack
          orientation="horizontal"
          alignItems="center"
          justifyContent="space-between"
          gap={spacing.xs}
        >
          <RHFRadioGroupButtons
            style={{ width: '50%' }}
            id={`download speed selection ${getValues('id')}`}
            onBlur={() => handlePost(getValues())}
            onClick={(value) => handlePost({ ...getValues(), downloadSpeed: value })}
            type="number"
            labelText={`${translate('download_speed')} Mb/s`}
            direction="horizontal"
            spacing={8}
            name="downloadSpeed"
            optionToString={(o) => String(o)}
            options={
              // @ts-ignore

              (suggestedMetrics?.downloadOptions.toSorted((a, b) => b - a) ?? []) as number[]
            }
          />
          <RHFRadioGroupButtons
            style={{ width: '50%' }}
            id={`upload speed selection ${getValues('id')}`}
            onBlur={() => handlePost(getValues())}
            onClick={(value) => handlePost({ ...getValues(), uploadSpeed: value })}
            type="number"
            labelText={`${translate('upload_speed')} Mb/s`}
            direction="horizontal"
            spacing={8}
            name="uploadSpeed"
            optionToString={(o) => String(o)}
            options={
              // @ts-ignore
              (suggestedMetrics?.uploadOptions.toSorted((a, b) => b - a) ?? []) as number[]
            }
          />
        </Stack>
      </Stack>

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
      <SectionTitle label="payment_frequency" style={{ paddingBottom: 0 }} />
      <SectionSubtitle subtitle="add_payment_frequency" />

      <RHFSelect
        direction="top"
        id="payment frequency selection"
        options={frequencies.map((f) => ({
          value: f.id,
          label: capitalizeFirstLetter(translate(uncapitalizeFirstLetter(f.name) as Translation))
        }))}
        onChange={() => handlePost(getValues())}
        name="frequencyId"
        label={capitalizeFirstLetter(translate('payment_frequency'))}
      />
    </>
  )
}
