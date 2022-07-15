import axios from 'axios'
import { ChangeEvent, Dispatch, useEffect, useRef, useCallback } from 'react'
import { createContractDraft } from 'src/api/contracts'
import { getCountries, getCurrency, getLtas } from 'src/api/createContract'
import { Action, ActionType, FileUpload, State } from '../store/redux'
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

import { useContractsContext } from '../../../context/useContractsContext'
import { uploadContractFile } from 'src/api/attachments'

interface IGeneralProps {
  state: State
  dispatch: Dispatch<Action>
}

const GeneralTab: React.FC<IGeneralProps> = ({ state, dispatch }): JSX.Element => {
  const { countries, currencies, ltas, flag, contractForm } = state
  const inputFileRef = useRef<HTMLInputElement>(null)

  const { setLoadContracts } = useContractsContext()

  const fetchData = useCallback(async () => {
    try {
      axios
        .all([getCountries(), getCurrency(), getLtas()])
        .then(
          axios.spread((...responses) => {
            const countries = responses[0]
            const currencies = responses[1]
            const ltas = responses[2]

            dispatch({
              type: ActionType.GET_FORM_DATA,
              payload: {
                countries,
                currencies,
                ltas,
              },
            })
          }),
        )
        .catch((errors) => {
          throw new Error(errors)
        })
    } catch (error) {
      dispatch({ type: ActionType.SET_ERROR, payload: error })
    }
  }, [dispatch])

  const onCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: ActionType.SET_COUNTRY_CODE, payload: e.currentTarget.value })
  }

  const onBehalfGovernmentChange = () => {
    dispatch({ type: ActionType.SET_BEHALF_GOVERNMENT })
  }

  const onContractNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionType.SET_CONTRACT_NAME, payload: e.currentTarget.value })
  }

  const onContractNameBlur = async () => {
    try {
      if (contractForm.name && contractForm.name.length > 0 && !contractForm.id) {
        const response = await createContractDraft(contractForm.name)
        dispatch({ type: ActionType.CREATE_CONTRACT_DRAFT, payload: response })
        setLoadContracts?.(true)
      }
    } catch (error) {
      dispatch({ type: ActionType.SET_ERROR, payload: error })
    }
  }

  const onCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: ActionType.SET_CURRENCY_CODE, payload: e.target.value })
  }

  const onLtaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: ActionType.SET_LTA, payload: e.target.value })
  }

  const onBudgetChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionType.SET_BUDGET, payload: e.target.value })
  }

  const onStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionType.SET_START_DATE, payload: e.target.value })
  }

  const onEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionType.SET_END_DATE, payload: e.target.value })
  }

  const onInputFiles = () => inputFileRef.current?.click()

  const handleFileEvent = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.currentTarget.files

      if (files) {
        const reader = new FileReader()
        reader.readAsDataURL(files[0])

        reader.onload = async () => {
          const fileUpload: FileUpload = {
            name: files[0].name,
            typeId: contractForm.id,
            type: 'draft',
            file: reader.result,
          }

          await uploadContractFile(fileUpload)
        }

        reader.onerror = () => {
          throw Error("can't read the file")
        }
      }
    } catch (error) {
      dispatch({ type: ActionType.SET_ERROR, payload: error })
    }
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <GeneralContainer>
      <FormContainer>
        <form>
          <Country>
            <div className="input-container dropdown">
              <img src={`../flags/${flag}.svg`} alt={flag} />
              <select onChange={onCountryChange} value={contractForm.countryId}>
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
            value={contractForm.name}
            placeholder="Contract Name"
            onChange={onContractNameChange}
            onBlur={onContractNameBlur}
          />
          <div className="input-container dropdown">
            <select onChange={onLtaChange} value={contractForm.ltaId}>
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
              <select onChange={onCurrencyChange} value={contractForm.currencyId}>
                {currencies.map((currency) => (
                  <option key={currency.id} value={currency.id}>
                    {currency.name}
                  </option>
                ))}
              </select>
            </div>
            <input type="number" value={contractForm.budget} min="0" placeholder="Budget" onChange={onBudgetChange} />
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
                value={contractForm.startDate}
              />
            </DateStart>
            <DateEnd>
              <div>
                <span className="icon icon-24 icon-date icon-blue" />
                <p>Valid through</p>
              </div>
              <input type="date" min={contractForm.startDate} onChange={onEndDateChange} value={contractForm.endDate} />
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
          <input ref={inputFileRef} id="fileUpload" type="file" accept="application/pdf" onChange={handleFileEvent} />
          <button className="btn btn-blue" onClick={onInputFiles}>
            Upload Files
          </button>
        </UploadFiles>
      </AttachmentContainer>
    </GeneralContainer>
  )
}

export default GeneralTab
