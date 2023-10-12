import { DataTableRow, Link, Modal, TableCell, TableRow, Tag } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { ContractStatus, IContract, IDraft, Icon, Translation, UserRoles } from 'src/@types'
import { approveContract, duplicateContract, publishContractDraft } from 'src/api/contracts'
import { duplicateDraft, getDraft } from 'src/api/drafts'
import { useAuthContext } from 'src/auth/useAuthContext'
import { ActionButton, ActionLink } from 'src/components/action'
import { Typography } from 'src/components/typography'
import { CONTRACT_STATUS_COLORS, STRING_DEFAULT, Views } from 'src/constants'
import { useBusinessContext } from 'src/context/business/BusinessContext'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useModal } from 'src/hooks/useModal'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { useWeb3Context } from 'src/hooks/useWeb3Context'
import { useLocales } from 'src/locales'
import { ContractDetailsDrawer } from 'src/sections/@dashboard/contract/edit'
import { ContractFundDrawer } from 'src/sections/@dashboard/contract/fund'
import { getContractFromDraft, getPublishErrors } from 'src/utils/contracts'
import { parseContractStatus } from 'src/utils/status'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { getOrderedFromCells } from 'src/utils/table'
import { PublishModal } from '../publish'

type Props = {
  row: DataTableRow<(IContract & { countryName: string; ispName: string })[]>
  rowProps: TableRowProps
  onDeleteRow: (id: string) => void
  currencyCode: string
  isAutomatic: boolean
}

