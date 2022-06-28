import styled from 'styled-components/macro'
import { Form } from 'formik'

export const GeneralContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 54px;
`

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`

export const StyledFieldContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

export const StyledLabel = styled.label`
  width: 100px;
  text-align: right;
`
