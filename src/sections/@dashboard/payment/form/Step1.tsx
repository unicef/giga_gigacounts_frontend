import { TextInput } from '@carbon/react'
import { useFormContext } from 'react-hook-form'
import { PaymentForm, Translation } from 'src/@types'
import { IFileUpload, IFrequency, IPeriod } from 'src/@types/general'
import { UploadError } from 'src/components/errors/'
import { RHFSelect, RHFTextField } from 'src/components/hook-form'
import { Stack } from 'src/components/stack'
import { SectionTitle, Typography } from 'src/components/typography'
import { UploadBox } from 'src/components/upload-box'
import { STRING_DEFAULT } from 'src/constants'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { getPeriodLabel } from 'src/utils/payments'
import { capitalizeFirstLetter, uncapitalizeFirstLetter } from 'src/utils/strings'
import { PaymentStatus } from '../../../../@types/status'

type Step1Props = {
  fields: {
    invoice: (IFileUpload & { status: 'uploading' | 'edit' | 'complete' }) | null
    receipt: (IFileUpload & { status: 'uploading' | 'edit' | 'complete' }) | null
  }
  paymentFrequency: IFrequency['name']
  uploadAttachment: (
    attachment: IFileUpload & { status: 'uploading' | 'edit' | 'complete' },
    key: 'invoice' | 'receipt'
  ) => void
  invoiceUploadError: Translation | ''
  receiptUploadError: Translation | ''
  setUploadErrorMessage: (message: Translation, key: 'invoice' | 'receipt') => void
  availablePayments: IPeriod[]
  currencyCode: string
  contractId: string
  paymentStatus?: PaymentStatus
}

export default function Step1({
  paymentFrequency,
  fields,
  uploadAttachment,
  invoiceUploadError,
  receiptUploadError,
  setUploadErrorMessage,
  availablePayments,
  currencyCode,
  contractId,
  paymentStatus
}: Step1Props) {
  const { translate, translateCapitalized } = useLocales()
  const { spacing } = useTheme()
  const { watch } = useFormContext<PaymentForm>()

  const handleDrop = (acceptedFiles: File[], key: 'invoice' | 'receipt'): void => {
    if (acceptedFiles.length > 1) return setUploadErrorMessage('upload_errors.one_file', key)
    const pdf = acceptedFiles[0]
    if (pdf.name.split('.').pop() !== 'pdf') return setUploadErrorMessage('upload_errors.pdf', key)
    const reader = new FileReader()
    reader.onloadstart = () => {
      const fileUpload = {
        name: pdf.name,
        typeId: '',
        type: key,
        file: reader.result,
        status: 'uploading'
      } as const
      uploadAttachment(fileUpload, key)
    }
    reader.onerror = () => {
      throw new Error(`Cannot read the file ${pdf.name}`)
    }
    reader.onloadend = () => {
      const fileUpload = {
        name: pdf.name,
        typeId: '',
        type: key,
        file: reader.result,
        status: 'complete'
      } as const
      uploadAttachment(fileUpload, key)
    }
    return reader.readAsDataURL(pdf)
  }

  const translatePeriodLabel = (p: IPeriod | null) => {
    if (!p) return ''
    const periodLabel = p ? getPeriodLabel(p) : ''
    const hasDay = p.day
    const translatedLabel =
      periodLabel && hasDay
        ? `${periodLabel.split('-')[0]}-${translateCapitalized(
            periodLabel.split('-')[1] as Translation
          )}-${periodLabel.split('-')[2]}`
        : `${translateCapitalized(periodLabel.split('-')[0] as Translation)}-${
            periodLabel.split('-')[1]
          }`
    return periodLabel ? translatedLabel : ''
  }

  return (
    <>
      <SectionTitle label="payment_detail" />
      <Stack orientation="horizontal" gap={spacing.xs}>
        <RHFTextField
          id="edit-payment-description"
          name="description"
          labelText={capitalizeFirstLetter(translate('description'))}
        />
        <TextInput
          id="edit-payment-contract-id"
          readOnly
          labelText={capitalizeFirstLetter(translate('contract_id'))}
          value={contractId}
        />
      </Stack>
      <Stack orientation="horizontal" gap={spacing.xs} style={{ marginTop: spacing.lg }}>
        <RHFTextField
          id="currency"
          type="string"
          name="currency"
          value={currencyCode}
          readOnly
          labelText={capitalizeFirstLetter(translate('currency'))}
        />
        <RHFTextField
          readOnly
          id="amount"
          type="number"
          name="amount"
          labelText={capitalizeFirstLetter(translate('amount'))}
        />
      </Stack>

      <SectionTitle label="payment_period" />
      <Stack orientation="horizontal" gap={spacing.xs}>
        <RHFSelect
          style={{ width: '50%' }}
          id="payment-frequency"
          name=""
          selectedItem={{
            value: paymentFrequency,
            label: capitalizeFirstLetter(
              translate(uncapitalizeFirstLetter(paymentFrequency ?? STRING_DEFAULT) as Translation)
            )
          }}
          readOnly
          label={capitalizeFirstLetter(`${translate('payment_frequency')}`)}
          options={[]}
        />
        <RHFSelect
          style={{ width: '50%' }}
          id="payment-period-select"
          readOnly={availablePayments.length <= 1 || paymentStatus === PaymentStatus.Draft}
          name="payment"
          selectedItem={{
            value: watch().payment,
            label: translatePeriodLabel(watch().payment)
          }}
          label={capitalizeFirstLetter(`${translate('period')}`)}
          options={
            availablePayments
              ? availablePayments.map((p) => ({ value: p, label: translatePeriodLabel(p) }))
              : []
          }
        />
      </Stack>

      <Stack style={{ marginBlock: spacing.md }}>
        <Typography as="h5">{capitalizeFirstLetter(translate('invoice'))}</Typography>
        <Typography as="h6" variant="textSecondary">
          {translate('find_the_invoice')}
        </Typography>
        <UploadError message={invoiceUploadError} />
        <UploadBox
          maxSizeMb={20}
          accept={['.pdf']}
          handleUpload={(files) => handleDrop(files, 'invoice')}
          labelText={translate('drag_and_drop_pdf_singular')}
          attachments={fields.invoice ? [fields.invoice] : []}
        />

        <Typography as="h5">{capitalizeFirstLetter(translate('receipt'))}</Typography>
        <Typography as="h6" variant="textSecondary">
          {translate('find_the_receipt')}
        </Typography>
        <UploadError message={receiptUploadError} />
        <UploadBox
          maxSizeMb={20}
          accept={['.pdf']}
          handleUpload={(files) => handleDrop(files, 'receipt')}
          labelText={translate('drag_and_drop_pdf_singular')}
          attachments={fields.receipt ? [fields.receipt] : []}
        />
      </Stack>
    </>
  )
}
