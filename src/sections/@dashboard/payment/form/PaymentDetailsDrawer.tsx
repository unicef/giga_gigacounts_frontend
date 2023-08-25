import { Invoice } from '@carbon/pictograms-react'
import { Button, Modal, ProgressIndicator, ProgressStep } from '@carbon/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  ContractDetails,
  ContractStatus,
  IContractPayment,
  ICurrency,
  IFileUpload,
  IFrequency,
  IPaymentForm,
  PaymentForm,
  PaymentStep,
  Translation
} from 'src/@types'
import { getContractDetails } from 'src/api/contracts'
import { getDraft } from 'src/api/drafts'
import { changePaymentStatus, createPayment, updatePayment } from 'src/api/payments'
import CancelDialog from 'src/components/cancel-dialog/CancelDialog'
import Drawer from 'src/components/drawer/Drawer'
import FormProvider from 'src/components/hook-form/FormProvider'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { ICONS } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { useLocales } from 'src/locales'
import { redirectOnError } from 'src/pages/errors/handlers'
import { useTheme } from 'src/theme'
import { applyToEveryWord, capitalizeFirstLetter } from 'src/utils/strings'
import { usePaymentSchema } from 'src/validations/payment'
import Step1 from './Step1'
import Step2 from './Step2'

interface Props {
  paymentFrequency: IFrequency['name']
  refetchPayments?: () => void
  contract:
    | ContractDetails
    | { id: string; status: ContractStatus; automatic: boolean; currency?: ICurrency | null }
  payment?: IContractPayment
  onClose: VoidFunction
  open: boolean
  availablePayments: { month: number; year: number; day?: number }[]
  openView: () => void
}

