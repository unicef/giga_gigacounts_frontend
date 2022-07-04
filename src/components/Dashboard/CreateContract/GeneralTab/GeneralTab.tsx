import { ChangeEvent, Dispatch, useEffect, useRef, useCallback } from 'react'
import { getCountries, getCurrency, getLtas } from 'src/api/createContract'
import { Action, ActionType, State } from '../store/redux'
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

interface IGeneralProps {
  state: State
  dispatch: Dispatch<Action>
}

const GeneralTab: React.FC<IGeneralProps> = ({ state, dispatch }): JSX.Element => {
  const { countries, currencies, ltas, flag } = state
  const inputFileRef = useRef<HTMLInputElement>(null)

  const fetchData = useCallback(async () => {
    try {
      const allCountries = await getCountries()
      const allCurrencies = await getCurrency()
      const allLtas = await getLtas()

      dispatch({
        type: ActionType.GET_FORM_DATA,
        payload: {
          countries: allCountries,
          currencies: allCurrencies,
          ltas: allLtas,
        },
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

  const handleFileEvent = (e: ChangeEvent<HTMLInputElement>) => {
    Array.prototype.slice.call(e.target.files)
  }

  const onInputFiles = () => inputFileRef.current?.click()

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <GeneralContainer>
      <FormContainer>
        <form>
          <Country>
            <div className="input-container dropdown">
              <img src={`flags/${flag}.svg`} alt={flag} />
              <select onChange={onCountryChange}>
                {countries?.map((country) => (
                  <option key={country.id} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <label>
              <input type="checkbox" onChange={onBehalfGovernmentChange} />
              On behalf of the government
            </label>
          </Country>
          <input
            type="text"
            name="contactName"
            placeholder="Contract Name"
            onChange={onContractNameChange}
            onBlur={onContractNameChange}
          />
          <div className="input-container dropdown">
            <select defaultValue="default">
              <option value="default" disabled hidden>
                Part of Long Term Agreement
              </option>
              {ltas.map((lta) => (
                <option key={lta.id} value={lta.name}>
                  {lta.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-container">
            <div className="dropdown currency">
              <select defaultValue="default">
                <option value="default" disabled hidden>
                  BTW
                </option>
                {currencies.map((currency) => (
                  <option key={currency.id} value={currency.name}>
                    {currency.name}
                  </option>
                ))}
              </select>
            </div>
            <input type="text" name="budget" placeholder="Budget" />
          </div>
          <DateContainer>
            <DateStart>
              <div>
                <span className="icon icon-24 icon-date icon-blue" />
                <p>Start Date</p>
              </div>
              <input type="date" />
            </DateStart>
            <DateEnd>
              <div>
                <span className="icon icon-24 icon-date icon-blue" />
                <p>Valid through</p>
              </div>
              <input type="date" />
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
          <input
            ref={inputFileRef}
            id="fileUpload"
            type="file"
            multiple
            accept="application/pdf, image/png"
            onChange={handleFileEvent}
          />
          <button className="btn btn-blue" onClick={onInputFiles}>
            Upload Files
          </button>
        </UploadFiles>
      </AttachmentContainer>
    </GeneralContainer>
  )
}

export default GeneralTab
