import { ChangeEvent } from 'react'
import { uploadAttachment } from 'src/api/attachments'
import { createContractDraft } from 'src/api/contracts'
import File from 'src/components/common/File/File'
import { IFileUpload } from 'src/types/general'
import {
  AttachmentContainer,
  Attachments,
  Country,
  DateContainer,
  DateEnd,
  DateStart,
  FormContainer,
  GeneralContainer,
  UploadFiles,
} from './styles'
import UploadButton from './UploadButton'
import { useCreateContractContext } from '../state/useCreateContractContext'
import { CreateContractActionType } from '../state/types'

const GeneralTab: React.FC = (): JSX.Element => {
  const {
    state: { countries, currencies, ltas, flag, contractForm, draft },
    actions: { reload },
    dispatch,
  } = useCreateContractContext()

  const onCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: CreateContractActionType.SET_COUNTRY_CODE, payload: e.currentTarget.value })
  }

  const onBehalfGovernmentChange = () => {
    dispatch({ type: CreateContractActionType.SET_BEHALF_GOVERNMENT })
  }

  const onContractNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: CreateContractActionType.SET_CONTRACT_NAME, payload: e.currentTarget.value })
  }

  const onContractNameBlur = async () => {
    try {
      if (contractForm.name && contractForm.name.length > 0 && !contractForm.id) {
        const response = await createContractDraft(contractForm.name)
        dispatch({ type: CreateContractActionType.CREATE_CONTRACT_DRAFT, payload: response })
      }
    } catch (error) {
      dispatch({ type: CreateContractActionType.SET_ERROR, payload: error })
    }
  }

  const onCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: CreateContractActionType.SET_CURRENCY_CODE, payload: e.target.value })
  }

  const onLtaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: CreateContractActionType.SET_LTA, payload: e.target.value })
  }

  const onBudgetChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: CreateContractActionType.SET_BUDGET, payload: e.target.value })
  }

  const onStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: CreateContractActionType.SET_START_DATE, payload: e.target.value })
  }

  const onEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: CreateContractActionType.SET_END_DATE, payload: e.target.value })
  }

  const onUpload = async (file: IFileUpload) => {
    if (file) {
      try {
        await uploadAttachment(file)
        await reload()
      } catch (error) {
        dispatch({ type: CreateContractActionType.SET_ERROR, payload: error })
      }
    }
  }

  const onUploadError = (error: Error) => dispatch({ type: CreateContractActionType.SET_ERROR, payload: error })

  return (
    <GeneralContainer>
      <FormContainer>
        <form>
          <Country>
            <div className="input-container dropdown">
              <img src={`../flags/${flag}.svg`} alt={flag} />
              <select onChange={onCountryChange} value={contractForm.countryId ?? ''}>
                {countries?.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <label>
              <input type="checkbox" checked={contractForm.governmentBehalf} onChange={onBehalfGovernmentChange} />
              On behalf of the government
            </label>
          </Country>
          <input
            type="text"
            // name="contactName"
            value={contractForm.name ?? ''}
            placeholder="Contract Name"
            onChange={onContractNameChange}
            onBlur={onContractNameBlur}
          />
          <div className="input-container dropdown">
            <select onChange={onLtaChange} value={contractForm.ltaId ?? ''}>
              <option value={undefined} hidden>
                Part of Long Term Agreement
              </option>
              {ltas.map((lta) => (
                <option key={lta.id} value={lta.id}>
                  {lta.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-container">
            <div className="dropdown currency">
              <select onChange={onCurrencyChange} value={contractForm.currencyId ?? ''}>
                {currencies.map((currency) => (
                  <option key={currency.id} value={currency.id}>
                    {currency.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="number"
              value={contractForm.budget ?? ''}
              min="0"
              placeholder="Budget"
              onChange={onBudgetChange}
            />
          </div>
          <DateContainer>
            <DateStart>
              <div>
                <span className="icon icon-24 icon-date icon-blue" />
                <p>Start Date</p>
              </div>
              <input
                type="date"
                max={contractForm.endDate}
                onChange={onStartDateChange}
                value={contractForm.startDate ?? ''}
              />
            </DateStart>
            <DateEnd>
              <div>
                <span className="icon icon-24 icon-date icon-blue" />
                <p>Valid through</p>
              </div>
              <input
                type="date"
                min={contractForm.startDate}
                onChange={onEndDateChange}
                value={contractForm.endDate ?? ''}
              />
            </DateEnd>
          </DateContainer>
        </form>
      </FormContainer>
      <AttachmentContainer>
        <Attachments>
          <h5>Attachments</h5>
          <p>
            Please, attach any document related to the contract signature process that you find useful to keep in the
            system, such as service level agreements, original contracts, etc.
          </p>
        </Attachments>
        <UploadFiles>
          {draft.data?.attachments.map((attachment) => (
            <File
              id={attachment.id}
              name={attachment.name}
              url={attachment.url}
              key={attachment.url}
              onDelete={reload}
            />
          ))}
          <UploadButton
            onUpload={onUpload}
            onError={onUploadError}
            type="draft"
            typeId={contractForm.id}
            disabled={contractForm.id === null}
          />
        </UploadFiles>
      </AttachmentContainer>
    </GeneralContainer>
  )
}

export default GeneralTab
