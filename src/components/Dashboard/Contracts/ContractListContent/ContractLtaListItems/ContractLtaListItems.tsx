import { useState } from 'react';
import {
  ContractLtaContent,
  ContractLtaFooter,
  ContractLtaHeader,
  ContractLtaSubHeader,
  ContractLtaIcon,
  ContractLtaListItemsContainer,
  ContractLtaNumber,
  IconShowMore,
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

interface ContractListProps {
  label?: string;
}

const ContractLtaListItems: React.FC<ContractListProps> = ({ ...props }: ContractListProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleLtaContainer = () => setIsExpanded(!isExpanded);

  return (
    <ContractLtaListItemsContainer isExpanded={isExpanded}>
      <ContractLtaHeader isExpanded={isExpanded}>
        <ContractLtaIcon>
          <span className="icon icon-20 icon-contract icon-white" />
        </ContractLtaIcon>
        <ContractLtaNumber isExpanded={isExpanded}>LTA Number</ContractLtaNumber>
        <IconShowMore
          className={`icon icon-24 ${isExpanded ? 'icon-arrow-up icon-white' : 'icon-arrow-down icon-darkest-grey'}`}
          isExpanded={isExpanded}
          onClick={toggleLtaContainer}
        />
      </ContractLtaHeader>
      {!isExpanded && <ContractLtaSubHeader />}
      {isExpanded && (
        <>
          <ContractLtaSchoolStatus>
            <ContractLtaContent>
              <ContractLtaInfo>
                <ContractNumber>26315657</ContractNumber>
                <ContractStatus>
                  <ContractSchool>
                    <span className="icon icon-18 icon-school icon-mid-grey" />
                  </ContractSchool>
                  <ContractSchoolNumber>71041</ContractSchoolNumber>
                  <ContractNetwork>
                    <span className="icon icon-18 icon-network icon-mid-grey" />
                  </ContractNetwork>
                  <ContractNetworkName>Reliance JIO</ContractNetworkName>
                </ContractStatus>
              </ContractLtaInfo>
            </ContractLtaContent>
            <ContractLtaInfoIcons>
              <span className="icon icon-28 icon-draft icon-light-blue" />
              <ContractLtaInfoIconsName>Draft</ContractLtaInfoIconsName>
            </ContractLtaInfoIcons>
          </ContractLtaSchoolStatus>

          <ContractLtaSchoolStatus>
            <ContractLtaContent>
              <ContractLtaInfo>
                <ContractNumber>43316557</ContractNumber>
                <ContractStatus>
                  <ContractSchool>
                    <span className="icon icon-18 icon-school icon-mid-grey" />
                  </ContractSchool>
                  <ContractSchoolNumber>46742</ContractSchoolNumber>
                  <ContractNetwork>
                    <span className="icon icon-18 icon-network icon-mid-grey" />
                  </ContractNetwork>
                  <ContractNetworkName>AT&T</ContractNetworkName>
                </ContractStatus>
              </ContractLtaInfo>
            </ContractLtaContent>
            <ContractLtaInfoIcons>
              <span className="icon icon-28 icon-sent icon-light-blue" />
              <ContractLtaInfoIconsName>Sent</ContractLtaInfoIconsName>
            </ContractLtaInfoIcons>
          </ContractLtaSchoolStatus>
          <ContractLtaFooter>Create Contract Here</ContractLtaFooter>
        </>
      )}
    </ContractLtaListItemsContainer>
  );
};

export default ContractLtaListItems;
