import { ChangeEvent, useEffect } from 'react'
import { uploadAttachment } from 'src/api/attachments'
import File from 'src/components/common/File/File'
import { IFileUpload, UploadType, UserRole } from 'src/types/general'
import {
  AttachmentContainer,
  Attachments,
  Country,
  DateContainer,
  DateEnd,
  DateStart,
  FormContainer,
  GeneralContainer,
  UploadFiles,
  CurrencySelector,
  CurrencyType,
} from './styles'
import { useRoleCheck } from 'src/state/hooks'
import UploadButton from 'src/components/common/UploadButton/UploadButton'
import { useCreateContractContext } from '../state/useCreateContractContext'
import { CreateContractActionType } from '../state/types'
import { useCountryCode } from '../state/hooks'
import { useContractsContext } from '../../state/useContractsContext'

const GeneralTab: React.FC = (): JSX.Element => {
  const {
    state: { loading, countries, currencies, ltas, contractForm, draft },
    actions: { reload, saveDraft, getLtsByCountryId },
    dispatch,
  } = useCreateContractContext()

  const {
    state: { expandedLtaId },
    actions: { toggleExpandedLta },
  } = useContractsContext()

  const countryCode = useCountryCode(contractForm.countryId)

  const onCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: CreateContractActionType.SET_COUNTRY_CODE, payload: e.currentTarget.value })
  }

  const onBehalfGovernmentChange = () => {
    dispatch({ type: CreateContractActionType.SET_BEHALF_GOVERNMENT })
  }

  const onContractNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: CreateContractActionType.SET_CONTRACT_NAME, payload: e.currentTarget.value })
  }

  const onCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: CreateContractActionType.SET_CURRENCY_CODE, payload: e.target.value })
  }

  const onLtaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: CreateContractActionType.SET_LTA, payload: e.target.value || null })
    if (e.target.value && e.target.value !== expandedLtaId) {
      toggleExpandedLta(e.target.value)
    }
  }

  const onBudgetChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: CreateContractActionType.SET_BUDGET, payload: e.target.value })
  }

  const onStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: CreateContractActionType.SET_START_DATE, payload: e.target.value })
  }

  const onEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: CreateContractActionType.SET_END_DATE, payload: e.target.value })
  }

  const onUpload = async (file: IFileUpload) => {
    if (file) {
      try {
        await saveDraft()
        await uploadAttachment(file)
        reload()
      } catch (error) {
        dispatch({ type: CreateContractActionType.SET_ERROR, payload: { error } })
      }
    }
  }

  const onUploadError = (error: Error) => dispatch({ type: CreateContractActionType.SET_ERROR, payload: { error } })

  const onAttachmentDelete = async () => {
    await saveDraft()
    reload()
  }

  useEffect(() => {
    if (contractForm.countryId && ltas[contractForm.countryId] === undefined) {
      getLtsByCountryId(contractForm.countryId)
    }
  }, [contractForm.countryId, getLtsByCountryId, ltas])

  return (
    <GeneralContainer>
      <FormContainer>
        <form>
          <Country>
            <div className="input-container dropdown">
              {countryCode && <img src={`../flags/${countryCode}.svg`} alt={countryCode} />}
              <select
                onChange={onCountryChange}
                value={contractForm.countryId ?? ''}
                disabled={loading || draft.loading}
              >
                {countries?.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            {!useRoleCheck(UserRole.GOV) && (
              <label>
                <input
                  type="checkbox"
                  checked={contractForm.governmentBehalf}
                  onChange={onBehalfGovernmentChange}
                  disabled={draft.loading}
                />
                On behalf of the government
              </label>
            )}
          </Country>
          <input
            type="text"
            value={contractForm.name ?? ''}
            placeholder="Contract Name"
            onChange={onContractNameChange}
            onBlur={saveDraft}
            disabled={draft.loading}
          />
          <div className="input-container dropdown">
            <select onChange={onLtaChange} value={contractForm.ltaId ?? ''} disabled={loading || draft.loading}>
              <option value="" hidden={contractForm.ltaId === undefined}>
                {contractForm.ltaId ? 'None' : 'Part of Long Term Agreement'}
              </option>
              {contractForm.countryId &&
                ltas[contractForm.countryId]?.map((lta) => (
                  <option key={lta.id} value={lta.id}>
                    {lta.name}
                  </option>
                ))}
            </select>
          </div>
          <CurrencySelector>
            <CurrencyType>FIAT</CurrencyType>
            <CurrencyType>CRYPTO</CurrencyType>
          </CurrencySelector>
          <div className="input-container">
            <div className="dropdown currency">
              <select
                onChange={onCurrencyChange}
                value={contractForm.currencyId ?? ''}
                disabled={loading || draft.loading}
              >
                {currencies.map((currency) => (
                  <option key={currency.id} value={currency.id}>
                    {currency.code}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="number"
              value={contractForm.budget ?? ''}
              min="0"
              placeholder="Budget"
              onChange={onBudgetChange}
              disabled={draft.loading}
            />
          </div>
          <DateContainer>
            <DateStart>
              <div>
                <span className="icon icon-24 icon-date icon-blue" />
                <p>Start Date</p>
              </div>
              <input
                type="date"
                max={contractForm.endDate}
                onChange={onStartDateChange}
                value={contractForm.startDate ?? ''}
                disabled={draft.loading}
              />
            </DateStart>
            <DateEnd>
              <div>
                <span className="icon icon-24 icon-date icon-blue" />
                <p>Valid through</p>
              </div>
              <input
                type="date"
                min={contractForm.startDate}
                onChange={onEndDateChange}
                value={contractForm.endDate ?? ''}
                disabled={draft.loading}
              />
            </DateEnd>
          </DateContainer>
        </form>
      </FormContainer>
      <AttachmentContainer>
        <Attachments>
          <h5>Attachments</h5>
          <p>
            Please, attach any document related to the contract signature process that you find useful to keep in the
            system, such as service level agreements, original contracts, etc.
          </p>
        </Attachments>
        <UploadFiles>
          {draft.data?.attachments?.map((attachment) => (
            <File
              id={attachment.id}
              name={attachment.name}
              url={attachment.url}
              key={attachment.id}
              onDelete={onAttachmentDelete}
              allowDelete
            />
          ))}
          <UploadButton
            onUpload={onUpload}
            onError={onUploadError}
            type={UploadType.draft}
            typeId={contractForm.id}
            disabled={contractForm.id === null}
          />
        </UploadFiles>
      </AttachmentContainer>
    </GeneralContainer>
  )
}

export default GeneralTab
