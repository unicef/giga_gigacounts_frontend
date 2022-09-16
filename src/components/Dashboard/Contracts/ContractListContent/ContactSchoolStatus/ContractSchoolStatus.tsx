import { useRef, useEffect } from 'react'
import ContractStatusWidget from 'src/components/common/ContractStatusWidget/index'
import { ContractStatus, IContract } from 'src/types/general'
import { Icons, SchoolInfo, IconsName, IconCompleted, SchoolNumberCtr, Schools, Isp } from './styles'

interface ISchoolStatusProps {
  contract: IContract
  selected?: boolean
  onToggle?: (contract: IContract) => void
  showFlag?: boolean
}

const ContractSchoolStatus: React.FC<ISchoolStatusProps> = ({
  contract,
  onToggle,
  selected = false,
  showFlag = false,
}: ISchoolStatusProps): JSX.Element => {
  const { isp, numberOfSchools, status, name, country, totalSpent, schoolsConnection } = contract
  const ref = useRef<HTMLDivElement>(null)

  const pieChart = () => {
    switch (status) {
      case ContractStatus.Ongoing:
      case ContractStatus.Expired:
        return (
          <ContractStatusWidget
            selected={selected}
            average={schoolsConnection?.atLeastOneBellowAvg}
            good={schoolsConnection?.allEqualOrAboveAvg}
            payments={totalSpent}
          />
        )

      case ContractStatus.Completed:
        return <IconCompleted className={`icon icon-18 icon-checkmark ${selected ? 'icon-white' : 'icon-blue'} `} />

      case ContractStatus.Confirmed:
        return (
          <>
            <span className={`icon icon-28 icon-${status.toLowerCase()} icon-green `} />
            <IconsName>{status}</IconsName>
          </>
        )

      case ContractStatus.Draft:
      case ContractStatus.Sent:
        return (
          <>
            <span
              className={`icon icon-28 icon-${status.toLowerCase()} ${selected ? 'icon-white' : 'icon-light-blue'}`}
            />
            <IconsName>{status}</IconsName>
          </>
        )
      default:
        break
    }
  }

  const handleSelected = () => {
    if (contract) {
      onToggle?.(contract)
    }
  }

  useEffect(() => {
    if (selected) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [selected])

  return (
    <SchoolInfo status={status} onClick={handleSelected} selected={selected} ref={ref}>
      <div className="header">
        {showFlag && country?.flagUrl && (
          <img
            src={country.flagUrl}
            width="30"
            height="20"
            alt="flag"
            style={{ border: '1px solid var(--color-white-60)' }}
          />
        )}
        <SchoolNumberCtr>{name}</SchoolNumberCtr>
      </div>
      <span className={`icon icon-18 icon-school icon-${selected ? 'white' : 'mid-grey'}`} />
      <Schools>{numberOfSchools}</Schools>
      <span className={`icon icon-18 icon-network icon-${selected ? 'white' : 'mid-grey'}`} />
      <Isp className="tooltip ellipsis">
        {isp}
        <span className="tooltiptext">{isp}</span>
      </Isp>
      <Icons>{pieChart()}</Icons>
    </SchoolInfo>
  )
}

export default ContractSchoolStatus
