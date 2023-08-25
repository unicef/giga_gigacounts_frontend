import { Button, DataTableRow, Link, Modal, TableCell, TableRow, Tag } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { ContractStatus, IDraft, Icon, Translation, UserRoles } from 'src/@types'
import { approveContract, duplicateContract, publishContractDraft } from 'src/api/contracts'
import { duplicateDraft, getDraft } from 'src/api/drafts'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Typography } from 'src/components/typography'
import { CONTRACT_STATUS_COLORS, ICONS, Views } from 'src/constants'
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

type Props = {
  row: DataTableRow
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

  const [name, status, countryName, numberOfSchools, budget] = getOrderedFromCells(
    ['name', 'status', 'countryName', 'numberOfSchools', 'budget'],
    row.cells
  )
  const parsedStatus = parseContractStatus(status)
  const { canAdd, canEdit, hasSomeRole } = useAuthorization()
  const canEditContract = canEdit(Views.contract) && parsedStatus === ContractStatus.Draft
  const canApproveContract = canEdit(Views.contract) && parsedStatus === ContractStatus.Sent
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
    if (!row || parsedStatus !== ContractStatus.Draft) return
    getDraft(row.id).then(setDraft)
  }, [row, parsedStatus])

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
    publish.close()
    if (!draft) return pushError('push.published_contract_error')
    const newContract = getContractFromDraft(draft)
    if (getPublishErrors(newContract).length !== 0)
      return pushError('push.published_contract_error')

    try {
      await publishContractDraft(newContract, draft.id)
      refetchContracts()
      return pushSuccess('push.published_contract')
    } catch (ex) {
      return pushError('push.published_contract_error')
    }
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

  const options: { icon: Icon; label: Translation; onClick: () => void }[] = [
    {
      icon: ICONS.View,
      label: 'view_contract',
      onClick: handleView
    }
  ]
  if (canAddContract)
    options.push({ icon: ICONS.Duplicate, label: 'duplicate', onClick: duplicate.open })
  if (canEditContract && draft && getPublishErrors(getContractFromDraft(draft)).length === 0)
    options.push({ icon: ICONS.SuccessOutline, label: 'publish', onClick: publish.open })
  if (canEditContract) {
    options.push({ icon: ICONS.Edit, label: 'edit', onClick: details.open })
    options.push({ icon: ICONS.Delete, label: 'delete', onClick: confirm.open })
  }
  if (canApproveContract && !isAutomatic)
    options.push({ icon: ICONS.SuccessOutline, label: 'approve', onClick: approve.open })

  if (canApproveWithWalletContract && isAutomatic)
    options.push({
      icon: ICONS.SuccessOutline,
      label: 'approve',
      onClick:
        user && user.walletAddress && account
          ? approveWithWallet.open
          : withoutVerifiedWalletToApprove.open
    })

  if (canFundContractWithWallet && isAutomatic)
    options.push({
      icon: ICONS.Fund,
      label: 'fund',
      onClick:
        user && user.walletAddress && account
          ? fundWithWallet.open
          : withoutVerifiedWalletToFund.open
    })

  return (
    <TableRow {...rowProps}>
      <TableCell>
        <Typography as="h6">{name}</Typography>
        <Link onClick={handleView}>
          ID: {`${parsedStatus === ContractStatus.Draft ? `D-${row.id}` : `C-${row.id}`}`}
        </Link>
      </TableCell>
      <TableCell>
        <Tag type={CONTRACT_STATUS_COLORS[parsedStatus]}>
          {capitalizeFirstLetter(translate(`constant_status.contract.${parsedStatus}`))}
        </Tag>
      </TableCell>
      <TableCell>{capitalizeFirstLetter(countryName ?? '')}</TableCell>
      <TableCell>{numberOfSchools}</TableCell>
      <TableCell>{`${currencyCode ?? ''} ${budget}`}</TableCell>
      <TableCell>
        {options.map((opt) => (
          <Button
            style={{ margin: 0, padding: 0 }}
            key={name + opt.label}
            kind="ghost"
            onClick={opt.onClick}
            iconDescription={capitalizeFirstLetter(translate(opt.label))}
            renderIcon={opt.icon}
            hasIconOnly
            disabled={updating}
          />
        ))}
      </TableCell>
      <TableCell>
        {draft && (
          <ContractDetailsDrawer
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
          modalLabel={translate('delete_contract.title')}
          modalHeading={translate('delete_contract.content')}
          primaryButtonText={translate('delete')}
          secondaryButtonText={translate('cancel')}
          onRequestClose={confirm.close}
          onRequestSubmit={handleDelete}
        >
          {translate('delete_contract.footer')}
        </Modal>
        <Modal
          open={approve.value}
          modalLabel={translate('approve_contract.title')}
          modalHeading={translate('approve_contract.content')}
          primaryButtonText={translate('approve')}
          secondaryButtonText={translate('cancel')}
          onRequestClose={approve.close}
          onRequestSubmit={handleApproveRow}
        />
        <Modal
          open={approveWithWallet.value}
          modalLabel={translate('approve_automatic_contract.title')}
          modalHeading={translate('approve_automatic_contract.content')}
          primaryButtonText={translate('approve')}
          secondaryButtonText={translate('cancel')}
          onRequestClose={approveWithWallet.close}
          onRequestSubmit={handleApproveWithWalletRow}
        />
        <Modal
          open={withoutVerifiedWalletToApprove.value}
          modalLabel={translate('without_walllet.title')}
          modalHeading={translate('without_walllet.to_approve')}
          primaryButtonText={translate('close')}
          onRequestClose={withoutVerifiedWalletToApprove.close}
          onRequestSubmit={withoutVerifiedWalletToApprove.close}
        />
        <Modal
          open={withoutVerifiedWalletToFund.value}
          modalLabel={translate('without_walllet.title')}
          modalHeading={translate('without_walllet.to_fund_contract')}
          primaryButtonText={translate('close')}
          onRequestClose={withoutVerifiedWalletToFund.close}
          onRequestSubmit={withoutVerifiedWalletToFund.close}
        />
        <Modal
          open={duplicate.value}
          modalLabel={translate('duplicate_contract.title')}
          modalHeading={translate('duplicate_contract.content')}
          primaryButtonText={capitalizeFirstLetter(translate('duplicate'))}
          secondaryButtonText={translate('cancel')}
          onRequestClose={duplicate.close}
          onRequestSubmit={handleDuplicate}
        >
          {translate('duplicate_contract.footer')}
        </Modal>
        <Modal
          open={publish.value}
          modalLabel={translate('publish_contract_modal.title')}
          modalHeading={translate('publish_contract_modal.content')}
          primaryButtonText={capitalizeFirstLetter(translate('publish'))}
          secondaryButtonText={translate('cancel')}
          onRequestClose={publish.close}
          onRequestSubmit={handlePublish}
        />
      </TableCell>
    </TableRow>
  )
}
