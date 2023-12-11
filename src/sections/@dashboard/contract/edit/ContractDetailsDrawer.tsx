import { Button, InlineLoading, Modal, ProgressIndicator, ProgressStep } from '@carbon/react';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Contract,
  ContractCreationError,
  ContractForm,
  ContractStep,
  ICurrency,
  IDraft,
  IExternalUser,
  IFileUpload,
  IISP,
  IUser,
  Translation
} from 'src/@types';
import { deleteAttachment, uploadAttachment } from 'src/api/attachments';
import { addNewContact, deleteContact } from 'src/api/contacts';
import { createContractDraft, publishContractDraft, updateContractDraft } from 'src/api/contracts';
import { addNewTeamMember, deleteTeamMember } from 'src/api/stakeholders';
import CancelDialog from 'src/components/cancel-dialog/CancelDialog';
import Drawer from 'src/components/drawer/Drawer';
import FormProvider from 'src/components/hook-form/FormProvider';
import Stack from 'src/components/stack/Stack';
import { SectionTitle, Typography } from 'src/components/typography';
import { EXTERNAL_CONTACT_ROLE, ICONS, PICTOGRAMS } from 'src/constants';
import { useBusinessContext } from 'src/context/business/BusinessContext';
import { useModal } from 'src/hooks/useModal';
import { useSnackbar } from 'src/hooks/useSnackbar';
import { useLocales } from 'src/locales';
import { useTheme } from 'src/theme';
import { getDraftFromForm, getPublishErrors } from 'src/utils/contracts';
import { isValidFrequency } from 'src/utils/frequencies';
import { redirectOnError } from 'src/utils/errorHandlers';
import { applyToEveryWord, capitalizeFirstLetter, threeDots } from 'src/utils/strings';
import { useContractSchema } from 'src/validations/contract';
import { PublishModal } from '../publish';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { ContractSchoolsAndAttachments } from './types';

const schoolsAndAttachmentsDefault: ContractSchoolsAndAttachments = {
  attachments: [],
  schools: [],
  contacts: [],
  stakeholders: []
}
interface Props {
  item: IDraft | null
  onClose: () => void
  open: boolean
  isAutomatic?: boolean
  refetchDraft?: () => void
}

