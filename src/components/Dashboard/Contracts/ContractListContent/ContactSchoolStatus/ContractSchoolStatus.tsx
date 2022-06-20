import { Dispatch, useState } from 'react';
import ContractStatusWidget from '../../../../common/ContractStatusWidget/index';
import { ContractStatus, IContracts } from '../../@types/ContractType';
import { Action, ActionType, State } from '../../store/redux';
import { Icons, SchoolInfo, IconsName, IconCompleted, SchoolNumberCtr, Schools, Isp } from './styles';

interface ISchoolStatusProps {
  school: IContracts;
  state: State;
  dispatch: Dispatch<Action>;
}

const ContractSchoolStatus: React.FC<ISchoolStatusProps> = ({
  school,
  state,
  dispatch
}: ISchoolStatusProps): JSX.Element => {
  const [selected, setSelected] = useState(false);

  const { isp, numberOfSchools, status, name, country } = school;

  const handleSelected = () => setSelected((prevState) => !prevState);

  const pieChart = (): JSX.Element => {
    if (status === ContractStatus.Ongoing || status === ContractStatus.Expired) {
      return (
        <ContractStatusWidget selected={selected} average={15} good={60} expired={status === 'Expired'} payments={60} />
      );
    } else if (status === ContractStatus.Completed) {
      return <IconCompleted className="icon icon-18 icon-checkmark icon-blue" />;
    } else {
      return (
        <>
          <span
            className={`icon icon-28 icon-${status.toLowerCase()} ${
              status === 'Confirmed' ? 'icon-green' : 'icon-light-blue'
            }`}
          />
          <IconsName>{status}</IconsName>
        </>
      );
    }
  };

  return (
    <SchoolInfo status={status} onClick={handleSelected} className={`${selected ? 'selected' : ''} `}>
      <div className="header">
        {country?.flagUrl && <img src={country.flagUrl} width="30" height="20" alt="flag" />}
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
