import { Dispatch } from 'react';
import ContractStatusWidget from '../../../../common/ContractStatusWidget/index';
import { ContractStatus, IContracts } from '../../@types/ContractType';
import { Action, State } from '../../store/redux';
import { Icons, SchoolInfo, IconsName, IconCompleted, SchoolNumberCtr, Schools, Isp } from './styles';

interface ISchoolStatusProps {
  school: IContracts;
  selected?: boolean;
  state: State;
  onToggle?: (id: string) => void;
  dispatch: Dispatch<Action>;
}

const ContractSchoolStatus: React.FC<ISchoolStatusProps> = ({
  school,
  selected,
  state,
  onToggle,
  dispatch
}: ISchoolStatusProps): JSX.Element => {
  const { isp, numberOfSchools, status, name, country } = school;

  const pieChart = () => {
    switch (status) {
      case ContractStatus.Ongoing:
      case ContractStatus.Expired:
        return (
          <ContractStatusWidget
            selected={selected}
            average={15}
            good={60}
            expired={status === 'Expired'}
            payments={60}
          />
        );

      case ContractStatus.Completed:
        return <IconCompleted className={`icon icon-18 icon-checkmark ${selected ? 'icon-white' : 'icon-blue'} `} />;

      case ContractStatus.Confirmed:
        return (
          <>
            <span className={`icon icon-28 icon-${status.toLowerCase()} icon-green `} />
            <IconsName>{status}</IconsName>
          </>
        );

      case ContractStatus.Draft:
        return (
          <>
            <span
              className={`icon icon-28 icon-${status.toLowerCase()} ${selected ? 'icon-white' : 'icon-light-blue'}`}
            />
            <IconsName>{status}</IconsName>
          </>
        );
      default:
        break;
    }
  };

  const handleSelected = () => {
    if (school !== undefined && school.id !== undefined) {
      onToggle?.(school.id);
    }
  };

  return (
    <SchoolInfo status={status} onClick={handleSelected} className={`${selected ? 'selected' : ''} `}>
      <div className="header">
        {country?.flagUrl && (
          <img
            src={country.flagUrl}
            width="30"
            height="20"
            alt="flag"
            style={{ border: '1px solid var(--color-white-40)' }}
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
  );
};

export default ContractSchoolStatus;
