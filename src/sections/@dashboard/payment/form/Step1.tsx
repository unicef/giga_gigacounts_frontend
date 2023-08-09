import { FileUploaderDropContainer } from '@carbon/react'
import { months } from 'moment'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { IFileUpload, IFrequency } from 'src/@types/general'
import { AttachmentsList } from 'src/components/attachment-list/'
import { UploadError } from 'src/components/errors/'
import { RHFSelect, RHFTextField } from 'src/components/hook-form'
import { Stack } from 'src/components/stack'
import { SectionTitle, Typography } from 'src/components/typography'
import { STRING_DEFAULT } from 'src/constants'
import { Translation } from 'src/@types'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter, uncapitalizeFirstLetter } from 'src/utils/strings'

type Step1Props = {
  fields: {
    invoice: IFileUpload | null
    receipt: IFileUpload | null
  }
  paymentFrequency: IFrequency['name']
  uploadAttachment: (attachment: IFileUpload, key: 'invoice' | 'receipt') => void
  invoiceUploadError: Translation | ''
  receiptUploadError: Translation | ''
  setUploadErrorMessage: (message: Translation, key: 'invoice' | 'receipt') => void
  availablePayments: { month: number; year: number; day?: number }[]
  currencyCode: string
}

export default function Step1({
  paymentFrequency,
  fields,
  uploadAttachment,
  invoiceUploadError,
  receiptUploadError,
  setUploadErrorMessage,
  availablePayments,
  currencyCode
}: Step1Props) {
  const { translate } = useLocales()
  const { spacing } = useTheme()
  const [reading, setReading] = useState(false)

  const { getValues } = useFormContext()

  const handleDrop = (acceptedFiles: File[], key: 'invoice' | 'receipt'): void => {
    setReading(true)
    if (acceptedFiles.length > 1) return setUploadErrorMessage('upload_errors.one_file', key)
    const pdf = acceptedFiles[0]
    if (pdf.name.split('.').pop() !== 'pdf') return setUploadErrorMessage('upload_errors.pdf', key)
    const reader = new FileReader()
    reader.onloadend = () => setReading(false)
    reader.onload = () => {
      const fileUpload: IFileUpload = {
        name: pdf.name,
        typeId: '',
        type: key,
        file: reader.result
      }
      uploadAttachment(fileUpload, key)
    }
    reader.onerror = () => {
      throw new Error(`Cannot read the file ${pdf.name}`)
    }
    return reader.readAsDataURL(pdf)
  }

  const getPaymentLabel = (p: { month: number; year: number; day?: number }) =>
    p.day ? `${p.day}-${months(p.month)}-${p.year}` : `${p.year}-${months(p.month)}`

  return (
    <>
      <SectionTitle label="payment_detail" />
      <Stack orientation="horizontal" gap={spacing.xs}>
        <RHFTextField
          id="paymentDescription"
          name="description"
          labelText={capitalizeFirstLetter(translate('description'))}
        />
      </Stack>
      <Stack orientation="horizontal" gap={spacing.xs} style={{ marginTop: spacing.lg }}>
        <RHFTextField
          id="currency"
          type="string"
          name="currency"
          value={currencyCode}
          disabled
          labelText={capitalizeFirstLetter(translate('currency'))}
        />
        <RHFTextField
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
          id="payment period select"
          name=""
          selectedItem={{
            value: paymentFrequency,
            label: capitalizeFirstLetter(
              translate(uncapitalizeFirstLetter(paymentFrequency ?? STRING_DEFAULT) as Translation)
            )
          }}
          disabled
          label={capitalizeFirstLetter(`${translate('payment_frequency')}`)}
          options={[]}
        />
        <RHFSelect
          style={{ width: '50%' }}
          selectedItem={{
            value: getValues('payment'),
            label: getPaymentLabel(getValues('payment'))
          }}
          id="payment period select"
          disabled={availablePayments.length <= 1}
          name="payment"
          label={capitalizeFirstLetter(`${translate('period')}`)}
          options={
            availablePayments
              ? availablePayments.map((p) => ({ value: p, label: getPaymentLabel(p) }))
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
        <AttachmentsList
          status={reading ? 'uploading' : 'complete'}
          attachments={fields.invoice ? [fields.invoice] : []}
        />
        <FileUploaderDropContainer
          status={reading ? 'uploading' : 'edit'}
          style={{
            marginInline: 'auto',
            marginBlock: spacing.md,
            maxWidth: '100%'
          }}
          multiple={false}
          onAddFiles={(e: any) => handleDrop(e.target.files[0], 'invoice')}
          labelText={translate('drag_and_drop_pdf_singular')}
          accept={['.pdf']}
        />
        <Typography as="h5">{capitalizeFirstLetter(translate('receipt'))}</Typography>
        <Typography as="h6" variant="textSecondary">
          {translate('find_the_receipt')}
        </Typography>
        <UploadError message={receiptUploadError} />
        <AttachmentsList
          status={reading ? 'uploading' : 'complete'}
          attachments={fields.receipt ? [fields.receipt] : []}
        />
        <FileUploaderDropContainer
          status={reading ? 'uploading' : 'edit'}
          style={{
            marginInline: 'auto',
            marginBlock: spacing.md,
            maxWidth: '100%'
          }}
          multiple={false}
          onAddFiles={(e: any) => handleDrop(e.target.files[0], 'receipt')}
          labelText={translate('drag_and_drop_pdf_singular')}
          accept={['.pdf']}
        />
      </Stack>
    </>
  )
}
