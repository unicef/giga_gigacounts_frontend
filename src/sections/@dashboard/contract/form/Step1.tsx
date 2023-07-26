import {
  Button,
  Checkbox,
  Column,
  FlexGrid,
  InlineNotification,
  Row,
  TextArea,
  TextInput
} from '@carbon/react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  ContactPersonForm,
  ContractForm,
  ContractTeamMemberForm,
  IFileUpload,
  IISP,
  ILta
} from 'src/@types'
import { useAuthContext } from 'src/auth/useAuthContext'
import UploadError from 'src/components/errors/UploadError'
import { RHFCheckbox, RHFDatePicker, RHFSelect, RHFTextField } from 'src/components/hook-form'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import SectionTitle from 'src/components/typography/SectionTitle'
import { UploadBox } from 'src/components/upload-box'
import { UserList } from 'src/components/user-list'
import { useBusinessContext } from 'src/context/BusinessContext'
import { Translation, useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { ContractSchoolsAndAttachments } from './types'

type Step1Props = {
  onChange: Dispatch<SetStateAction<ContractSchoolsAndAttachments>>
  fields: {
    attachments: IFileUpload[]
    contacts: ContactPersonForm[]
    contractTeam: ContractTeamMemberForm[]
  }
  deleteAttachment: (name: string) => void
  uploadAttachment: (attachment: IFileUpload) => void
  addContact: (contactForm: ContactPersonForm) => void
  deleteContact: (email: string) => void
  addTeamMember: (teamMemberForm: ContractTeamMemberForm) => void
  deleteTeamMember: (email: string) => void
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
  const { getValues, setValue, watch, resetField } = useFormContext<ContractForm>()
  const { countries, ltas, refetchLtas, refetchIsps } = useBusinessContext()
  const { translate } = useLocales()

  const countryId = watch().country
  const { ltaId, isp } = watch()

  const [ltaOptions, setLtaOptions] = useState<ILta[]>(
    ltas.filter((l) => l.country_id === countryId)
  )
  const [ispOptions, setIspOptions] = useState<IISP[]>([])

  const hasContactPeople = fields.contacts.length > 0
  const hasTeam = fields.contractTeam.length > 0

  const [showContactForm, setShowContactForm] = useState(hasContactPeople)
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhoneNumber, setContactPhoneNumber] = useState('')
  const [contactDescription, setContactDescription] = useState('')

  const [showTeamForm, setShowTeamForm] = useState(hasTeam)
  const [teamMemberName, setTeamMemberName] = useState('')
  const [teamMemberEmail, setTeamMemberEmail] = useState('')
  const [teamMemberPhoneNumber, setTeamMemberPhoneNumber] = useState('')
  const [teamMemberDescription, setTeamMemberDescription] = useState('')

  const [showContactNotification, setShowContactNotification] = useState(false)
  const [showTeamNotification, setShowTeamNotification] = useState(false)

  useEffect(() => {
    if (showContactNotification) setTimeout(() => setShowContactNotification(false), 3000)
  }, [showContactNotification])

  useEffect(() => {
    if (showTeamNotification) setTimeout(() => setShowTeamNotification(false), 3000)
  }, [showTeamNotification])

  useEffect(() => {
    if (!isAdmin || !countryId) return
    resetField('ltaId')
    refetchLtas(countryId)?.then((rs) => {
      if (rs instanceof Error) throw rs
      setLtaOptions(rs)
      if (!ltaId) setValue('ltaId', rs[0]?.id)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, countryId])

  useEffect(() => {
    if (!countryId) return
    resetField('isp')
    refetchIsps(countryId, ltaId)?.then((rs) => {
      if (rs instanceof Error) throw rs
      setIspOptions(rs)
      if (!isp) setValue('isp', rs[0]?.id)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId, ltaId])

  const [reading, setReading] = useState(false)

  const handleFieldChange = <K extends keyof typeof fields>(key: K, value: (typeof fields)[K]) => {
    onChange((prev) => ({ ...prev, [key]: value }))
  }

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

  const { palette, spacing } = useTheme()

  return (
    <>
      <SectionTitle label={translate('contract_details')} />
      {isAutomatic && (
        <>
          <RHFCheckbox
            id={`automatic contract checkbox ${getValues('id')}`}
            helperText={translate('automatic')}
            name="automatic"
            disabled
            checked
          />
          <InlineNotification
            kind="info"
            subtitle={translate('automatic_contracts_check_info')}
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
                helperText={`ID ${translate('generated')}: ${
                  !getValues('id') ? '' : getValues('id')
                }`}
                id={`contract name ${getValues('id')}`}
                onBlur={() => handlePost(getValues())}
                name="name"
                labelText={translate('contract_name')}
              />
            </Column>
            <Column>
              <RHFSelect
                id="long term agreement selection"
                options={ltaOptions.map((l) => ({ value: l.id, label: l.name }))}
                onChange={() => handlePost(getValues())}
                name="ltaId"
                label={capitalizeFirstLetter(translate('lta_name'))}
                disabled={!getValues('country')}
              />
            </Column>
          </Row>
        </FlexGrid>
        <RHFSelect
          id={`country selection ${getValues('id')}`}
          options={countries.map((c) => ({ value: c.id, label: c.name }))}
          onChange={() => handlePost(getValues())}
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
            id={`internet service provider selection ${getValues('id')}`}
            options={ispOptions.map((i) => ({ value: i.id, label: i.name }))}
            onChange={() => handlePost(getValues())}
            name="isp"
            label={capitalizeFirstLetter(translate('isp'))}
            disabled={!getValues('country') || !getValues('ltaId')}
          />
          <Checkbox
            id={`isp contract contract checkbox ${getValues('id')}`}
            labelText={capitalizeFirstLetter(translate('add_an_isp'))}
            onChange={(_, data) => setShowContactForm(data.checked)}
            disabled={hasContactPeople}
            checked={hasContactPeople || showContactForm}
          />
          {(hasContactPeople || showContactForm) && (
            <>
              <TextInput
                labelText={capitalizeFirstLetter(translate('name'))}
                id={`contact person name ${getValues('id')}`}
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
              <FlexGrid
                narrow
                className="remove-gutters-2-columns"
                orientation="horizontal"
                gap={spacing.xs}
              >
                <Row>
                  <Column>
                    <TextInput
                      labelText={capitalizeFirstLetter(translate('email'))}
                      id={`contact person email ${getValues('id')}`}
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </Column>
                  <Column>
                    <TextInput
                      labelText={capitalizeFirstLetter(translate('phone_number'))}
                      id={`contact person phone number ${getValues('id')}`}
                      value={contactPhoneNumber}
                      onChange={(e) => setContactPhoneNumber(e.target.value)}
                    />
                  </Column>
                </Row>
              </FlexGrid>
              <TextArea
                labelText=""
                value={contactDescription}
                placeholder={translate('comment_section.placeholder')}
                rows={4}
                onChange={(e) => {
                  setContactDescription(e.target.value)
                }}
                maxCount={5000}
                enableCounter
              />
              <Button
                size="sm"
                className="btn-max-width-limit"
                style={{ width: '50%', marginBlock: spacing.xl }}
                kind="secondary"
                onClick={() => {
                  setShowContactNotification(true)
                  addContact({
                    name: contactName,
                    phoneNumber: contactPhoneNumber,
                    email: contactEmail,
                    description: contactDescription
                  })
                  setContactDescription('')
                  setContactEmail('')
                  setContactPhoneNumber('')
                  setContactName('')
                }}
              >
                {capitalizeFirstLetter(translate('add_contact'))}
              </Button>
              {hasContactPeople && (
                <UserList
                  onDelete={(email) => {
                    handleFieldChange(
                      'contacts',
                      fields.contacts.filter((p) => p.email !== email)
                    )
                    deleteContact(email)
                  }}
                  users={fields.contacts}
                />
              )}

              {showContactNotification && (
                <InlineNotification
                  style={{ marginTop: spacing.md }}
                  kind="success"
                  subtitle={translate('contact_saved')}
                  lowContrast
                />
              )}
            </>
          )}
        </div>

        <div style={{ backgroundColor: palette.background.neutral, padding: spacing.md }}>
          <RHFCheckbox
            id={`bypass isp confirmation contract checkbox ${getValues('id')}`}
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
            id={`start date picker ${getValues('id')}`}
            size="md"
            labelText={translate('start_date')}
            onBlur={() => handlePost(getValues())}
          />
          <RHFDatePicker
            name="endDate"
            id={`end date picker ${getValues('id')}`}
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
            id={`launch date picker ${getValues('id')}`}
            size="md"
            labelText={translate('launch_date')}
            onBlur={() => handlePost(getValues())}
          />
        )}

        <SectionTitle label={translate('contract_team')} />
        <div
          style={{
            backgroundColor: palette.background.neutral,
            padding: spacing.md
          }}
        >
          <Checkbox
            id={`contract team checkbox ${getValues('id')}`}
            labelText={capitalizeFirstLetter(translate('add_a_team_member'))}
            onChange={(_, data) => setShowTeamForm(data.checked)}
            disabled={hasTeam}
            checked={hasTeam || showTeamForm}
          />
          {(hasTeam || showTeamForm) && (
            <>
              <TextInput
                labelText={capitalizeFirstLetter(translate('name'))}
                id={`team member name ${getValues('id')}`}
                value={teamMemberName}
                onChange={(e) => setTeamMemberName(e.target.value)}
              />
              <FlexGrid
                narrow
                className="remove-gutters-2-columns"
                orientation="horizontal"
                gap={spacing.xs}
              >
                <Row>
                  <Column>
                    <TextInput
                      labelText={capitalizeFirstLetter(translate('email'))}
                      id={`team member email ${getValues('id')}`}
                      value={teamMemberEmail}
                      onChange={(e) => setTeamMemberEmail(e.target.value)}
                    />
                  </Column>
                  <Column>
                    <TextInput
                      labelText={capitalizeFirstLetter(translate('phone_number'))}
                      id={`team member phone number ${getValues('id')}`}
                      value={teamMemberPhoneNumber}
                      onChange={(e) => setTeamMemberPhoneNumber(e.target.value)}
                    />
                  </Column>
                </Row>
              </FlexGrid>
              <TextArea
                labelText=""
                value={teamMemberDescription}
                placeholder={translate('comment_section.placeholder')}
                rows={4}
                onChange={(e) => {
                  setTeamMemberDescription(e.target.value)
                }}
                maxCount={5000}
                enableCounter
              />
              <Button
                size="sm"
                className="btn-max-width-limit"
                style={{ width: '50%', marginBlock: spacing.xl }}
                kind="secondary"
                onClick={() => {
                  setShowTeamNotification(true)
                  addTeamMember({
                    name: teamMemberName,
                    phoneNumber: teamMemberPhoneNumber,
                    email: teamMemberEmail,
                    description: teamMemberDescription
                  })
                  setTeamMemberName('')
                  setTeamMemberEmail('')
                  setTeamMemberPhoneNumber('')
                  setTeamMemberDescription('')
                }}
              >
                {capitalizeFirstLetter(translate('add_team_member'))}
              </Button>
              {hasTeam && (
                <UserList
                  onDelete={(email) => {
                    handleFieldChange(
                      'contractTeam',
                      fields.contractTeam.filter((p) => p.email !== email)
                    )
                    deleteTeamMember(email)
                  }}
                  users={fields.contractTeam}
                />
              )}

              {showTeamNotification && (
                <InlineNotification
                  style={{ marginTop: spacing.md }}
                  kind="success"
                  subtitle={translate('team_member_saved')}
                  lowContrast
                />
              )}
            </>
          )}
        </div>
      </Stack>

      <SectionTitle style={{ paddingBottom: '0' }} label={translate('documents_and_attachments')} />
      <Typography variant="disabled" style={{ paddingBottom: spacing.xl }}>
        {translate('add_any_document')}
      </Typography>

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
