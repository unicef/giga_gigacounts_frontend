import { ComboBox, InlineNotification } from '@carbon/react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { ContractForm, IFileUpload, IISP, IUser, Translation, UserRoles } from 'src/@types'
import { getUsers } from 'src/api/user'
import { useAuthContext } from 'src/auth/useAuthContext'
import UploadError from 'src/components/errors/UploadError'
import { RHFCheckbox, RHFDatePicker, RHFSelect, RHFTextField } from 'src/components/hook-form'
import { Stack } from 'src/components/stack'
import { SectionSubtitle, SectionTitle } from 'src/components/typography'
import { UploadBox } from 'src/components/upload-box'
import { UserChipList } from 'src/components/user'
import { CONTRACT_TEAM_ROLES, ISP_CONTACT_ROLES } from 'src/constants'
import { useBusinessContext } from 'src/context/business/BusinessContext'
import { useLocales } from 'src/locales'
import { redirectOnError } from 'src/pages/errors/handlers'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { ContractSchoolsAndAttachments } from './types'

type Step1Props = {
  onChange: Dispatch<SetStateAction<ContractSchoolsAndAttachments>>
  fields: {
    attachments: (IFileUpload & { status: 'uploading' | 'edit' | 'complete' })[]
    contacts: IUser[]
    stakeholders: IUser[]
  }
  deleteAttachment: (name: string) => void
  uploadAttachment: (
    attachment: IFileUpload & { status: 'complete' | 'edit' | 'uploading' }
  ) => void
  addContact: (contactForm: IUser) => void
  deleteContact: (id: string) => void
  addTeamMember: (teamMemberForm: IUser) => void
  deleteTeamMember: (id: string) => void
  handlePost: (contractForm: ContractForm) => void
  uploadErrorMessage: Translation | ''
  setUploadErrorMessage: Dispatch<SetStateAction<Translation | ''>>
  isAutomatic: boolean
}

