import { ContractLoaderContainer, ContractLoaderItem } from './styles'

interface IContractListProps {
  label?: string
}

const ContractLoader: React.FC<IContractListProps> = (): JSX.Element => {
  return (
    <ContractLoaderContainer>
      <ContractLoaderItem>
        <p className="dummy">1923879</p>
        <small className="dummy">1. Schools 2. Vivo</small>
        <div className="icon icon-28 icon-ongoing"></div>
      </ContractLoaderItem>

      <ContractLoaderItem>
        <p className="dummy">9128371923</p>
        <small className="dummy">1. Schools 2. Verz Communic</small>
        <div className="icon icon-28 icon-completed"></div>
      </ContractLoaderItem>

      <ContractLoaderItem>
        <p className="dummy">1234987</p>
        <small className="dummy">1. Schools 2. TIM</small>
        <div className="icon icon-28 icon-sent"></div>
      </ContractLoaderItem>

      <ContractLoaderItem>
        <p className="dummy">1230456456980</p>
        <small className="dummy">1. Schools 2. ISP Name 45</small>
        <div className="icon icon-28 icon-confirmed"></div>
      </ContractLoaderItem>

      <ContractLoaderItem>
        <p className="dummy">124530980</p>
        <small className="dummy">1. Schools 2. MTS</small>
        <div className="icon icon-28 icon-confirmed"></div>
      </ContractLoaderItem>

      <ContractLoaderItem>
        <p className="dummy">1230980</p>
        <small className="dummy">1. Schools 2. At and T</small>
        <div className="icon icon-28 icon-confirmed"></div>
      </ContractLoaderItem>

      <ContractLoaderItem>
        <p className="dummy">1230956480</p>
        <small className="dummy">1. Schools 2. Vivo</small>
        <div className="icon icon-28 icon-confirmed"></div>
      </ContractLoaderItem>
    </ContractLoaderContainer>
  )
}

export default ContractLoader
