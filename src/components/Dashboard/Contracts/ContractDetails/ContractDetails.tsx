import { useEffect, useCallback, Dispatch } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getContractDetails } from 'src/api/contracts'
import { ActionType, State, Action } from '../store/redux'
import { ContractDetailsContainer } from './styles'

interface IContractDetailsProps {
  state: State
  dispatch: Dispatch<Action>
}

const ContractDetails: React.FC<IContractDetailsProps> = ({ state, dispatch }: IContractDetailsProps): JSX.Element => {
  let { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { contractDetails } = state

  const fetchData = useCallback(async () => {
    if (id === undefined) {
      return
    }

    try {
      const response = await getContractDetails(id)

      let formatStartDate: string = ''
      let formatEndDate: string = ''

      if (response.startDate.length > 0) {
        formatStartDate = response.startDate.slice(0, 10)
      }

      if (response.endDate.length > 0) {
        formatEndDate = response.endDate.slice(0, 10)
      }

      const formattedResponse = {
        ...response,
        startDate: formatStartDate,
        endDate: formatEndDate,
      }

      dispatch({ type: ActionType.SET_CONTRACT_DETAILS, payload: formattedResponse })
    } catch (error) {
      dispatch({ type: ActionType.SET_ERROR, payload: error })
    }
  }, [id, dispatch])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <ContractDetailsContainer>
      {!contractDetails ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h5>Contract Number: {contractDetails.name}</h5>
          <h5>Contract IPS {contractDetails.isp}</h5>
          <h5>Contract Start Date {contractDetails.startDate}</h5>
          <button type="button" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      )}
    </ContractDetailsContainer>
  )
}

export default ContractDetails
