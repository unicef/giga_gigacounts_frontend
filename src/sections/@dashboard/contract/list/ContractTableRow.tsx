import {
  CarbonIconType,
  CheckmarkOutline,
  Edit,
  Replicate,
  TrashCan,
  View
} from '@carbon/icons-react'
import {
  Button,
  Link,
  // @ts-ignore
  Modal,
  TableCell,
  TableRow,
  // @ts-ignore
  Tag
} from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { ContractStatus, IDraft } from 'src/@types'
import { approveContract, duplicateContract, publishContractDraft } from 'src/api/contracts'
import { duplicateDraft, getDraft } from 'src/api/drafts'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Typography } from 'src/components/typography'
import { Views } from 'src/constants/authorization'
import { CONTRACT_STATUS_COLORS } from 'src/constants/status'
import { useBusinessContext } from 'src/context/BusinessContext'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useModal } from 'src/hooks/useModal'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { useWeb3Context } from 'src/hooks/useWeb3Context'
import { Translation, useLocales } from 'src/locales'
import { ContractDetailsDrawer } from 'src/sections/@dashboard/contract/form'
import { getContractFromDraft, getPublishErrors } from 'src/utils/contracts'
import { parseContractStatus } from 'src/utils/status'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  row: any
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
}: Props) {
  const navigate = useNavigate()
  const { translate } = useLocales()
  const { refetchContracts } = useBusinessContext()
  const { pushSuccess, pushWarning, pushError } = useSnackbar()

  const confirm = useModal()
  const duplicate = useModal()
  const approve = useModal()
  const approveWithWallet = useModal()
  const withoutVerifiedWallet = useModal()
  const details = useModal()
  const publish = useModal()

  const [draft, setDraft] = useState<IDraft | null>(null)

  const [name, status, ltaName, countryName, numberOfSchools, budget] = row.cells.map(
    (c: { value: any }) => c.value
  )
  const parsedStatus = parseContractStatus(status)
  const { canAdd, canEdit } = useAuthorization()
  const canEditContract = canEdit(Views.contract) && parsedStatus === ContractStatus.Draft
  const canApproveContract = canEdit(Views.contract) && parsedStatus === ContractStatus.Sent
  const canApproveWithWalletContract =
    canEdit(Views.contract) && parsedStatus === ContractStatus.Sent
  const canAddContract = canAdd(Views.contract)

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
      /* user must have a verified wallet to sign with it */
      try {
        setUpdating(true)
        await resetError()

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
          await refetchContracts()
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
    } /* else: validated using modal withoutVerifiedWallet */
  }

  const handlePublish = async () => {
    publish.close()
    if (!draft) return pushError('push.published_contract_error')
    const newContract = getContractFromDraft(draft)
    if (getPublishErrors(newContract).length === 0) {
      try {
        await publishContractDraft(newContract, draft.id)
        await refetchContracts()
        return pushSuccess('push.published_contract')
      } catch (ex) {
        return pushError('push.published_contract_error')
      }
    } else {
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
    navigate(isAutomatic ? '/dashboard/automatic-contract/view' : '/dashboard/contract/view', {
      state: { contractId: row.id, contractStatus: parsedStatus }
    })

  const options: { icon: CarbonIconType; label: Translation; onClick: () => void }[] = [
    {
      icon: View,
      label: 'view_contract',
      onClick: handleView
    }
  ]
  if (canAddContract) options.push({ icon: Replicate, label: 'duplicate', onClick: duplicate.open })
  if (canEditContract && draft && getPublishErrors(getContractFromDraft(draft)).length === 0)
    options.push({ icon: CheckmarkOutline, label: 'publish', onClick: publish.open })
  if (canEditContract) {
    options.push({ icon: Edit, label: 'edit', onClick: details.open })
    options.push({ icon: TrashCan, label: 'delete', onClick: confirm.open })
  }
  if (canApproveContract && !isAutomatic)
    options.push({ icon: CheckmarkOutline, label: 'approve', onClick: approve.open })

  if (canApproveWithWalletContract && isAutomatic)
    options.push({
      icon: CheckmarkOutline,
      label: 'approve',
      onClick: user && user.walletAddress ? approveWithWallet.open : withoutVerifiedWallet.open
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
      <TableCell>{ltaName}</TableCell>
      <TableCell>{capitalizeFirstLetter(countryName ?? '')}</TableCell>
      <TableCell>{numberOfSchools}</TableCell>
      <TableCell>{`${currencyCode ?? ''} ${budget}`}</TableCell>
      <TableCell>
        {options.map((opt) => (
          <Button
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
          open={withoutVerifiedWallet.value}
          modalLabel={translate('approve_contract_without_walllet.title')}
          modalHeading={translate('approve_contract_without_walllet.content')}
          primaryButtonText={translate('close')}
          onRequestClose={withoutVerifiedWallet.close}
          onRequestSubmit={withoutVerifiedWallet.close}
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
