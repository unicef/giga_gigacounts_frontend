import { ChangeEvent, useMemo } from 'react'
import { uploadAttachment } from 'src/api/attachments'
import Message, { MessageType } from 'src/components/common/Message/Message'
import UploadButton from 'src/components/common/UploadButton/UploadButton'
import { useSelectedContract } from 'src/components/Dashboard/Contracts/state/hooks'
import { ContractStatus, IFileUpload, IPaymentStatus, UploadType, UserRole } from 'src/types/general'
import { createAction } from 'src/utils/createAction'
import { useRoleCheck } from 'src/state/hooks'
import { MONTHS } from 'src/consts/months'
import File from 'src/components/common/File/File'
import { usePaymentsContext } from '../state/usePaymentsContext'
import { PaymentsActionType } from '../state/types'
import { useIsPaymentDirty, usePayment } from '../state/hooks'
import PaymentDetails from '../PaymentDetails'
import {
  ButtonsContainer,
  SecondaryButton,
  Currency,
  CurrencyAmountWrapper,
  CurrencyContainer,
  InvoiceContainer,
  PaymentDetailsContainer,
  PaymentFormContainer,
  PaymentHeader,
  PrimaryButton,
  UploadFiles,
} from './styles'

const PaymentForm: React.FC = (): JSX.Element => {
  const {
    state: { paymentForm, paymentDates, amountNotValid, selectedPaymentId, layout, loading, error },
    actions: { savePayment, cancelPayment, onPaymentFormDateChange, reload, verifyPayment, rejectPayment },
    dispatch,
  } = usePaymentsContext()

  const selectedPayment = usePayment(selectedPaymentId)

  const allPaymentDates = useMemo(() => {
    if (selectedPayment) {
      return [...paymentDates, selectedPayment.paidDate].sort((a, b) => a.year - b.year || a.month - b.month)
    }

    return paymentDates
  }, [paymentDates, selectedPayment])

  const selectedDateIndex = useMemo(
    () => allPaymentDates.findIndex(({ month, year }) => month === paymentForm.month && year === paymentForm.year) ?? 0,
    [allPaymentDates, paymentForm.month, paymentForm.year],
  )

  const contract = useSelectedContract()

  const isIsp = useRoleCheck(UserRole.ISP)

  const createdByIsp = useMemo(
    () => selectedPayment?.createdBy?.role === UserRole.ISP,
    [selectedPayment?.createdBy?.role],
  )

  const hasCreatorRole = useMemo(
    () => !selectedPayment || isIsp === createdByIsp,
    [createdByIsp, isIsp, selectedPayment],
  )

  const contractCompleted = useMemo(() => contract?.status === ContractStatus.Completed, [contract?.status])

  const readonly = useMemo(
    () => !hasCreatorRole || (isIsp && selectedPayment?.status === IPaymentStatus.Verified) || contractCompleted,
    [contractCompleted, hasCreatorRole, isIsp, selectedPayment?.status],
  )

  const showReceipt = useMemo(
    () => selectedPayment?.receipt || (!isIsp && !contractCompleted),
    [contractCompleted, isIsp, selectedPayment?.receipt],
  )

  const showVerifyReject = useMemo(
    () => createdByIsp && !isIsp && selectedPayment?.status === IPaymentStatus.Pending,
    [createdByIsp, isIsp, selectedPayment?.status],
  )

  const isDirty = useIsPaymentDirty()

  const onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(createAction(PaymentsActionType.SET_PAYMENT_DESCRIPTION, e.target.value))
  }
  const onDateChange = (e: ChangeEvent<HTMLSelectElement>) => onPaymentFormDateChange(allPaymentDates[+e.target.value])

  const onAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (paymentForm.amount !== +e.target.value) {
      dispatch(createAction(PaymentsActionType.SET_PAYMENT_AMOUNT, +e.target.value))
    }
  }

  const onAmountBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const inValid = +e.target.value <= 0
    if (amountNotValid !== inValid) {
      dispatch(createAction(PaymentsActionType.SET_IS_AMOUNT_VALID, inValid))
    }
  }

  const onUpload = async (file: IFileUpload) => {
    if (file) {
      try {
        if (file.typeId) {
          await uploadAttachment(file)
          reload()
        } else if (file.type === UploadType.invoice) {
          dispatch(createAction(PaymentsActionType.SET_INVOICE, { invoice: file }))
        } else if (file.type === UploadType.receipt) {
          dispatch(createAction(PaymentsActionType.SET_RECEIPT, { receipt: file }))
        }
      } catch (error) {
        dispatch(createAction(PaymentsActionType.SET_ERROR, error))
      }
    }
  }

  const onUploadError = (error: Error) => dispatch(createAction(PaymentsActionType.SET_ERROR, error))

  const onInvoiceRemove = () => dispatch(createAction(PaymentsActionType.SET_INVOICE, { invoice: undefined }))

  const onReceiptRemove = () => dispatch(createAction(PaymentsActionType.SET_RECEIPT, { receipt: undefined }))

  return (
    <PaymentDetailsContainer>
      <PaymentFormContainer>
        <PaymentHeader>
          <h5>Payment Details</h5>
          {isIsp && selectedPayment?.status === IPaymentStatus.Rejected && (
            <Message
              type={MessageType.ERROR}
              title="Your payment was declined"
              description="Please contact the country office or government for more details and fill in the correct information or re-upload an invoice."
              showCloseBtn={false}
            />
          )}
        </PaymentHeader>
        {selectedPayment && readonly ? (
          selectedPayment && <PaymentDetails payment={selectedPayment} />
        ) : (
          <form>
            {error && (
              <Message type={MessageType.ERROR} title="Error" description={error.message} showCloseBtn={false} />
            )}

            <input
              type="text"
              placeholder="Description"
              value={paymentForm.description ?? ''}
              onChange={onDescriptionChange}
              disabled={loading}
            />
            <div className="input-container dropdown">
              <select onChange={onDateChange} required disabled={loading} value={selectedDateIndex}>
                <option value="" hidden>
                  {MONTHS[paymentForm.month]} - {paymentForm.year}
                </option>
                {allPaymentDates.map((date, index) => (
                  <option key={index} value={index}>
                    {MONTHS[date.month]} - {date.year}
                  </option>
                ))}
              </select>
            </div>
            <CurrencyContainer>
              <CurrencyAmountWrapper>
                <Currency>
                  <span className="icon icon-24 icon-coins icon-light-blue" />
                  <p>{contract?.details.data?.currency?.code}</p>
                </Currency>
                <div className="input-container">
                  <input
                    type="number"
                    value={paymentForm.amount.toString()}
                    min="0"
                    placeholder="Value"
                    step="0.01"
                    required
                    onChange={onAmountChange}
                    onBlur={onAmountBlur}
                    className={`${amountNotValid ? 'input-error' : ''}`}
                    disabled={loading}
                  />
                </div>
              </CurrencyAmountWrapper>
              {amountNotValid && <span className="error-text">Amount must greater than 0</span>}
            </CurrencyContainer>
          </form>
        )}
        <InvoiceContainer>
          <h5>Invoice</h5>
          <p>Find the invoice here. Remember that this is a legal document that supports the payment created.</p>
          {selectedPayment?.invoice ? (
            <UploadFiles>
              <File
                id={selectedPayment?.invoice.id}
                name={selectedPayment?.invoice.name}
                url={selectedPayment?.invoice.url}
                onDelete={reload}
                allowDelete={!readonly}
              />
            </UploadFiles>
          ) : (
            !readonly && (
              <UploadButton
                onUpload={onUpload}
                onError={onUploadError}
                onDelete={onInvoiceRemove}
                type={UploadType.invoice}
                typeId={selectedPaymentId ?? ''}
                value={paymentForm.invoice}
                showValue={layout === 'create'}
              />
            )
          )}
        </InvoiceContainer>
        {showReceipt && (
          <InvoiceContainer>
            <h5>Receipt</h5>
            <p>
              Find the receipt here. Remember that this is a legal document that supports the payment was done
              successfully.
            </p>
            {selectedPayment?.receipt ? (
              <UploadFiles>
                <File
                  id={selectedPayment.receipt.id}
                  name={selectedPayment.receipt.name}
                  url={selectedPayment.receipt.url}
                  onDelete={reload}
                  allowDelete={!isIsp}
                />
              </UploadFiles>
            ) : (
              <UploadButton
                onUpload={onUpload}
                onError={onUploadError}
                onDelete={onReceiptRemove}
                type={UploadType.receipt}
                typeId={selectedPaymentId ?? ''}
                value={paymentForm.receipt}
                showValue={layout === 'create'}
              />
            )}
          </InvoiceContainer>
        )}
      </PaymentFormContainer>
      <ButtonsContainer>
        {showVerifyReject && (
          <>
            <PrimaryButton onClick={verifyPayment} disabled={amountNotValid || loading}>
              Verify
            </PrimaryButton>
            <SecondaryButton
              onClick={rejectPayment}
              disabled={amountNotValid || loading}
              className="btn-transparent-grey active"
            >
              Reject
            </SecondaryButton>
          </>
        )}
        {!readonly && (
          <>
            <PrimaryButton onClick={savePayment} disabled={loading || paymentForm.amount <= 0 || !isDirty}>
              Save
            </PrimaryButton>
            <SecondaryButton className="btn-transparent-grey active" onClick={cancelPayment}>
              Cancel
            </SecondaryButton>
          </>
        )}
      </ButtonsContainer>
    </PaymentDetailsContainer>
  )
}

export default PaymentForm
