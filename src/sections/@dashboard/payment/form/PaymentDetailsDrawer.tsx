import { CheckmarkOutline, PreviousOutline } from '@carbon/icons-react'
import { Invoice } from '@carbon/pictograms-react'
import {
  Button,
  // @ts-ignore
  Modal,
  // @ts-ignore
  ProgressIndicator,
  // @ts-ignore
  ProgressStep
} from '@carbon/react'
import { useEffect, useState } from 'react'
import {
  ContractDetails,
  ContractStatus,
  IContractPayment,
  IFileUpload,
  IFrequency,
  IPaymentForm,
  PaymentForm,
  PaymentStep
} from 'src/@types'
import { getContractDetails } from 'src/api/contracts'
import { getDraft } from 'src/api/drafts'
import { changePaymentStatus, createPayment, updatePayment } from 'src/api/payments'
import CancelDialog from 'src/components/cancel-dialog/CancelDialog'
import Drawer from 'src/components/drawer/Drawer'
import FormProvider from 'src/components/hook-form/FormProvider'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { useModal } from 'src/hooks/useModal'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { Translation, useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { applyToEveryWord, capitalizeFirstLetter } from 'src/utils/strings'
import { usePaymentSchema } from 'src/validations/payment'
import Step1 from './Step1'
import Step2 from './Step2'

interface Props {
  paymentFrequency: IFrequency['name']
  refetchPayments?: () => void
  contract: ContractDetails | { id: string; status: ContractStatus; automatic: boolean }
  payment?: IContractPayment
  onClose: VoidFunction
  open: boolean
  availablePayments: { month: number; year: number; day?: number }[]
  viewOnly?: boolean
}

export default function PaymentDetailsDrawer({
  contract,
  refetchPayments,
  open,
  payment,
  onClose,
  availablePayments,
  viewOnly = false,
  paymentFrequency
}: Props) {
  const { spacing } = useTheme()
  const { pushSuccess, pushError } = useSnackbar()
  const { translate } = useLocales()

  const [activeStep, setActiveStep] = useState<PaymentStep>(0)

  const methods = usePaymentSchema(payment)
  const { setValue, reset, handleSubmit, trigger, formState } = methods

  const [item, setItem] = useState<ContractDetails | null>(null)

  const unsaved = useModal()
  const notCreated = useModal()
  const published = useModal()

  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [saving, setSaving] = useState(false)
  const [created, setCreated] = useState(Boolean(payment))

  const [invoiceFile, setInvoiceFile] = useState<IFileUpload | null>(null)
  const [receiptFile, setReceiptFile] = useState<IFileUpload | null>(null)
  const [invoiceUploadError, setInvoiceUploadError] = useState<Translation | ''>('')
  const [receiptUploadError, setReceiptUploadError] = useState<Translation | ''>('')

  useEffect(() => {
    if (!contract) return
    if (Object.keys(contract).includes('isContract')) setItem(contract as ContractDetails)
    else if ((contract as { id: string; status: ContractStatus }).status === ContractStatus.Draft)
      getDraft(contract.id).then((res) => setItem({ ...res, isContract: false }))
    else getContractDetails(contract.id).then((res) => setItem({ ...res, isContract: true }))
  }, [contract])

  useEffect(() => {
    if (availablePayments.length === 1) {
      if (paymentFrequency === 'Monthly')
        setValue('payment', `${availablePayments[0].month}-${availablePayments[0].year}`)
      else
        setValue(
          'payment',
          `${availablePayments[0].day} ${availablePayments[0].month}-${availablePayments[0].year}`
        )
    }
  }, [availablePayments, setValue, paymentFrequency])

  useEffect(() => {
    if (invoiceUploadError.length > 0) setTimeout(() => setInvoiceUploadError(''), 5000)
  }, [invoiceUploadError])

  useEffect(() => {
    if (receiptUploadError.length > 0) setTimeout(() => setReceiptUploadError(''), 5000)
  }, [receiptUploadError])

  useEffect(() => {
    if (!payment) return
    if (payment.invoice)
      setInvoiceFile({ file: '', name: payment.invoice.name, type: 'invoice', typeId: '' })
    if (payment.receipt)
      setReceiptFile({ file: '', name: payment.receipt.name, type: 'invoice', typeId: '' })
  }, [payment, setValue])

  const handleUploadAttachments = (attachment: IFileUpload, key: 'invoice' | 'receipt') => {
    if (key === 'invoice') setInvoiceFile(attachment)
    else if (key === 'receipt') setReceiptFile(attachment)
    setUnsavedChanges(true)
  }

  const getDayMonthYear = (date: string) => {
    if (paymentFrequency === 'Monthly')
      return {
        month: Number(date.split('-')[0]),
        year: Number(date.split('-')[1])
      }
    return {
      day: Number(date.split('-')[0]),
      month: Number(date.split('-')[1]),
      year: Number(date.split('-')[2])
    }
  }

  const handlePost = async (invoiceForm: PaymentForm): Promise<boolean> => {
    if (saving || !(await trigger()) || Object.keys(formState.errors).length > 0) return false
    const date = getDayMonthYear(invoiceForm.payment)
    try {
      setSaving(true)
      if (payment) {
        const updatedPayment: Partial<IPaymentForm> = {
          contractId: item?.id ?? '',
          amount: invoiceForm.amount,
          description: invoiceForm.description
        }
        if (invoiceFile?.file) updatedPayment.invoice = invoiceFile
        if (receiptFile?.file) updatedPayment.receipt = receiptFile
        await updatePayment(payment.id, updatedPayment)
        await changePaymentStatus(payment.id, invoiceForm.status)
        setCreated(true)
        pushSuccess('push.updated_payment')
      } else {
        const newPayment: IPaymentForm = {
          contractId: item?.id ?? '',
          amount: invoiceForm.amount,
          description: invoiceForm.description,
          year: date.year,
          month: date.month
        }
        if (date.day) newPayment.day = date.day
        if (invoiceFile?.file) newPayment.invoice = invoiceFile
        if (receiptFile?.file) newPayment.receipt = receiptFile
        const createdPayment = (await createPayment(newPayment)) as { id: string }
        await changePaymentStatus(createdPayment.id, invoiceForm.status)
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
    if (!created) notCreated.open()
    else if (unsavedChanges) unsaved.open()
    else handleReset()
  }

  const handleReset = () => {
    reset()
    if (refetchPayments) refetchPayments()
    setCreated(Boolean(payment))
    unsaved.close()
    setUnsavedChanges(false)
    notCreated.close()
    setInvoiceFile(null)
    setReceiptFile(null)
    setSaving(false)
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
      viewOnly={viewOnly}
      fields={{ invoice: invoiceFile, receipt: receiptFile }}
      uploadAttachment={handleUploadAttachments}
      receiptUploadError={receiptUploadError}
      invoiceUploadError={invoiceUploadError}
      setUploadErrorMessage={handleUploadError}
    />,
    <Step2 contract={item} viewOnly={viewOnly} />
  ]
  const lastStep = stepComponents.length - 1
  const isFirstStep = activeStep === 0
  const isLastStep = activeStep === lastStep

  const handleNext = async (paymentForm: PaymentForm) => {
    const posted = await handlePost(paymentForm)
    if (posted) setActiveStep((prev) => (prev + 1) as PaymentStep)
  }

  const handleBack = () => {
    if (!isFirstStep) setActiveStep((prev) => (prev - 1) as PaymentStep)
  }

  const handleCreateAnotherPayment = () => {
    handleReset()
    published.close()
  }

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(handleNext)}>
        <Drawer
          open={open}
          header={
            <>
              <Stack
                orientation="vertical"
                justifyContent="center"
                alignItems="center"
                style={{
                  padding: spacing.xl,
                  minHeight: '10dvh'
                }}
              >
                <h4 style={{ wordBreak: 'break-all' }}>
                  {applyToEveryWord('new payment', (w) =>
                    capitalizeFirstLetter(translate(w as Translation))
                  )}
                </h4>
              </Stack>

              <ProgressIndicator spaceEqually currentIndex={activeStep}>
                {[{ label: 'payment_details' }, { label: 'final_review' }].map((step, index) => (
                  <ProgressStep
                    key={step.label}
                    current={activeStep === index}
                    complete={activeStep > index}
                    label={capitalizeFirstLetter(translate(step.label as Translation))}
                    // secondaryLabel={capitalizeFirstLetter(
                    //   translate(item.secondaryLabel as Translation)
                    // )}
                  />
                ))}
              </ProgressIndicator>
            </>
          }
          handleClose={handleCancel}
          content={stepComponents[activeStep]}
          footer={
            <Stack orientation="horizontal">
              {!viewOnly && (
                <>
                  <Button
                    className="btn-max-width-limit"
                    style={{ width: '50%' }}
                    kind="secondary"
                    renderIcon={PreviousOutline}
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
                      renderIcon={CheckmarkOutline}
                      iconDescription={capitalizeFirstLetter(translate('continue'))}
                      kind="primary"
                      type="submit"
                    >
                      {capitalizeFirstLetter(translate('continue'))}
                    </Button>
                  ) : (
                    <Button
                      style={{ width: '50%' }}
                      kind="primary"
                      renderIcon={CheckmarkOutline}
                      className="btn-max-width-limit"
                      type="submit"
                      iconDescription={capitalizeFirstLetter(translate('add_payment'))}
                    >
                      {capitalizeFirstLetter(translate('add_payment'))}
                    </Button>
                  )}
                </>
              )}
              {viewOnly && (
                <>
                  <Button
                    style={{ width: '50%' }}
                    className="btn-max-width-limit"
                    kind="secondary"
                    onClick={handleCancel}
                  >
                    {capitalizeFirstLetter(translate('close'))}
                  </Button>
                  <Button
                    className="btn-max-width-limit"
                    style={{ width: '50%' }}
                    renderIcon={CheckmarkOutline}
                    iconDescription={capitalizeFirstLetter(translate('continue'))}
                    kind="primary"
                    disabled={isLastStep}
                    onClick={() => setActiveStep((prev) => (prev + 1) as PaymentStep)}
                  >
                    {capitalizeFirstLetter(translate('continue'))}
                  </Button>
                </>
              )}
            </Stack>
          }
        />
      </FormProvider>

      <CancelDialog
        title={translate('payment_cancel_modal.title')}
        content={translate('payment_cancel_modal.content')}
        open={notCreated.value}
        onCancel={handleReset}
        onDismiss={notCreated.close}
      />
      <CancelDialog
        title={translate('contract_discard_changes_modal.title')}
        content={translate('contract_discard_changes_modal.content')}
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
        }}
        onSecondarySubmit={handleCreateAnotherPayment}
        modalLabel={translate('contract_published_modal.title')}
        modalHeading={translate('contract_published_modal.content')}
        primaryButtonText={capitalizeFirstLetter(translate('view_contract'))}
        secondaryButtonText={capitalizeFirstLetter(translate('create_another_contract'))}
      >
        <Stack alignItems="center" justifyContent="center" gap={spacing.lg}>
          <Invoice width={84} height={84} />
          <Typography as="h4">{translate('contract_published_modal.title')}</Typography>
          <Typography as="h6">{translate('contract_published_modal.content')}</Typography>
        </Stack>
      </Modal>
    </>
  )
}
