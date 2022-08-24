import { ChangeEvent, useState } from 'react'
import { uploadAttachment } from 'src/api/attachments'
import Message, { MessageType } from 'src/components/common/Message/Message'
import UploadButton from 'src/components/common/UploadButton/UploadButton'
import { useContract } from 'src/components/Dashboard/Contracts/state/hooks'
import { ContractsActionType } from 'src/components/Dashboard/Contracts/state/types'
import { useContractsContext } from 'src/components/Dashboard/Contracts/state/useContractsContext'
import { IFileUpload } from 'src/types/general'
import { createAction } from 'src/utils/createAction'
import {
  ButtonsContainer,
  CancelButton,
  Currency,
  CurrencyContainer,
  InvoiceContainer,
  PaymentDetailsContainer,
  PaymentFormContainer,
  PaymentHeader,
  SaveButton,
  UploadFiles,
} from './styles'

interface IContractPaymentDetailsProps {
  contractId?: string
}

const PaymentDetails: React.FC<IContractPaymentDetailsProps> = ({
  contractId,
}: IContractPaymentDetailsProps): JSX.Element => {
  const [showMessage, setShowMessage] = useState(false)
  const {
    state: { paymentForm },
    actions: { savePayment },
    dispatch,
  } = useContractsContext()

  const contract = useContract(contractId)

  const onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(createAction(ContractsActionType.SET_PAYMENT_DESCRIPTION, e.target.value))
  }
  const onDateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const paymentDate = date.find((item) => item.id === e.target.value)
    dispatch(createAction(ContractsActionType.SET_PAYMENT_DATE, paymentDate))
  }
  const onAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(createAction(ContractsActionType.SET_PAYMENT_AMOUNT, e.target.value))
  }

  const onUpload = async (file: IFileUpload) => {
    if (file) {
      try {
        await uploadAttachment(file)
      } catch (error) {
        dispatch(createAction(ContractsActionType.SET_ERROR, error))
      }
    }
  }

  const onUploadError = (error: Error) => dispatch(createAction(ContractsActionType.SET_ERROR, error))

  const date: { id: string; month: string; year: string }[] = [
    {
      id: '1',
      month: 'August',
      year: '2022',
    },
    {
      id: '2',
      month: 'September',
      year: '2022',
    },
    {
      id: '3',
      month: 'October',
      year: '2022',
    },
  ]

  const onMessageClose = () => {
    setShowMessage((prevState) => !prevState)
  }

  return (
    <PaymentDetailsContainer>
      <PaymentFormContainer>
        <PaymentHeader>
          <h5>Payment Details</h5>
          {/* <small>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus ultrices nunc, tortor ullamcorper. Amet
            placerat consequat eget faucibus in nec.
          </small> */}
          {showMessage && (
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
            <select value={paymentForm.year ?? ''} onChange={onDateChange} required>
              <option value={undefined} hidden>
                September 30, 2022
              </option>
              {date.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.month}
                </option>
              ))}
            </select>
          </div>
          <CurrencyContainer>
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
              />
            </div>
          </CurrencyContainer>
        </form>
        <InvoiceContainer>
          <h5>Invoice</h5>
          <p>Find the invoice here. Remember that this is a legal document that supports the payment created.</p>
          <UploadFiles>
            <UploadButton onUpload={onUpload} onError={onUploadError} type="payment" typeId="1" />
          </UploadFiles>
        </InvoiceContainer>
        <InvoiceContainer>
          <h5>Receipt</h5>
          <p>
            Find the receipt here. Remember that this is a legal document that supports the payment was done
            successfully.
          </p>
          <UploadFiles>
            <UploadButton onUpload={onUpload} onError={onUploadError} type="payment" typeId="2" />
          </UploadFiles>
        </InvoiceContainer>
      </PaymentFormContainer>
      <ButtonsContainer>
        <SaveButton onClick={savePayment}>Save</SaveButton>{' '}
        <CancelButton className="btn-transparent-grey active">Cancel</CancelButton>
      </ButtonsContainer>
    </PaymentDetailsContainer>
  )
}

export default PaymentDetails
