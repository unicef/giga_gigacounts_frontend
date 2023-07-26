import { useState } from 'react'
// @ts-ignore
import { FileUploaderDropContainer } from '@carbon/react'
import { Translation, useLocales } from 'src/locales'
import { Typography } from 'src/components/typography'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { IFileUpload } from 'src/@types/general'
import AttachmentsList from 'src/components/attachment-list/AttachmentList'
import { RHFDatePicker, RHFTextField } from 'src/components/hook-form'
import Stack from 'src/components/stack/Stack'
import { useTheme } from 'src/theme'
import UploadError from 'src/components/errors/UploadError'
import SectionTitle from 'src/components/typography/SectionTitle'

type PaymentCreateFormProps = {
  fields: {
    invoice: IFileUpload | null
    receipt: IFileUpload | null
  }
  uploadAttachment: (attachment: IFileUpload, key: 'invoice' | 'receipt') => void
  invoiceUploadError: Translation | ''
  receiptUploadError: Translation | ''
  setUploadErrorMessage: (message: Translation, key: 'invoice' | 'receipt') => void
  viewOnly?: boolean
}

export default function PaymentCreateForm({
  fields,
  uploadAttachment,
  invoiceUploadError,
  receiptUploadError,
  setUploadErrorMessage,
  viewOnly
}: PaymentCreateFormProps) {
  const { translate } = useLocales()
  const { spacing } = useTheme()
  const [reading, setReading] = useState(false)

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

  const getAttachment = () => {
    const arrayEmpty = []
    if (fields.invoice) {
      arrayEmpty.push(fields.invoice)
    }
    if (fields.receipt) {
      arrayEmpty.push(fields.receipt)
    }

    return arrayEmpty
  }

  return (
    <>
      <SectionTitle label={translate('payment_detail')} />
      <Stack orientation="horizontal" gap={spacing.xs}>
        <RHFTextField
          id="paymentDescription"
          disabled={viewOnly}
          name="description"
          labelText={capitalizeFirstLetter(translate('description'))}
        />
        <RHFTextField
          id="amount"
          disabled={viewOnly}
          type="number"
          name="amount"
          labelText={capitalizeFirstLetter(translate('amount'))}
        />
      </Stack>
      <SectionTitle label={translate('payment_period')} />
      <Stack orientation="horizontal">
        <RHFDatePicker
          name="startDate"
          id="start date picker"
          size="md"
          labelText={translate('start_date')}
        />
        <RHFDatePicker
          name="endDate"
          id="end date picker"
          size="md"
          labelText={translate('end_date')}
        />
      </Stack>
      {!viewOnly ? (
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
            labelText="Drag and drop files here or click to upload"
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
            labelText="Drag and drop files here or click to upload"
            accept={['.pdf']}
          />
        </Stack>
      ) : (
        <>
          {getAttachment().length > 0 ? (
            <AttachmentsList
              status={reading ? 'uploading' : 'complete'}
              attachments={getAttachment()}
            />
          ) : (
            <Typography variant="disabled" as="h4">
              {translate('no_attachments_added')}
            </Typography>
          )}
        </>
      )}
    </>
  )
}
