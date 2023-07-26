import { useState } from 'react'
// @ts-ignore
import { FileUploaderDropContainer } from '@carbon/react'
import { months } from 'moment'
import { IFileUpload, IFrequency } from 'src/@types/general'
import AttachmentsList from 'src/components/attachment-list/AttachmentList'
import UploadError from 'src/components/errors/UploadError'
import { RHFSelect, RHFTextField } from 'src/components/hook-form'
import Stack from 'src/components/stack/Stack'
import { Typography } from 'src/components/typography'
import SectionTitle from 'src/components/typography/SectionTitle'
import { Translation, useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'

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
  viewOnly?: boolean
  availablePayments: { month: number; year: number; day?: number }[]
}

export default function Step1({
  paymentFrequency,
  fields,
  uploadAttachment,
  invoiceUploadError,
  receiptUploadError,
  setUploadErrorMessage,
  viewOnly,
  availablePayments
}: Step1Props) {
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

  const getPaymentOption = (p: { month: number; year: number; day?: number }) => {
    if (p.day)
      return {
        value: `${p.day}-${p.month}-${p.year}`,
        label: `${p.day}-${months(p.month)}-${p.year}`
      }
    return {
      value: `${p.year}-${p.month}`,
      label: `${p.year}-${months(p.month)}`
    }
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
        <RHFSelect
          id="payment period select"
          name=""
          disabled
          label={capitalizeFirstLetter(`${translate('contract_frequency')}`)}
          options={[{ value: '', label: paymentFrequency }]}
        />
        <RHFSelect
          id="payment period select"
          disabled={availablePayments.length <= 1}
          name="payment"
          label={capitalizeFirstLetter(`${translate('period')}`)}
          options={availablePayments ? availablePayments.map((p) => getPaymentOption(p)) : []}
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
