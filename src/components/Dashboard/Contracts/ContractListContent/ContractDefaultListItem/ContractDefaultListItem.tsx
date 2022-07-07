import { Icons, IconsName, SchoolInfo, SchoolNumberCtr } from './styles'
interface IContractListProps {
  label?: string
}

const ContractDefaultListItem: React.FC<IContractListProps> = (): JSX.Element => {
  return (
    <SchoolInfo>
      <div className="header">
        <SchoolNumberCtr>New Contract</SchoolNumberCtr>
      </div>
      <Icons>
        <span className="icon icon-28 icon-draft icon-white" />
        <IconsName>Draft</IconsName>
      </Icons>
    </SchoolInfo>
  )
}

export default ContractDefaultListItem