export default function Step1({
  onChange,
  fields,
  handlePost,
  deleteAttachment,
  uploadAttachment,
  uploadErrorMessage,
  setUploadErrorMessage,
  addContact,
  deleteContact,
  addTeamMember,
  deleteTeamMember,
  isAutomatic
}: Step1Props) {
  const navigate = useNavigate()
  const { isAdmin } = useAuthContext()
  const { getValues, setValue } = useFormContext<ContractForm>()
  const { countries, refetchIsps } = useBusinessContext()
  const { palette, spacing } = useTheme()
  const { translate } = useLocales()

  const paymentReceiverId = getValues('paymentReceiverId')
  const ispId = getValues('isp')
  const contractId = getValues('id')
  const countryId = getValues('country')
  const contractName = getValues('name')

  const hasContactPeople = fields.contacts.length > 0
  const hasTeam = fields.stakeholders.length > 0

  const [ispOptions, setIspOptions] = useState<IISP[]>([])
  const [ispContactOptions, setIspContactOptions] = useState<IUser[]>([])
  const [teamMemberOptions, setTeamMemberOptions] = useState<IUser[]>([])

  const [showContactNotification, setShowContactNotification] = useState(false)

  useEffect(() => {
    if (!isAutomatic) return setShowContactNotification(false)
    const receiver = ispContactOptions.find((u) => u.id === paymentReceiverId)
    if (!receiver || fields.contacts.length === 0) return setShowContactNotification(false)
    if (!receiver.walletAddress) return setShowContactNotification(true)
    return setShowContactNotification(false)
  }, [paymentReceiverId, ispContactOptions, isAutomatic, fields.contacts])

  useEffect(() => {
    if (ispId)
      getUsers(countryId, ISP_CONTACT_ROLES, ispId)
        .then(setIspContactOptions)
        .catch(() => setIspContactOptions([]))
  }, [ispId, countryId])

  useEffect(() => {
    getUsers(countryId, CONTRACT_TEAM_ROLES)
      .then(setTeamMemberOptions)
      .catch(() => setTeamMemberOptions([]))
  }, [countryId])

  useEffect(() => {
    if (!countryId) return
    refetchIsps(countryId)
      ?.then((rs) => {
        setIspOptions(rs)
        if (ispId && rs.some((isp) => isp.id === ispId)) return
        setValue('isp', rs[0]?.id)
      })
      .catch((err) => redirectOnError(navigate, err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId])

  const handleDrop = (acceptedFiles: File[]): void => {
    const pdf = acceptedFiles[0]
    if (pdf.name.split('.').pop() !== 'pdf') {
      setUploadErrorMessage('upload_errors.pdf')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const fileUpload = {
        name: pdf.name,
        typeId: getValues('id'),
        type: 'draft',
        file: reader.result,
        status: 'uploading'
      } as const
      uploadAttachment(fileUpload)
    }

    reader.onerror = () => {
      throw new Error(`Cannot read the file ${pdf.name}`)
    }
    reader.readAsDataURL(pdf)
  }

  const handleAddTeamMember = (teamMember: IUser) => {
    addTeamMember(teamMember)
    handlePost(getValues())
  }

  const handleAddContact = (contactInfo: IUser) => {
    addContact(contactInfo)
    handlePost(getValues())
    if (fields.contacts.length === 0) setValue('paymentReceiverId', contactInfo.id)
  }

  const ispContactOptionsFiltered = ispContactOptions.filter(
    (o) => o && !fields.contacts.some((c) => c.id === o.id)
  )

  const teamMembersOptionsFiltered = teamMemberOptions.filter(
    (o) => o && !fields.stakeholders.some((c) => c.id === o.id)
  )

  const selectedContractManagers = fields.contacts.filter(
    (u) => u.role.code === UserRoles.ISP_CONTRACT_MANAGER
  )

  const handleDeleteContact = (id: string) => {
    deleteContact(id)
    handlePost(getValues())
    if (selectedContractManagers.length === 1) setValue('paymentReceiverId', '')
    else if (selectedContractManagers.length === 2) {
      const lastContact = selectedContractManagers.find((c) => c.id !== id)
      setValue('paymentReceiverId', lastContact?.id ?? '')
    }
  }

  return (
    <>
      <SectionTitle label="contract_details" required />
      <SectionSubtitle subtitle="add_the_general_details" />

      {isAutomatic && (
        <>
          <RHFCheckbox
            id={`automatic contract checkbox ${contractId}`}
            helperText={translate('automatic')}
            name="automatic"
            disabled
            checked
          />
          <InlineNotification
            kind="info"
            subtitle={capitalizeFirstLetter(translate('automatic_contracts_check_info'))}
            lowContrast
          />
        </>
      )}
      <br />
      <Stack gap={spacing.md} orientation="vertical">
        <RHFTextField
          helperText={`ID ${translate('generated')}: ${!contractId ? '' : contractId}`}
          id={`contract name ${contractId}`}
          name="name"
          labelText={translate('contract_name')}
          onBlur={() => handlePost(getValues())}
        />
        <RHFSelect
          id={`country selection ${contractId}`}
          options={countries
            .map((c) => ({ value: c.id, label: c.name }))
            .sort((a, b) => a.label.localeCompare(b.label))}
          onChange={() => {
            handlePost(getValues())
            onChange((prev) => ({ ...prev, schools: [] }))
          }}
          name="country"
          label={capitalizeFirstLetter(translate('country'))}
          readOnly={!isAdmin}
        />

        <div
          style={{
            backgroundColor: palette.background.neutral,
            padding: spacing.md
          }}
        >
          <RHFSelect
            id={`internet service provider selection ${contractId}`}
            options={ispOptions.map((i) => ({ value: i.id, label: i.name }))}
            name="isp"
            label={capitalizeFirstLetter(translate('isp'))}
            disabled={!countryId || hasContactPeople}
            style={{ marginBottom: spacing.xs }}
            onChange={() => handlePost(getValues())}
          />

          {ispId && (
            <>
              {hasContactPeople && (
                <UserChipList onDelete={handleDeleteContact} users={fields.contacts} />
              )}
              <ComboBox
                placeholder={translate('search_isp_contacts')}
                items={ispContactOptionsFiltered}
                selectedItem={{ name: '' }}
                itemToString={(i: IUser) => i.name}
                id={`isp contact contract combo box ${contractId}`}
                disabled={!contractName || !ispId || ispContactOptionsFiltered.length === 0}
                titleText={capitalizeFirstLetter(translate('add_an_isp'))}
                onChange={(data: { selectedItem: IUser }) => handleAddContact(data.selectedItem)}
              />
              {hasContactPeople && isAutomatic && (
                <RHFSelect
                  selectedItem={{
                    value: paymentReceiverId,
                    label:
                      selectedContractManagers.find((c) => c.id === paymentReceiverId)?.name ?? ''
                  }}
                  name="paymentReceiverId"
                  options={selectedContractManagers.map((u) => ({
                    value: u.id,
                    label: u.name
                  }))}
                  id={`isp payment receiver combo box ${contractId}`}
                  label={capitalizeFirstLetter(translate('payment_receiver'))}
                  style={{ marginTop: spacing.xs }}
                />
              )}
            </>
          )}

          {showContactNotification && (
            <InlineNotification
              style={{ marginTop: spacing.md }}
              kind="warning"
              subtitle={capitalizeFirstLetter(translate('payment_receiver_warning'))}
              lowContrast
            />
          )}
        </div>

        <div style={{ backgroundColor: palette.background.neutral, padding: spacing.md }}>
          <RHFCheckbox
            id={`bypass isp confirmation contract checkbox ${contractId}`}
            helperText={capitalizeFirstLetter(translate('enable_bypass'))}
            name="bypass"
            onChange={() => handlePost(getValues())}
          />
          <InlineNotification
            title={capitalizeFirstLetter(translate('important'))}
            kind="info"
            subtitle={translate('bypass_isp_description')}
            lowContrast
            hideCloseButton
          />
        </div>

        <Stack orientation="horizontal" gap={spacing.md}>
          <RHFDatePicker
            name="startDate"
            id={`start date picker ${contractId}`}
            size="md"
            labelText={translate('start_date')}
            onChange={() => handlePost(getValues())}
          />
          <RHFDatePicker
            name="endDate"
            id={`end date picker ${contractId}`}
            size="md"
            labelText={translate('end_date')}
            onChange={() => handlePost(getValues())}
          />
        </Stack>
        <RHFCheckbox
          id={`add launch date checkbox ${contractId}`}
          helperText={capitalizeFirstLetter(translate('add_a_contract_launch_day'))}
          name="addLaunchDate"
          onChange={(_, checked) => {
            if (!checked) setValue('launchDate', null)
          }}
        />
        {getValues('addLaunchDate') && (
          <RHFDatePicker
            name="launchDate"
            id={`launch date picker ${contractId}`}
            size="md"
            labelText={translate('launch_date')}
            onChange={() => handlePost(getValues())}
          />
        )}

        <SectionTitle label="contract_team" />
        <SectionSubtitle subtitle="add_the_contract_managers" />
        <div
          style={{
            backgroundColor: palette.background.neutral,
            padding: spacing.md
          }}
        >
          <ComboBox
            placeholder={translate('search_contract_team')}
            items={teamMembersOptionsFiltered}
            selectedItem={{ name: '' }}
            itemToString={(i: IUser) => i.name}
            id={`contract team combo box ${contractId}`}
            disabled={!contractName || teamMembersOptionsFiltered.length === 0}
            titleText={capitalizeFirstLetter(translate('add_a_team_member'))}
            onChange={(data: { selectedItem: IUser }) => handleAddTeamMember(data.selectedItem)}
          />
          {hasTeam && <UserChipList onDelete={deleteTeamMember} users={fields.stakeholders} />}
        </div>
      </Stack>

      <SectionTitle style={{ paddingBottom: '0' }} label="documents_and_attachments" />
      <SectionSubtitle subtitle="add_any_document" />

      <UploadError message={uploadErrorMessage} />
      <UploadBox
        maxSizeMb={20}
        accept={['.pdf']}
        labelText={translate('drag_and_drop_pdf_multiple')}
        attachments={fields.attachments}
        handleUpload={handleDrop}
        handleDelete={deleteAttachment}
      />
    </>
  )
}
