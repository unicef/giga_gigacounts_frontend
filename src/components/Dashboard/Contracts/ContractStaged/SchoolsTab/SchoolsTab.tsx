import { IContractSchools } from '../../@types/ContractType'
import { SchoolsTabContainer } from './styles'

interface IContractSchoolProps {
  contractSchools: IContractSchools[]
}

const SchoolsTab: React.FC<IContractSchoolProps> = ({ contractSchools }): JSX.Element => {
  return (
    <SchoolsTabContainer>
      {contractSchools &&
        contractSchools.map((school, i) => (
          <div key={i} className="school">
            <span className="icon icon-20 icon-school icon-light-grey"></span>
            <small className="school-name">
              <b>{school.name}</b>
            </small>
            <small className="school-id">{school.id}</small>
            <small className="school-city">La Ceiba</small>
            <small className="school-region ellipsis">{school.locations}</small>
            <span className="icon icon-18 icon-plug icon-green"></span>
          </div>
        ))}
    </SchoolsTabContainer>
  )
}

export default SchoolsTab
