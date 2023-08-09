import { Column, ComboBox, FlexGrid, InlineNotification, Row } from '@carbon/react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ContractForm, IFileUpload, IISP, ILta, IUser, Translation, UserRoles } from 'src/@types'
import { useAuthContext } from 'src/auth/useAuthContext'
import UploadError from 'src/components/errors/UploadError'
import { RHFCheckbox, RHFDatePicker, RHFSelect, RHFTextField } from 'src/components/hook-form'
import { Stack } from 'src/components/stack'
import { SectionSubtitle, SectionTitle } from 'src/components/typography'
import { UploadBox } from 'src/components/upload-box'
import { UserList } from 'src/components/user-list'
import { useBusinessContext } from 'src/context/BusinessContext'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { getUsers } from 'src/api/user'
import { CONTRACT_TEAM_ROLES, ISP_CONTACT_ROLES } from 'src/constants'
import { ContractSchoolsAndAttachments } from './types'

type Step1Props = {
  onChange: Dispatch<SetStateAction<ContractSchoolsAndAttachments>>
  fields: {
    attachments: IFileUpload[]
    contacts: IUser[]
    stakeholders: IUser[]
  }
  deleteAttachment: (name: string) => void
  uploadAttachment: (attachment: IFileUpload) => void
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
  const { isAdmin } = useAuthContext()
  const { getValues, setValue, watch } = useFormContext<ContractForm>()
  const { countries, ltas, refetchLtas, refetchIsps } = useBusinessContext()
  const { palette, spacing } = useTheme()
  const { translate } = useLocales()

  const {
    country: countryId,
    ltaId,
    isp: ispId,
    id: contractId,
    name: contractName,
    paymentReceiverId
  } = watch()

  const hasContactPeople = fields.contacts.length > 0
  const hasTeam = fields.stakeholders.length > 0

  const [ltaOptions, setLtaOptions] = useState<ILta[]>(
    ltas.filter((l) => l.country_id === countryId)
  )
  const [ispOptions, setIspOptions] = useState<IISP[]>([])
  const [ispContactOptions, setIspContactOptions] = useState<IUser[]>([])
  const [teamMemberOptions, setTeamMemberOptions] = useState<IUser[]>([])

  const [showContactForm, setShowContactForm] = useState(hasContactPeople)
  const [showContactNotification, setShowContactNotification] = useState(false)

  useEffect(() => {
    if (!isAutomatic) return
    const receiver = ispContactOptions.find((u) => u.id === paymentReceiverId)
    if (!receiver) return
    if (!receiver.walletAddress) setShowContactNotification(true)
  }, [paymentReceiverId, ispContactOptions, isAutomatic])

  useEffect(() => {
    if (ispId) setShowContactForm(true)
  }, [ispId])

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
    if (!isAdmin || !countryId) return
    refetchLtas(countryId)?.then((rs) => {
      if (rs instanceof Error) throw rs
      setLtaOptions(rs)
      if (ltaId && rs.some((lta) => lta.id === ltaId)) return
      setValue('ltaId', rs[0]?.id)
      handlePost(getValues())
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, countryId])

  useEffect(() => {
    if (!countryId) return
    refetchIsps(countryId, ltaId)?.then((rs) => {
      if (rs instanceof Error) throw rs
      setIspOptions(rs)
      if (ispId && rs.some((isp) => isp.id === ispId)) return
      setValue('isp', rs[0]?.id)
      handlePost(getValues())
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId, ltaId])

  const [reading, setReading] = useState(false)

  const handleDrop = (acceptedFiles: File[]): void => {
    setReading(true)
    const pdf = acceptedFiles[0]
    if (pdf.name.split('.').pop() !== 'pdf') return setUploadErrorMessage('upload_errors.pdf')
    const reader = new FileReader()
    reader.onloadend = () => setReading(false)

    reader.onload = () => {
      const fileUpload: IFileUpload = {
        name: pdf.name,
        typeId: watch().id,
        type: 'draft',
        file: reader.result
      }
      uploadAttachment(fileUpload)
    }

    reader.onerror = () => {
      throw new Error(`Cannot read the file ${pdf.name}`)
    }
    return reader.readAsDataURL(pdf)
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

  const handleFieldChange = <K extends keyof typeof fields>(key: K, value: (typeof fields)[K]) => {
    onChange((prev) => ({ ...prev, [key]: value }))
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
        <FlexGrid
          narrow
          className="remove-gutters-2-columns"
          orientation="horizontal"
          gap={spacing.xs}
        >
          <Row>
            <Column>
              <RHFTextField
                helperText={`ID ${translate('generated')}: ${!contractId ? '' : contractId}`}
                id={`contract name ${contractId}`}
                onBlur={() => handlePost(getValues())}
                name="name"
                labelText={translate('contract_name')}
              />
            </Column>
            <Column>
              <RHFSelect
                id="long term agreement selection"
                options={ltaOptions.map((l) => ({ value: l.id, label: l.name }))}
                name="ltaId"
                label={capitalizeFirstLetter(translate('lta_name'))}
                disabled={!countryId}
              />
            </Column>
          </Row>
        </FlexGrid>

        <RHFSelect
          id={`country selection ${contractId}`}
          options={countries
            .map((c) => ({ value: c.id, label: c.name }))
            .sort((a, b) => a.label.localeCompare(b.label))}
          onChange={() => onChange((prev) => ({ ...prev, schools: [] }))}
          name="country"
          label={capitalizeFirstLetter(translate('country'))}
          disabled={!isAdmin}
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
            onChange={() => handlePost(getValues())}
            name="isp"
            label={capitalizeFirstLetter(translate('isp'))}
            disabled={!countryId || !ltaId || hasContactPeople}
            style={{ marginBottom: spacing.xs }}
          />

          {showContactForm && (
            <>
              {hasContactPeople && (
                <UserList
                  onDelete={(id) => {
                    handleFieldChange(
                      'contacts',
                      fields.contacts.filter((p) => p.id !== id)
                    )
                    deleteContact(id)
                  }}
                  users={fields.contacts}
                />
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
                  onChange={() => handlePost(getValues())}
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
            onBlur={() => handlePost(getValues())}
          />
          <RHFDatePicker
            name="endDate"
            id={`end date picker ${contractId}`}
            size="md"
            labelText={translate('end_date')}
            onBlur={() => handlePost(getValues())}
          />
        </Stack>
        <RHFCheckbox
          id="add launch date checkbox"
          helperText={capitalizeFirstLetter(translate('add_a_contract_launch_day'))}
          name="addLaunchDate"
        />
        {getValues('addLaunchDate') && (
          <RHFDatePicker
            name="launchDate"
            id={`launch date picker ${contractId}`}
            size="md"
            labelText={translate('launch_date')}
            onBlur={() => handlePost(getValues())}
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
          {hasTeam && (
            <UserList
              onDelete={(id) => {
                handleFieldChange(
                  'stakeholders',
                  fields.stakeholders.filter((p) => p.id !== id)
                )
                deleteTeamMember(id)
              }}
              users={fields.stakeholders}
            />
          )}
        </div>
      </Stack>

      <SectionTitle style={{ paddingBottom: '0' }} label="documents_and_attachments" />
      <SectionSubtitle subtitle="add_any_document" />

      <UploadError message={uploadErrorMessage} />
      <UploadBox
        status={reading ? 'uploading' : 'edit'}
        accept={['.pdf']}
        multiple
        labelText={translate('drag_and_drop_pdf_multiple')}
        attachments={fields.attachments}
        handleUpload={handleDrop}
        handleDelete={(name) => {
          handleFieldChange(
            'attachments',
            fields.attachments.filter((a) => a.name !== name)
          )
          deleteAttachment(name)
        }}
      />
    </>
  )
}
