import { ChangeEvent, Dispatch, FormEvent } from 'react'
import { Action, ActionType, state, State } from '../store/redux'
import { Field, Formik } from 'formik'
import { GeneralContainer, StyledFieldContainer, StyledForm } from './styles'

interface IGeneralProps {
  state: State
  dispatch: Dispatch<Action>
}

type Values = {
  contractNumber: string
}

const initialValues: Values = {
  contractNumber: state.contractNumber,
}

const GeneralTab: React.FC<IGeneralProps> = ({ state, dispatch }): JSX.Element => {
  const handleContractNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length === 0) {
      dispatch({ type: ActionType.SET_CONTRACT_NAME, payload: '' })
      return
    }
    dispatch({ type: ActionType.SET_CONTRACT_NAME, payload: ` - ${e.currentTarget.value}` })
  }

  const handleSubmit = (values: Values) => console.log('Form submit', values)
  const handleOnChange = (event: FormEvent) => {
    console.log('Form onChange', event.target)
  }

  console.log(state)

  return (
    <GeneralContainer>
      <div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <StyledForm onChange={handleOnChange}>
            <StyledFieldContainer>
              <Field id="contractNumber" name="contractNumber" placeholder="contractNumber" />
            </StyledFieldContainer>

            <button type="submit">Submit</button>
          </StyledForm>
        </Formik>
        {/* <div className="input-container dropdown">
          <img src="flags/BR.svg" alt="Brazil" />
          <select>
            <option value="0">Brazil</option>
            <option value="1">Botswana</option>
            <option value="2">Kenya</option>
          </select>
        </div>

        <label>
          <input type="checkbox" />
          On behalf of the government
        </label>

        <div className="input-container dropdown">
          <select defaultValue="Long Term Agreement">
            <option value="" hidden>
              Long Term Agreement
            </option>
            <option value="0">LLTS-12340684</option>
            <option value="1">LLTS-56215668</option>
            <option value="2">LLTS-15648823</option>
          </select>
        </div>

        <div className="input-container">
          <div className="dropdown">
            <select>
              <option value="0">BLW</option>
              <option value="1">USD</option>
              <option value="2">EUR</option>
            </select>
          </div>

          <input type="text" name="budget" placeholder="Budget" />
        </div>

        <input
          type="text"
          name="contactName"
          placeholder="Contract Name"
          onChange={handleContractNameChange}
          onBlur={handleContractNameChange}
        /> */}
      </div>
      <div>2</div>
    </GeneralContainer>
  )
}

export default GeneralTab