export default function PaymentDetailsDrawer({
  contract,
  refetchPayments,
  open,
  payment,
  onClose,
  availablePayments,
  paymentFrequency,
  openView
}: Props) {
  const navigate = useNavigate()
  const { spacing } = useTheme()
  const { pushSuccess, pushError } = useSnackbar()
  const { translate } = useLocales()

  const [activeStep, setActiveStep] = useState<PaymentStep>(0)
  const methods = usePaymentSchema(payment)
  const { setValue, reset, handleSubmit, trigger, formState } = methods

  const [contractDetails, setContractDetails] = useState<ContractDetails | null>(null)

  const unsaved = useModal()
  const published = useModal()

  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [saving, setSaving] = useState(false)

  const [invoiceFile, setInvoiceFile] = useState<
    (IFileUpload & { status: 'uploading' | 'edit' | 'complete' }) | null
  >(null)
  const [receiptFile, setReceiptFile] = useState<
    (IFileUpload & { status: 'uploading' | 'edit' | 'complete' }) | null
  >(null)
  const [invoiceUploadError, setInvoiceUploadError] = useState<Translation | ''>('')
  const [receiptUploadError, setReceiptUploadError] = useState<Translation | ''>('')

  useEffect(() => {
    if (contractDetails?.budget && availablePayments) {
      setValue(
        'amount',
        Number((Number(contractDetails.budget ?? '') / availablePayments.length).toFixed(3)) // TODO: Change to info from backend
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractDetails?.budget, availablePayments])

  useEffect(() => {
    if (!contract) return
    if (Object.keys(contract).includes('isContract'))
      setContractDetails(contract as ContractDetails)
    else if ((contract as { id: string; status: ContractStatus }).status === ContractStatus.Draft)
      getDraft(contract.id)
        .then((res) => setContractDetails({ ...res, isContract: false }))
        .catch((err) => redirectOnError(navigate, err))
    else
      getContractDetails(contract.id)
        .then((res) => setContractDetails({ ...res, isContract: true }))
        .catch((err) => redirectOnError(navigate, err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract])

  useEffect(() => {
    if (availablePayments.length === 1) setValue('payment', availablePayments[0])
  }, [availablePayments, setValue])

  useEffect(() => {
    if (invoiceUploadError.length > 0) setTimeout(() => setInvoiceUploadError(''), 5000)
  }, [invoiceUploadError])

  useEffect(() => {
    if (receiptUploadError.length > 0) setTimeout(() => setReceiptUploadError(''), 5000)
  }, [receiptUploadError])

  useEffect(() => {
    if (!payment) return
    if (payment.invoice)
      setInvoiceFile({
        file: '',
        name: payment.invoice.name,
        type: 'invoice',
        typeId: '',
        status: 'complete'
      })
    if (payment.receipt)
      setReceiptFile({
        file: '',
        name: payment.receipt.name,
        type: 'invoice',
        typeId: '',
        status: 'complete'
      })
  }, [payment, setValue])

  const handleUploadAttachments = (
    attachment: IFileUpload & { status: 'complete' | 'edit' | 'uploading' },
    key: 'invoice' | 'receipt'
  ) => {
    if (key === 'invoice') setInvoiceFile(attachment)
    else if (key === 'receipt') setReceiptFile(attachment)
    setUnsavedChanges(true)
  }

  const handlePost = async (paymentForm: PaymentForm): Promise<boolean> => {
    if (saving || !(await trigger()) || Object.keys(formState.errors).length > 0) return false

    try {
      setSaving(true)
      if (payment) {
        const updatedPayment: Partial<IPaymentForm> = {
          contractId: contractDetails?.id ?? '',
          amount: paymentForm.amount,
          description: paymentForm.description
        }
        if (invoiceFile?.file) updatedPayment.invoice = invoiceFile
        if (receiptFile?.file) updatedPayment.receipt = receiptFile
        await updatePayment(payment.id, updatedPayment)
        await changePaymentStatus(payment.id, paymentForm.status)
        pushSuccess('push.updated_payment')
      } else {
        const newPayment: IPaymentForm = {
          contractId: contractDetails?.id ?? '',
          amount: paymentForm.amount,
          description: paymentForm.description,
          year: paymentForm.payment.year,
          month: paymentForm.payment.month
        }
        if (paymentForm.payment.day) newPayment.day = paymentForm.payment.day
        if (invoiceFile?.file) newPayment.invoice = invoiceFile
        if (receiptFile?.file) newPayment.receipt = receiptFile
        const createdPayment = (await createPayment(newPayment)) as { id: string }
        await changePaymentStatus(createdPayment.id, paymentForm.status)
        pushSuccess('push.added_payment')
      }
      handleReset()
      setUnsavedChanges(false)
      published.open()
      return true
    } catch {
      if (payment) pushError('push.updated_payment_error')
      else pushError('push.added_payment_error')
      return false
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    if (unsavedChanges) unsaved.open()
    else handleReset()
  }

  const handleReset = () => {
    reset()
    if (refetchPayments) refetchPayments()
    unsaved.close()
    setUnsavedChanges(false)
    setInvoiceFile(null)
    setReceiptFile(null)
    setSaving(false)
    setActiveStep(0)
    setInvoiceUploadError('')
    setReceiptUploadError('')
    onClose()
  }

  const handleUploadError = (message: Translation, key: 'invoice' | 'receipt') => {
    if (key === 'invoice') setInvoiceUploadError(message)
    else if (key === 'receipt') setReceiptUploadError(message)
  }

  const stepComponents = [
    <Step1
      paymentFrequency={paymentFrequency}
      availablePayments={availablePayments}
      currencyCode={contract.currency?.code || ''}
      fields={{ invoice: invoiceFile, receipt: receiptFile }}
      uploadAttachment={handleUploadAttachments}
      receiptUploadError={receiptUploadError}
      invoiceUploadError={invoiceUploadError}
      setUploadErrorMessage={handleUploadError}
    />,
    <Step2 contract={contractDetails} />
  ]
  const lastStep = stepComponents.length - 1
  const isFirstStep = activeStep === 0
  const isLastStep = activeStep === lastStep

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) as PaymentStep)
  }

  const handleBack = () => {
    if (!isFirstStep) setActiveStep((prev) => (prev - 1) as PaymentStep)
  }

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(handlePost)}>
        <Drawer
          open={open}
          header={
            <>
              <Stack
                orientation="vertical"
                justifyContent="center"
                alignItems="center"
                style={{
                  padding: spacing.xl
                }}
              >
                <Typography as="h4" variant="primary" style={{ wordBreak: 'break-all' }}>
                  {payment?.description
                    ? payment.description
                    : applyToEveryWord('new payment', (w) =>
                        capitalizeFirstLetter(translate(w as Translation))
                      )}
                </Typography>
              </Stack>

              <ProgressIndicator spaceEqually currentIndex={activeStep}>
                {[
                  { label: '1', secondaryLabel: 'payment_details' },
                  { label: '2', secondaryLabel: 'connectivity_quality_check' }
                ].map((step, index) => (
                  <ProgressStep
                    key={step.label}
                    current={activeStep === index}
                    complete={activeStep > index}
                    label={capitalizeFirstLetter(translate(step.label as Translation))}
                    secondaryLabel={capitalizeFirstLetter(
                      translate(step.secondaryLabel as Translation)
                    )}
                  />
                ))}
              </ProgressIndicator>
            </>
          }
          handleClose={handleCancel}
          content={stepComponents[activeStep]}
          footer={
            <Stack orientation="horizontal">
              <Button
                className="btn-max-width-limit"
                style={{ width: '50%' }}
                kind="secondary"
                renderIcon={ICONS.Back}
                iconDescription={capitalizeFirstLetter(translate('back'))}
                onClick={handleBack}
                disabled={isFirstStep}
              >
                {capitalizeFirstLetter(translate('back'))}
              </Button>
              {!isLastStep ? (
                <Button
                  className="btn-max-width-limit"
                  style={{ width: '50%' }}
                  renderIcon={ICONS.SuccessOutline}
                  iconDescription={capitalizeFirstLetter(translate('continue'))}
                  kind="primary"
                  onClick={(e) => {
                    e.preventDefault()
                    trigger().then((ok) => (ok ? handleNext() : null))
                  }}
                >
                  {capitalizeFirstLetter(translate('continue'))}
                </Button>
              ) : (
                <Button
                  style={{ width: '50%' }}
                  kind="primary"
                  renderIcon={ICONS.SuccessOutline}
                  className="btn-max-width-limit"
                  type="submit"
                  iconDescription={capitalizeFirstLetter(
                    translate(`${payment?.description ? 'update_payment' : 'add_payment'}`)
                  )}
                >
                  {capitalizeFirstLetter(
                    translate(`${payment?.description ? 'update_payment' : 'add_payment'}`)
                  )}
                </Button>
              )}
            </Stack>
          }
        />
      </FormProvider>

      <CancelDialog
        title={translate('payment_cancel_modal.title')}
        content={translate('payment_cancel_modal.content')}
        open={unsaved.value}
        onCancel={handleReset}
        onDismiss={unsaved.close}
      />
      <Modal
        open={published.value}
        onRequestClose={() => {
          published.close()
          handleReset()
        }}
        onRequestSubmit={() => {
          published.close()
          openView()
        }}
        onSecondarySubmit={() => {
          published.close()
          handleReset()
        }}
        primaryButtonText={capitalizeFirstLetter(translate('view_payment'))}
        secondaryButtonText={capitalizeFirstLetter(translate('close'))}
      >
        <Stack alignItems="center" justifyContent="center" gap={spacing.lg}>
          <Invoice width={84} height={84} />
          <Typography as="h4">{translate('payment_created_modal.title')}</Typography>
          <Typography as="h6">{translate('payment_created_modal.content')}</Typography>
        </Stack>
      </Modal>
    </>
  )
}