export function ContractDetailsDrawer({
  item: draft,
  open,
  onClose,
  isAutomatic = false,
  refetchDraft
}: Props) {
  const navigate = useNavigate()
  const { spacing } = useTheme()
  const { translate, replaceTranslated } = useLocales()
  const { pushSuccess, pushError } = useSnackbar()
  const { refetchCurrencies, refetchContracts, frequencies } = useBusinessContext()
  const [activeStep, setActiveStep] = useState<ContractStep>(0)
  const [termsAndConditions, setTermsAndConditions] = useState(false)

  const methods = useContractSchema(activeStep, draft)
  const { watch, getValues, setValue, reset, handleSubmit, formState, trigger, setError } = methods
  const [currencies, setCurrencies] = useState<ICurrency[]>([])
  const [ispOptions, setIspOptions] = useState<IISP[]>([])

  const [contract, setContract] = useState<ContractSchoolsAndAttachments>(
    schoolsAndAttachmentsDefault
  )

  const [addLaunchDate, setAddLaunchDate] = useState(
    Boolean(getValues('launchDate')) &&
      !moment(getValues('launchDate')).isSame(moment(getValues('startDate')), 'day')
  )

  const notCreated = useModal()
  const unsaved = useModal()
  const saved = useModal()
  const published = useModal()

  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [created, setCreated] = useState(Boolean(draft))
  const [saving, setSaving] = useState(false)

  const [uploadErrorMessage, setUploadErrorMessage] = useState<Translation | ''>('')

  const {
    currency: currencyId,
    country: countryId,
    startDate,
    endDate,
    launchDate,
    frequencyId,
    isp: ispId
  } = watch()

  useEffect(() => {
    if (
      Boolean(launchDate) &&
      Boolean(startDate) &&
      !moment(launchDate).isSame(moment(startDate), 'day')
    )
      setAddLaunchDate(true)
  }, [startDate, launchDate])

  const filteredFrequencies = useMemo(
    () => frequencies.filter((f) => isValidFrequency(f.name, startDate, endDate)),
    [startDate, endDate, frequencies]
  )

  useEffect(() => {
    setValue('automatic', isAutomatic)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutomatic])

  useEffect(() => {
    if (frequencyId && filteredFrequencies.some((f) => f.id === currencyId)) return
    setValue('frequencyId', filteredFrequencies[0]?.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredFrequencies])

  useEffect(() => {
    if (!countryId || activeStep !== 1) return
    refetchCurrencies(isAutomatic, countryId)
      ?.then((rs) => {
        setCurrencies(rs)
        if (currencyId && rs.some((currency) => currency.id === currencyId)) return
        setValue('currency', rs[0]?.id)
      })
      .catch((err) => redirectOnError(navigate, err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutomatic, countryId, activeStep])

  useEffect(() => {
    if (uploadErrorMessage.length > 0) setTimeout(() => setUploadErrorMessage(''), 5000)
  }, [uploadErrorMessage])

  useEffect(() => {
    if (!draft) return
    setContract((prev) => ({
      ...prev,
      schools: draft?.schools ?? []
    }))
    draft.attachments.forEach((a) => {
      const attachment = contract.attachments.find((ca) => a.name === ca.name)
      if (attachment) return
      setContract((prev) => ({
        ...prev,
        attachments: [
          ...prev.attachments,
          { name: a.name, file: '', type: 'draft', typeId: draft.id, status: 'edit', id: a.id }
        ]
      }))
    })
    if (draft.ispContacts)
      draft.ispContacts.forEach((p) => {
        const person = contract.contacts.find((ac) => p.email === ac.email)
        if (person) return
        setContract((prev) => ({
          ...prev,
          contacts: [...prev.contacts, p]
        }))
      })
    if (draft.stakeholders)
      draft.stakeholders.forEach((p) => {
        const person = contract.stakeholders.find((atm) => p.id === atm.id)
        if (person) return
        setContract((prev) => ({
          ...prev,
          stakeholders: [...prev.stakeholders, p]
        }))
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft])

  const setAttachmentStatus = (
    name: string,
    newStatus: 'edit' | 'uploading' | 'complete',
    id: string
  ) => {
    setContract((prev) => {
      const indexToChange = prev.attachments.findIndex((a) => a.name === name)

      if (indexToChange === -1) return prev
      const newAttachments = [...prev.attachments]
      newAttachments[indexToChange] = { ...newAttachments[indexToChange], status: newStatus, id }

      return { ...prev, attachments: newAttachments }
    })
  }

  const handleUploadAttachments = (
    attachment: IFileUpload & { status: 'complete' | 'edit' | 'uploading' }
  ) => {
    if (!getValues('id')) {
      setError('name', { message: replaceTranslated('field_errors.required', '{{field}}', 'name') })
      return
    }
    const { name, status } = attachment

    const alreadyUploaded =
      status === 'edit' || contract.attachments.findIndex((a) => a.name === name) !== -1

    if (alreadyUploaded) {
      setUploadErrorMessage('upload_errors.distinct_name')
      return
    }
    setContract((prev) => ({ ...prev, attachments: [...prev.attachments, attachment] }))

    setSaving(true)
    uploadAttachment(attachment)
      .then((a) => {
        setAttachmentStatus(name, 'edit', a.id)
      })
      .catch(() => {
        setUploadErrorMessage('failed_to_upload')
        setContract((prev) => ({
          ...prev,
          attachments: prev.attachments.filter((a) => a.name !== name)
        }))
      })
      .finally(() => setSaving(false))
  }

  const handleAddContact = (contact: IExternalUser | IUser) => {
    if (!getValues('id')) {
      setError('name', { message: replaceTranslated('field_errors.required', '{{field}}', 'name') })
      return
    }
    const alreadyAdded = contract.contacts.find((p) => p.email === contact.email)
    if (alreadyAdded) return
    setContract((c) => ({ ...c, contacts: [...c.contacts, contact] }))

    setSaving(true)
    addNewContact(contact, getValues('id') ?? '', contact.role.name === EXTERNAL_CONTACT_ROLE)
      .catch(() => {
        setContract((prev) => ({
          ...prev,
          contacts: prev.contacts.filter((a) => a.email !== contact.email)
        }))
        pushError('failed_to_add_as_contact')
      })
      .finally(() => setSaving(false))
  }

  const handleAddTeamMembers = (member: IUser) => {
    if (!getValues('id')) {
      setError('name', { message: replaceTranslated('field_errors.required', '{{field}}', 'name') })
      return
    }
    const alreadyAdded = contract.stakeholders.find((p) => p.id === member.id)
    if (alreadyAdded) return

    setContract((c) => ({ ...c, stakeholders: [...c.stakeholders, member] }))

    setSaving(true)
    addNewTeamMember(member.id, getValues('id'))
      .catch(() => {
        setContract((prev) => ({
          ...prev,
          stakeholders: prev.stakeholders.filter((a) => a.id !== member.id)
        }))
        pushError('failed_to_add_as_team_member')
      })
      .finally(() => setSaving(false))
  }

  const handleDeleteAttachment = (attachmentName: string) => {
    const index = contract.attachments.findIndex((a) => a.name === attachmentName)
    if (index === -1) return
    const attachmentToDelete = contract.attachments[index]

    const oldAttachments = [...contract.attachments]

    setSaving(true)
    setContract((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((a) => a.name !== attachmentName)
    }))

    deleteAttachment(attachmentToDelete.id as string)
      .catch(() => {
        setContract((prev) => ({ ...prev, attachments: oldAttachments }))
      })
      .finally(() => setSaving(false))
  }

  const handleDeleteContact = (email: string) => {
    const index = contract.contacts.findIndex((a) => a.email === email)
    if (index === -1) return

    const oldContacts = [...contract.contacts]
    const contact = oldContacts[index]
    const isExternal = contact.role.name === EXTERNAL_CONTACT_ROLE

    setContract((prev) => ({ ...prev, contacts: prev.contacts.filter((a) => a.email !== email) }))

    setSaving(true)
    deleteContact(contact, getValues('id'), isExternal)
      .catch(() => {
        setContract((prev) => ({ ...prev, contacts: oldContacts }))
      })
      .finally(() => setSaving(false))
  }

  const handleDeleteTeamMember = (teamMember: IUser) => {
    const index = contract.stakeholders.findIndex((a) => a.id === teamMember.id)
    if (index === -1) return

    const oldStakeHolders = [...contract.stakeholders]

    setContract((prev) => ({
      ...prev,
      stakeholders: prev.stakeholders.filter((a) => a.id !== teamMember.id)
    }))

    setSaving(true)
    deleteTeamMember(teamMember.id, getValues('id'))
      .catch(() => {
        setContract((prev) => ({ ...prev, stakeholders: oldStakeHolders }))
      })
      .finally(() => setSaving(false))
  }

  const handlePost = async (contractForm: ContractForm) => {
    if (saving || !(await trigger()) || Object.keys(formState.errors).length > 0) return false
    const totalBudget = contract.schools
      .reduce((prev, curr) => prev + Number(curr.budget), 0)
      .toFixed(2)
    const exceedsMaxBudget = Number(totalBudget) !== Number(contractForm.budget ?? 0)
    if (exceedsMaxBudget && activeStep === 1) {
      setError('budget', { message: translate('budget_exceeds_max_error') })
      return false
    }
    const newDraft: Contract = getDraftFromForm(currencies, {
      ...contractForm,
      ...contract,
      automatic: isAutomatic
    })

    try {
      setSaving(true)
      if (draft || created) await updateContractDraft(newDraft)
      else {
        const createdContract = await createContractDraft(newDraft)
        setCreated(true)
        setValue('id', createdContract.id)
      }
      refetchContracts()
      if (refetchDraft) refetchDraft()
      setUnsavedChanges(false)
      return true
    } catch (err) {
      if (err instanceof Array && err.every((error) => error instanceof ContractCreationError)) {
        err.forEach((error) =>
          setError(error.field, {
            message: replaceTranslated(error.message, '{{field}}', error.field)
          })
        )
        return false
      }
      throw err
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = (contractForm: ContractForm) => {
    const newContract: Contract = getDraftFromForm(currencies, {
      ...contractForm,
      ...contract,
      automatic: isAutomatic
    })
    if (getPublishErrors(newContract).length > 0) return
    saved.close()
    publishContractDraft(newContract, contractForm.id, false)
      .then(() => {
        handleReset()
        pushSuccess('push.published_contract')
      })
      .catch(() => pushError('push.published_contract_error'))
  }

  const handleApproveManually = (contractForm: ContractForm) => {
    const newContract: Contract = getDraftFromForm(currencies, {
      ...contractForm,
      ...contract,
      automatic: isAutomatic
    })
    if (getPublishErrors(newContract).length > 0) return
    saved.close()
    publishContractDraft(newContract, contractForm.id, true)
      .then(() => {
        handleReset()
        pushSuccess('push.published_contract')
      })
      .catch(() => pushError('push.published_contract_error'))
  }

  const handleSaveAsDraft = async () => {
    published.close()
    const posted = await handlePost(getValues())
    if (!posted) {
      pushError('push.saved_as_draft_error')
      return
    }
    saved.open()
    refetchContracts()
    pushSuccess('push.saved_as_draft')
  }

  const stepComponents = [
    <Step1
      addLaunchDate={addLaunchDate}
      setAddLaunchDate={setAddLaunchDate}
      isAutomatic={isAutomatic}
      onChange={(c) => {
        setUnsavedChanges(true)
        setContract(c)
      }}
      handlePost={handlePost}
      fields={{
        stakeholders: contract?.stakeholders ?? [],
        attachments: contract?.attachments ?? [],
        contacts: contract?.contacts ?? []
      }}
      deleteAttachment={handleDeleteAttachment}
      uploadAttachment={handleUploadAttachments}
      addContact={handleAddContact}
      deleteContact={handleDeleteContact}
      addTeamMember={handleAddTeamMembers}
      deleteTeamMember={handleDeleteTeamMember}
      uploadErrorMessage={uploadErrorMessage}
      setUploadErrorMessage={setUploadErrorMessage}
      ispOptions={ispOptions}
      setIspOptions={setIspOptions}
    />,
    <Step2
      onChange={(c) => {
        setUnsavedChanges(true)
        setContract(c)
      }}
      fields={{
        schools: contract.schools
      }}
      handlePost={handlePost}
      currencies={currencies}
    />,
    <Step3 frequencies={filteredFrequencies} handlePost={handlePost} />,
    <Step4
      ispOptions={ispOptions}
      frequencies={filteredFrequencies}
      fields={contract}
      termsAndConditions={termsAndConditions}
      setTermsAndConditions={setTermsAndConditions}
      changeTab={(value: ContractStep) => setActiveStep(value)}
      currencies={currencies}
    />
  ]

  const lastStep = stepComponents.length - 1
  const isFirstStep = activeStep === 0
  const isLastStep = activeStep === lastStep

  const handleNext = async (contractForm: ContractForm) => {
    const posted = await handlePost(contractForm)
    if (posted) setActiveStep((prev) => (prev + 1) as ContractStep)
  }

  const handleBack = () => {
    if (!isFirstStep) setActiveStep((prev) => (prev - 1) as ContractStep)
  }
  const handleCancel = () => {
    if (!created) notCreated.open()
    else if (unsavedChanges) unsaved.open()
    else handleReset()
  }

  const handleReset = () => {
    reset()
    setActiveStep(0)
    setCreated(Boolean(draft))
    setContract(schoolsAndAttachmentsDefault)
    setTermsAndConditions(false)
    notCreated.close()
    unsaved.close()
    setUnsavedChanges(false)
    setUploadErrorMessage('')
    setCurrencies([])
    onClose()
    refetchContracts()
    setAddLaunchDate(false)
  }

  const handleCreateAnotherContract = () => {
    handleReset()
    saved.close()
    published.close()
    navigate('/dashboard/contract', { state: { new: true } })
  }

  const getSavingStatus = () => {
    if (saving) return { description: translate('autosave.saving'), status: 'active' }
    if (!created) return { description: translate('autosave.created'), status: 'error' }
    if (unsavedChanges)
      return { description: translate('autosave.unsaved_changes'), status: 'error' }
    return { description: translate('autosave.saved'), status: 'finished' }
  }

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(handleNext)}>
        <Drawer
          open={open}
          handleClose={handleCancel}
          header={
            <>
              <InlineLoading
                description={getSavingStatus().description}
                status={getSavingStatus().status}
              />
              <Stack
                orientation="vertical"
                justifyContent="center"
                alignItems="center"
                style={{
                  minHeight: '10dvh'
                }}
              >
                <SectionTitle
                  label={
                    watch().name.length > 0
                      ? threeDots(watch().name, 25)
                      : applyToEveryWord('new contract', (w) =>
                          capitalizeFirstLetter(translate(w as Translation))
                        )
                  }
                />
              </Stack>

              <ProgressIndicator spaceEqually currentIndex={activeStep}>
                {[
                  { label: '1', secondaryLabel: 'add_contract_details' },
                  { label: '2', secondaryLabel: 'add_budgets_and_schools' },
                  { label: '3', secondaryLabel: 'add_contract_terms' },
                  { label: '4', secondaryLabel: 'review_and_save' }
                ].map((item, index) => (
                  <ProgressStep
                    key={item.label}
                    current={activeStep === index}
                    complete={activeStep > index}
                    label={capitalizeFirstLetter(translate(item.label as Translation))}
                    secondaryLabel={capitalizeFirstLetter(
                      translate(item.secondaryLabel as Translation)
                    )}
                  />
                ))}
              </ProgressIndicator>
            </>
          }
          content={stepComponents[activeStep]}
          footer={
            <Stack orientation="horizontal">
              <Button
                className="btn-max-width-limit"
                style={{ width: !isLastStep ? '50%' : '33%' }}
                kind="secondary"
                renderIcon={ICONS.Back}
                iconDescription={capitalizeFirstLetter(translate('back'))}
                onClick={handleBack}
                disabled={isFirstStep}
              >
                {capitalizeFirstLetter(translate('back'))}
              </Button>
              {!isLastStep ? (
                <Button
                  className="btn-max-width-limit"
                  style={{ width: '50%' }}
                  renderIcon={ICONS.SuccessOutline}
                  iconDescription={capitalizeFirstLetter(translate('continue'))}
                  kind="primary"
                  type="submit"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {capitalizeFirstLetter(translate('continue'))}
                </Button>
              ) : (
                <>
                  <Button
                    style={{ width: '33%' }}
                    renderIcon={ICONS.Save}
                    kind="secondary"
                    onClick={handleSaveAsDraft}
                    iconDescription={capitalizeFirstLetter(
                      translate('constant_status.contract.Draft')
                    )}
                  >
                    {capitalizeFirstLetter(translate('constant_status.contract.Draft'))}
                  </Button>
                  <Button
                    style={{ width: '34%' }}
                    renderIcon={ICONS.SuccessOutline}
                    iconDescription={capitalizeFirstLetter(translate('publish'))}
                    disabled={
                      getPublishErrors(
                        getDraftFromForm(currencies, {
                          ...getValues(),
                          ...contract
                        })
                      ).length > 0 || !termsAndConditions
                    }
                    kind="primary"
                    onClick={() => published.open()}
                  >
                    {capitalizeFirstLetter(translate('publish'))}
                  </Button>
                </>
              )}
            </Stack>
          }
        />
      </FormProvider>
      <CancelDialog
        title={translate('contract_cancel_modal.title')}
        content={translate('contract_cancel_modal.content')}
        open={notCreated.value}
        onCancel={handleReset}
        onDismiss={notCreated.close}
      />
      <CancelDialog
        title={translate('contract_discard_changes_modal.title')}
        content={translate('contract_discard_changes_modal.content')}
        open={unsaved.value}
        onCancel={handleReset}
        onDismiss={unsaved.close}
      />
      <Modal
        open={saved.value}
        onRequestClose={() => {
          saved.close()
          handleReset()
        }}
        onRequestSubmit={() => {
          handlePublish(getValues())
          handleReset()
        }}
        onSecondarySubmit={handleCreateAnotherContract}
        secondaryButtonText={capitalizeFirstLetter(translate('create_another_contract'))}
        primaryButtonText={capitalizeFirstLetter(translate('publish_contract'))}
        primaryButtonDisabled={
          getPublishErrors(
            getDraftFromForm(currencies, {
              ...getValues(),
              ...contract
            })
          ).length > 0
        }
      >
        <Stack alignItems="center" justifyContent="center" gap={spacing.lg}>
          <PICTOGRAMS.Time width={84} height={84} />
          <Typography as="h4">{translate('contract_draft_modal.title')}</Typography>
          <Typography as="h6">{translate('contract_draft_modal.content')}</Typography>
        </Stack>
      </Modal>

      <PublishModal
        isAutomatic={watch().automatic}
        open={published.value}
        onClose={published.close}
        onApproveManually={() => handleApproveManually(getValues())}
        onApproveSent={() => handlePublish(getValues())}
        ispId={ispId}
        countryId={countryId}
      />
    </>
  )
}
