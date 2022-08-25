import { useMemo } from 'react'
import styled from 'styled-components/macro'
import { ContractStatus } from 'src/types/general'
import Text from 'src/components/common/Text'

const StyledIcon = styled.span``

interface PendingContractMessageContent {
  iconClass: string
  iconColorClass: string
  textColor: string
  text: string
}

const getContentByStatus = (status: string): PendingContractMessageContent => {
  switch (status) {
    case ContractStatus.Sent:
      return {
        iconClass: 'icon-sent',
        iconColorClass: 'icon-light-blue',
        text: 'The contract has been sent for Service Provider confirmation',
        textColor: '#00A0FF',
      }
    case ContractStatus.Confirmed:
      return {
        iconClass: 'icon-completed',
        iconColorClass: 'icon-green',
        text: 'Contract confirmed waiting for starting date',
        textColor: '#46C66D',
      }
    default:
      return {
        iconClass: '',
        iconColorClass: '',
        text: '',
        textColor: '',
      }
  }
}

interface PendingContractMessageProps {
  status: ContractStatus
}

const PendingContractMessage = ({ status }: PendingContractMessageProps) => {
  const { iconClass, iconColorClass, text, textColor } = useMemo(() => getContentByStatus(status), [status])

  return (
    <div className="title-item notice">
      <StyledIcon className={`icon icon-24 ${iconClass} ${iconColorClass}`}></StyledIcon>
      <Text fontSize="12px" color={textColor} bold>
        {text}
      </Text>
      <StyledIcon />
    </div>
  )
}

export default PendingContractMessage
