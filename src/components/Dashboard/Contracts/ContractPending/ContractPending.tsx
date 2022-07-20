import School from 'src/components/common/School/School'
import File from '../../../common/File/File'
import { ContractPendingContainer } from './styles'

interface IContractsProps {}

const ContractPending: React.FC<IContractsProps> = (): JSX.Element => {
  return (
    <ContractPendingContainer>
      <div className='title'>

        <div className='title-item contract-number'>
            <h5>Contact Number</h5>
            <div className='lta-number'>
              <span className="icon icon-24 icon-contract icon-mid-grey"></span>
              <p><b>LTA Number</b></p>
            </div>
        </div>

        <div className='title-item notice'>
          <span className="icon icon-24 icon-expired icon-light-blue"></span>
          <small><b>Message</b></small>
        </div>
      </div>


      <div className='content'>
          <div className='info'>
            <div className='info-header'>
              <h5>Botswana</h5>
              <p>The contract is conducted by the government of Botswana</p>
            </div>

              <div className='info-line'>
                <span className="icon icon-24 icon-coins icon-mid-grey"></span>
                <p>Budget:</p>
                <p><b>BWP 90000</b></p>
              </div>

              <div className='info-dates'>
                <div className='info-line'>
                  <span className="icon icon-24 icon-date icon-mid-grey"></span>
                  <p>Start Date:</p>
                  <p><b>May 24, 2022</b></p>
                </div>

                <div className='info-line'>
                  <span className="icon icon-24 icon-date icon-mid-grey"></span>
                  <p>Valid Through:</p>
                  <p><b>May 24, 2024</b></p>
                </div>
              </div>

              <div className='info-qos'>
                <h5>Expected Quality of Service</h5>
                <hr/>

                <div className='info-line'>
                  <span className="icon icon-24 icon-network icon-mid-grey"></span>
                  <p>Service Provider:</p>
                  <p><b>Vivo</b></p>
                </div>

                <div className='info-qos-metrics'>
                  <div className='info-line'>
                    <span className="icon icon-24 icon-plug icon-mid-grey"></span>
                    <p>Uptime:</p>
                    <p>
                      <b>100</b>
                    </p>
                    <p>%</p>
                  </div>

                  <div className='info-line'>
                    <span className="icon icon-24 icon-meter icon-mid-grey"></span>
                    <p>Latency:</p>
                    <p>
                      <b>50</b>
                    </p>
                    <p>ms</p>
                  </div>

                  <div className='info-line'>
                    <span className="icon icon-24 icon-down-speed icon-mid-grey"></span>
                    <p>Download Speed:</p>
                    <p>
                      <b>20</b>
                    </p>
                    <p>ms</p>
                  </div>

                  <div className='info-line'>
                    <span className="icon icon-24 icon-up-speed icon-mid-grey"></span>
                    <p>Upload Speed:</p>
                    <p>
                      <b>10</b>
                    </p>
                    <p>ms</p>
                  </div>
                </div>
              </div>

              <div className='info-attachments'>
                <h5>Attachments</h5>
                <hr />
                <div className='info-attachments-files'>
                  <File fileType='Doc' fileName='Document 1' />
                  <File fileType='Pdf' fileName='Document 2' />
                  <File fileType='xls' fileName='Long Long Long Long Title Document' />
                </div >
              </div>
            </div>



        <div className='schools'>
          <School/>
          <School/>
          <School/>
          <School/>
          <School/>
          <School/>
          <School/>
          <School/>
          <School/>
          <School/>
          <School/>
          <School/>
          <School/>
          <School/>
          <School/>
          <School/>

        </div>
      </div>
    </ContractPendingContainer>
  )
}

export default ContractPending
