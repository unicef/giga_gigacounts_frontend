import {
  ContractLtaContent,
  ContractLtaInfo,
  ContractNumber,
  ContractStatus,
  ContractSchool,
  ContractNetwork,
  ContractSchoolNumber,
  ContractNetworkName,
  ContractLtaInfoIcons,
  ContractLtaSchoolStatus,
  ContractLtaInfoIconsName
} from './styles';

interface ContractSchoolStatusProps {
  school: {
    idx: number;
    contractNumber: number;
    contractSchoolNumber: number;
    contractNetworkName: string;
    contractSchoolStatusIcon: string;
    contractInfoIconName: string;
  };
}

const ContractSchoolStatus: React.FC<ContractSchoolStatusProps> = ({
  school
}: ContractSchoolStatusProps): JSX.Element => {
  const { contractNumber, contractSchoolNumber, contractNetworkName, contractSchoolStatusIcon, contractInfoIconName } =
    school;

  const name =
    contractNetworkName.length > 15 ? `${contractNetworkName.slice(0, 12) + '...'}` : `${contractNetworkName}`;

  return (
    <ContractLtaSchoolStatus>
      <ContractLtaContent>
        <ContractLtaInfo>
          <ContractNumber>{contractNumber}</ContractNumber>
          <ContractStatus>
            <ContractSchool>
              <span className="icon icon-18 icon-school icon-mid-grey" />
            </ContractSchool>
            <ContractSchoolNumber>{contractSchoolNumber}</ContractSchoolNumber>
            <ContractNetwork>
              <span className="icon icon-18 icon-network icon-mid-grey" />
            </ContractNetwork>
            <ContractNetworkName>{name}</ContractNetworkName>
          </ContractStatus>
        </ContractLtaInfo>
      </ContractLtaContent>
      <ContractLtaInfoIcons>
        <span className={`icon icon-28 icon-${contractSchoolStatusIcon} icon-light-blue`} />
        <ContractLtaInfoIconsName>{contractInfoIconName}</ContractLtaInfoIconsName>
      </ContractLtaInfoIcons>
    </ContractLtaSchoolStatus>
  );
};

export default ContractSchoolStatus;
