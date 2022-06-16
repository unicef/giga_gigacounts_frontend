import ContractDefaultListItem from '../ContractListContent/ContractDefaultListItem/ContractDefaultListItem';
import ContractLtaListItem from './ContractLtaListItem/ContractLtaListItem';
import ContractLtaListItems from './ContractLtaListItems/ContractLtaListItems';
import { ContractListContainer } from './styles';
import ContractSchoolStatus from './ContactSchoolStatus/ContractSchoolStatus';

interface ContractListProps {
  label?: string;
}

const ContractListContent: React.FC<ContractListProps> = ({ ...props }: ContractListProps): JSX.Element => {
  const schoolStatus = [
    {
      idx: 0,
      contractNumber: 26315657,
      contractSchoolNumber: 71041,
      contractNetworkName: 'Starlink SpaceX',
      contractSchoolStatusIcon: 'draft',
      contractInfoIconName: 'Draft'
    },
    {
      idx: 1,
      contractNumber: 43316557,
      contractSchoolNumber: 46742,
      contractNetworkName: 'AT@T',
      contractSchoolStatusIcon: 'sent',
      contractInfoIconName: 'Sent'
    },
    {
      idx: 2,
      contractNumber: 26315657,
      contractSchoolNumber: 71041,
      contractNetworkName: 'T-Mobile',
      contractSchoolStatusIcon: 'confirmed',
      contractInfoIconName: 'Confirmed'
    },
    {
      idx: 3,
      contractNumber: 43316557,
      contractSchoolNumber: 46742,
      contractNetworkName: 'Verzion Communication',
      contractSchoolStatusIcon: 'draft',
      contractInfoIconName: 'Draft'
    }
  ];

  return (
    <ContractListContainer>
      <ContractDefaultListItem></ContractDefaultListItem>
      <ContractLtaListItem></ContractLtaListItem>
      <ContractLtaListItems></ContractLtaListItems>
      <>
        {schoolStatus.map((school, i) => {
          return <ContractSchoolStatus key={i} school={school} />;
        })}
      </>
    </ContractListContainer>
  );
};

export default ContractListContent;
