import { useState } from 'react';
import ContractStatusWidget from '../../../../common/ContractStatusWidget/index';
import { ContractStatus, IContracts } from '../../@types/ContractType';
import { Icons, SchoolInfo, IconsName, SchoolStatus, SchoolNumberCtr, Schools, Isp } from './styles';

interface ISchoolStatusProps {
  school: IContracts;
}

const ContractSchoolStatus: React.FC<ISchoolStatusProps> = ({ school }: ISchoolStatusProps): JSX.Element => {
  const [selected, setSelected] = useState<boolean>(false);
  const { isp, numberOfSchools, status, name } = school;

  const newStatus = status.length > 15 ? `${status.slice(0, 12) + '...'}` : `${status}`;

  const handleSelected = () => setSelected((prevState) => !prevState);

  const pieChart = (): JSX.Element => {
    if (status === ContractStatus.Ongoing) {
      return <ContractStatusWidget selected={selected} average={25} good={50} expired={false} payments={50} />;
    } else {
      return (
        <>
          <span className={`icon icon-28 icon-${status.toLowerCase()} icon-light-blue`} />
          <IconsName>{newStatus}</IconsName>
        </>
      );
    }
  };

  return (
    <SchoolStatus status={status}>
      <SchoolInfo>
        <SchoolNumberCtr>{name}</SchoolNumberCtr>
        <span className="icon icon-18 icon-school icon-mid-grey" />
        <Schools>{numberOfSchools}</Schools>
        <span className="icon icon-18 icon-network icon-mid-grey" />
        <Isp className="tooltip ellipsis">
          {isp}
          <span className="tooltiptext">{isp}</span>
        </Isp>
      </SchoolInfo>
      <Icons onClick={handleSelected}>{pieChart()}</Icons>
    </SchoolStatus>
  );
};

export default ContractSchoolStatus;