export default function ContractTableRow({
  row,
  rowProps,
  onDeleteRow,
  currencyCode,
  isAutomatic
}: Props & JSX.IntrinsicAttributes) {
  const navigate = useNavigate()
  const { translate } = useLocales()
  const { refetchContracts } = useBusinessContext()
  const { pushSuccess, pushWarning, pushError } = useSnackbar()
  const { isAdmin } = useAuthContext()

  const confirm = useModal()
  const duplicate = useModal()
  const approve = useModal()
  const approveWithWallet = useModal()
  const fundWithWallet = useModal()
  const withoutVerifiedWalletToApprove = useModal()
  const withoutVerifiedWalletToFund = useModal()
  const details = useModal()
  const publish = useModal()

  const [draft, setDraft] = useState<IDraft | null>(null)

  const [name, status, countryName, numberOfSchools, budget, ispName] = getOrderedFromCells(
    ['name', 'status', 'countryName', 'numberOfSchools', 'budget', 'isp'],
    row.cells
  )

  const parsedStatus = parseContractStatus(status)
  const { canAdd, canEdit, canApprove, hasSomeRole } = useAuthorization()
  const canEditContract = canEdit(Views.contract) && parsedStatus === ContractStatus.Draft
  const canApproveContract = canApprove(Views.contract) && parsedStatus === ContractStatus.Sent
  const canApproveWithWalletContract =
    hasSomeRole([
      UserRoles.GIGA_ADMIN,
      UserRoles.COUNTRY_SUPER_ADMIN,
      UserRoles.ISP_CONTRACT_MANAGER
    ]) && parsedStatus === ContractStatus.Sent
  const canAddContract = canAdd(Views.contract)
  const canFundContractWithWallet =
    hasSomeRole([
      UserRoles.GIGA_ADMIN,
      UserRoles.COUNTRY_ACCOUNTANT,
      UserRoles.COUNTRY_SUPER_ADMIN
    ]) &&
    (parsedStatus === ContractStatus.Confirmed || parsedStatus === ContractStatus.Ongoing)

  const { user } = useAuthContext()
  const { account, error, resetError, signContract, connect } = useWeb3Context()
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (!row?.id || parsedStatus !== ContractStatus.Draft) return
    getDraft(row.id).then(setDraft)
  }, [row.id, parsedStatus])

  const refetchDraft = () => {
    getDraft(row.id).then(setDraft)
  }

  const handleApproveRow = () => {
    approve.close()
    approveContract(row.id)
      .then(() => {
        refetchContracts()
        pushSuccess('push.approve_contract')
      })
      .catch(() => pushError('push.approve_contract_error'))
  }

  const handleApproveWithWalletRow = async () => {
    approveWithWallet.close()
    if (user && user.walletAddress) {
      try {
        setUpdating(true)
        resetError()
        if (!account) {
          await connect()
        }
        if (account?.toLocaleLowerCase() !== user.walletAddress.toLocaleLowerCase()) {
          pushWarning('push.approve_automatic_contract_invalid_wallet')
          setUpdating(false)
          return
        }
        const result = await signContract(row.id)
        if (result) {
          await approveContract(row.id)
          refetchContracts()
          pushSuccess('push.approve_contract')
        } else {
          console.error('error', error)
          pushError('push.approve_contract_error')
        }
      } catch (ex) {
        console.error(ex)
        pushError('push.approve_contract_error')
      }
      setUpdating(false)
    }
  }

  const handlePublish = async () => {
    if (!draft) return pushError('push.published_contract_error')
    const newContract = getContractFromDraft(draft)
    if (getPublishErrors(newContract).length !== 0)
      return pushError('push.published_contract_error')

    try {
      await publishContractDraft(newContract, draft.id, false)
      refetchContracts()
      return pushSuccess('push.published_contract')
    } catch (ex) {
      return pushError('push.published_contract_error')
    }
  }

  const handleApproveManually = async () => {
    if (!draft) {
      pushError('push.published_contract_error')
      return
    }
    const newContract = getContractFromDraft(draft)
    if (getPublishErrors(newContract).length !== 0) {
      pushError('push.published_contract_error')
      return
    }

    publishContractDraft(newContract, draft.id, !isAutomatic)
      .then(() => {
        refetchContracts()
        pushSuccess('push.approved_manually_contract')
      })
      .catch(() => pushError('push.approved_manually_contract_error'))
  }

  const handleDuplicate = async () => {
    duplicate.close()
    try {
      if (parsedStatus !== ContractStatus.Draft) await duplicateContract(row.id)
      else await duplicateDraft(row.id)

      refetchContracts()
      pushSuccess('push.duplicated_contract')
    } catch {
      pushError('push.duplicated_contract_error')
    }
  }
  const handleDelete = () => {
    if (parsedStatus !== ContractStatus.Draft) return
    onDeleteRow(row.id)
    confirm.close()
  }

  const handleView = () =>
    navigate(
      isAutomatic
        ? `/dashboard/automatic-contract/view/${parsedStatus}/${row.id}`
        : `/dashboard/contract/view/${parsedStatus}/${row.id}`
    )

  const actions: {
    icon: Icon
    label: Translation
    onClick: () => void
    variant?: 'error' | 'success'
  }[] = []
  const options: { icon: Icon; label: Translation; onClick: () => void }[] = [
    {
      icon: 'View',
      label: 'view_contract',
      onClick: handleView
    }
  ]
  if (canAddContract)
    options.push({ icon: 'Duplicate', label: 'duplicate', onClick: duplicate.open })
  if (canEditContract && draft && getPublishErrors(getContractFromDraft(draft)).length === 0)
    actions.push({
      icon: 'SuccessOutline',
      label: 'publish',
      onClick: publish.open,
      variant: 'success'
    })
  if (canEditContract) {
    options.push({ icon: 'Edit', label: 'edit', onClick: details.open })
    options.push({ icon: 'Delete', label: 'delete', onClick: confirm.open })
  }
  if (canApproveContract && !isAutomatic)
    actions.push({
      icon: 'SuccessOutline',
      label: 'approve',
      onClick: approve.open,
      variant: 'success'
    })

  if (canApproveWithWalletContract && isAutomatic)
    actions.push({
      icon: 'SuccessOutline',
      label: 'approve',
      variant: 'success',
      onClick:
        user && user.walletAddress && account
          ? approveWithWallet.open
          : withoutVerifiedWalletToApprove.open
    })

  if (canFundContractWithWallet && isAutomatic)
    options.push({
      icon: 'Fund',
      label: 'fund',
      onClick:
        user && user.walletAddress && account
          ? fundWithWallet.open
          : withoutVerifiedWalletToFund.open
    })

  return (
    <TableRow {...rowProps}>
      <TableCell style={{ verticalAlign: 'middle', width: isAdmin ? '10%' : '15%' }}>
        <Typography as="h6">{name}</Typography>
        <Link style={{ cursor: 'pointer' }} onClick={handleView}>
          ID: {row.id}
        </Link>
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: '10%' }}>
        <Tag type={CONTRACT_STATUS_COLORS[parsedStatus]}>
          {capitalizeFirstLetter(translate(`constant_status.contract.${parsedStatus}`))}
        </Tag>
      </TableCell>

      <TableCell style={{ verticalAlign: 'middle', width: '10%' }}>
        {capitalizeFirstLetter(ispName ?? STRING_DEFAULT)}
      </TableCell>
      {isAdmin && (
        <TableCell style={{ verticalAlign: 'middle', width: '15%' }}>
          {capitalizeFirstLetter(countryName ?? STRING_DEFAULT)}
        </TableCell>
      )}
      <TableCell style={{ verticalAlign: 'middle', width: '5%' }}>
        {numberOfSchools === '0' || !numberOfSchools ? STRING_DEFAULT : numberOfSchools}
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: '17.5%' }}>{`${
        currencyCode ?? ''
      } ${budget}`}</TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: '5%' }}>
        {actions.map((opt) => (
          <ActionLink
            key={name + opt.label}
            onClick={opt.onClick}
            description={opt.label}
            icon={opt.icon}
            variant={opt.variant}
          />
        ))}
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: isAdmin ? '17.5%' : '22.5%' }}>
        {options.map((opt) => (
          <ActionButton
            key={name + opt.label}
            onClick={opt.onClick}
            description={opt.label}
            icon={opt.icon}
            disabled={updating}
          />
        ))}
      </TableCell>
      <TableCell style={{ width: '0%' }}>
        {draft && (
          <ContractDetailsDrawer
            refetchDraft={refetchDraft}
            isAutomatic={isAutomatic}
            item={draft}
            open={details.value}
            onClose={details.close}
          />
        )}
        {row && (
          <ContractFundDrawer
            id={row.id}
            name={name}
            budget={budget}
            open={fundWithWallet.value}
            onClose={fundWithWallet.close}
          />
        )}
        <Modal
          open={confirm.value}
          danger
          modalLabel={capitalizeFirstLetter(translate('delete_contract.title'))}
          modalHeading={capitalizeFirstLetter(translate('delete_contract.content'))}
          primaryButtonText={capitalizeFirstLetter(translate('delete'))}
          secondaryButtonText={capitalizeFirstLetter(translate('cancel'))}
          onRequestClose={confirm.close}
          onRequestSubmit={handleDelete}
        >
          {capitalizeFirstLetter(translate('delete_contract.footer'))}
        </Modal>
        <Modal
          open={approve.value}
          modalLabel={capitalizeFirstLetter(translate('approve_contract.title'))}
          modalHeading={capitalizeFirstLetter(translate('approve_contract.content'))}
          primaryButtonText={capitalizeFirstLetter(translate('approve'))}
          secondaryButtonText={capitalizeFirstLetter(translate('cancel'))}
          onRequestClose={approve.close}
          onRequestSubmit={handleApproveRow}
        />
        <Modal
          open={approveWithWallet.value}
          modalLabel={capitalizeFirstLetter(translate('approve_automatic_contract.title'))}
          modalHeading={capitalizeFirstLetter(translate('approve_automatic_contract.content'))}
          primaryButtonText={capitalizeFirstLetter(translate('approve'))}
          secondaryButtonText={capitalizeFirstLetter(translate('cancel'))}
          onRequestClose={approveWithWallet.close}
          onRequestSubmit={handleApproveWithWalletRow}
        />
        <Modal
          open={withoutVerifiedWalletToApprove.value}
          modalLabel={capitalizeFirstLetter(translate('without_walllet.title'))}
          modalHeading={capitalizeFirstLetter(translate('without_walllet.to_approve'))}
          onRequestClose={withoutVerifiedWalletToApprove.close}
          passiveModal
        />
        <Modal
          open={withoutVerifiedWalletToFund.value}
          modalLabel={capitalizeFirstLetter(translate('without_walllet.title'))}
          modalHeading={capitalizeFirstLetter(translate('without_walllet.to_fund_contract'))}
          onRequestClose={withoutVerifiedWalletToFund.close}
          passiveModal
        />
        <Modal
          open={duplicate.value}
          modalLabel={capitalizeFirstLetter(translate('duplicate_contract.title'))}
          modalHeading={capitalizeFirstLetter(translate('duplicate_contract.content'))}
          primaryButtonText={capitalizeFirstLetter(translate('duplicate'))}
          secondaryButtonText={capitalizeFirstLetter(translate('cancel'))}
          onRequestClose={duplicate.close}
          onRequestSubmit={handleDuplicate}
        >
          {capitalizeFirstLetter(translate('duplicate_contract.footer'))}
        </Modal>

        {canEditContract && draft && getPublishErrors(getContractFromDraft(draft)).length === 0 && (
          <PublishModal
            open={publish.value}
            onClose={publish.close}
            isAutomatic={draft.automatic}
            onApproveManually={handleApproveManually}
            onApproveSent={handlePublish}
            ispId={draft.isp?.id ?? ''}
            countryId={draft.country?.id ?? ''}
          />
        )}
      </TableCell>
    </TableRow>
  )
}
