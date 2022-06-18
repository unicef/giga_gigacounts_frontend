import { Icons, IconsName, SchoolInfo, SchoolNumberCtr, SchoolStatus } from './styles';

interface ContractListProps {
  label?: string;
}

const ContractDefaultListItem: React.FC<ContractListProps> = (): JSX.Element => {
  return (
    <SchoolStatus>
      <SchoolInfo>
        <SchoolNumberCtr>New Contract</SchoolNumberCtr>
      </SchoolInfo>
      <Icons>
        <span className="icon icon-28 icon-draft icon-white" />
        <IconsName>Draft</IconsName>
      </Icons>
    </SchoolStatus>
  );
};

export default ContractDefaultListItem;
