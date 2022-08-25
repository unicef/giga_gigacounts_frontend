import { ChangeEvent, useEffect } from 'react'
import { uploadAttachment } from 'src/api/attachments'
import Message, { MessageType } from 'src/components/common/Message/Message'
import UploadButton from 'src/components/common/UploadButton/UploadButton'
import { useContract, useSelectedContract } from 'src/components/Dashboard/Contracts/state/hooks'
import { IFileUpload, UploadType } from 'src/types/general'
import { createAction } from 'src/utils/createAction'
import { usePaymentsContext } from '../state/usePaymentsContext'
import { PaymentsActionType } from '../state/types'
import { ISP_ROLE } from 'src/consts/roles'
import { useRoleCheck } from 'src/state/hooks'
import {
  ButtonsContainer,
  CancelButton,
  Currency,
  CurrencyAmountWrapper,
  CurrencyContainer,
  InvoiceContainer,
  PaymentDetailsContainer,
  PaymentFormContainer,
  PaymentHeader,
  SaveButton,
  UploadFiles,
} from './styles'
import { MONTHS } from 'src/consts/months'
import File from 'src/components/common/File/File'
import { usePayment } from '../state/hooks'

interface IPaymentFormProps {
  contractId?: string
  paymentId?: string
}

const PaymentForm: React.FC<IPaymentFormProps> = ({ contractId }: IPaymentFormProps): JSX.Element => {
  const {
    state: { paymentForm, paymentDates, isAmountValid, showErrorMessage, selectedPaymentId, layout, loading },
    actions: { savePayment, cancelPayment, onPaymentFormDateChange, reload },
    dispatch,
  } = usePaymentsContext()

  const selectedPayment = usePayment(selectedPaymentId)

  const selectedContract = useSelectedContract()
  const contract = useContract(contractId)

  useEffect(() => {
    if (selectedContract?.id !== contractId) {
      cancelPayment()
    }
  }, [cancelPayment, contractId, selectedContract?.id])

  const onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(createAction(PaymentsActionType.SET_PAYMENT_DESCRIPTION, e.target.value))
  }
  const onDateChange = (e: ChangeEvent<HTMLSelectElement>) => onPaymentFormDateChange(paymentDates[+e.target.value])

  const onAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(createAction(PaymentsActionType.SET_PAYMENT_AMOUNT, e.target.value))
  }

  const onAmountBlur = () => {
    dispatch(createAction(PaymentsActionType.SET_IS_AMOUNT_VALID))
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

  const onMessageClose = () => {
    dispatch(createAction(PaymentsActionType.SHOW_ERROR_MESSAGE, false))
  }

  const onInvoiceRemove = () => dispatch(createAction(PaymentsActionType.SET_INVOICE, { invoice: undefined }))

  const onReceiptRemove = () => dispatch(createAction(PaymentsActionType.SET_RECEIPT, { receipt: undefined }))

  return (
    <PaymentDetailsContainer>
      <PaymentFormContainer>
        <PaymentHeader>
          <h5>Payment Details</h5>
          {/* <small>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus ultrices nunc, tortor ullamcorper. Amet
            placerat consequat eget faucibus in nec.
          </small> */}
          {showErrorMessage && (
            <Message
              type={MessageType.ERROR}
              title="Your payment was declined"
              description="Country Office declined your payment request. Please fill in the correct information or re-upload the invoice"
              showCloseBtn
              onClose={onMessageClose}
            />
          )}
        </PaymentHeader>
        <form>
          <input
            type="text"
            placeholder="Description"
            value={paymentForm.description ?? ''}
            onChange={onDescriptionChange}
          />
          <div className="input-container dropdown">
            <select onChange={onDateChange} required disabled={loading}>
              <option value="" hidden>
                {MONTHS[paymentForm.month]} - {paymentForm.year}
              </option>
              {paymentDates.map((date, index) => (
                <option key={index} value={index}>
                  {MONTHS[date.month]} - {date.year}
                </option>
              ))}
            </select>
          </div>
          <CurrencyContainer>
            <CurrencyAmountWrapper>
              <Currency>
                <span className="icon icon-24 icon-coins icon-blue" />
                <p>{contract?.details.data?.currency?.code}</p>
              </Currency>
              <div className="input-container">
                <input
                  type="number"
                  value={paymentForm.amount ?? ''}
                  min="0"
                  placeholder="Value"
                  step="0.01"
                  required
                  onChange={onAmountChange}
                  onBlur={onAmountBlur}
                  className={`${isAmountValid ? 'input-error' : ''}`}
                />
              </div>
            </CurrencyAmountWrapper>
            {isAmountValid && <span className="error-text">Amount must greater than 0</span>}
          </CurrencyContainer>
        </form>
        <InvoiceContainer>
          <h5>Invoice</h5>
          <p>Find the invoice here. Remember that this is a legal document that supports the payment created.</p>
          {selectedPayment?.invoice?.id ? (
            <UploadFiles>
              <File
                id={selectedPayment?.invoice.id}
                name={selectedPayment?.invoice.name}
                url={selectedPayment?.invoice.url}
                onDelete={reload}
                allowDelete
              />
            </UploadFiles>
          ) : (
            <UploadButton
              onUpload={onUpload}
              onError={onUploadError}
              onDelete={onInvoiceRemove}
              type={UploadType.invoice}
              typeId={selectedPaymentId ?? ''}
              value={paymentForm.invoice}
              showValue={layout === 'create'}
            />
          )}
        </InvoiceContainer>
        {!useRoleCheck(ISP_ROLE) && (
          <InvoiceContainer>
            <h5>Receipt</h5>
            <p>
              Find the receipt here. Remember that this is a legal document that supports the payment was done
              successfully.
            </p>
            {selectedPayment?.receipt?.id ? (
              <UploadFiles>
                <File
                  id={selectedPayment.receipt.id}
                  name={selectedPayment.receipt.name}
                  url={selectedPayment.receipt.url}
                  onDelete={reload}
                  allowDelete
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
        <SaveButton onClick={savePayment} isAmountValid={isAmountValid} disabled={isAmountValid || loading}>
          Save
        </SaveButton>
        <CancelButton className="btn-transparent-grey active" onClick={cancelPayment}>
          Cancel
        </CancelButton>
      </ButtonsContainer>
    </PaymentDetailsContainer>
  )
}

export default PaymentForm
