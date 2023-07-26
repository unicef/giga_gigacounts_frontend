import { CheckmarkOutline, PreviousOutline, Save } from '@carbon/icons-react'
import { Time, TransactionalTrust } from '@carbon/pictograms-react'
import {
  Button,
  // @ts-ignore
  Modal,
  // @ts-ignore
  ProgressIndicator,
  // @ts-ignore
  ProgressStep
} from '@carbon/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  ContactPersonForm,
  Contract,
  ContractCreationError,
  ContractForm,
  ContractStatus,
  ContractStep,
  ContractTeamMemberForm,
  ICurrency,
  IDraft,
  IFileUpload
} from 'src/@types'
import { deleteAttachment, uploadAttachment } from 'src/api/attachments'
import { addNewContact, deleteContact } from 'src/api/contacts'
import {
  addNewTeamMember,
  createContractDraft,
  deleteTeamMember,
  publishContractDraft,
  updateContractDraft
} from 'src/api/contracts'
import { getDraft } from 'src/api/drafts'
import CancelDialog from 'src/components/cancel-dialog/CancelDialog'
import Drawer from 'src/components/drawer/Drawer'
import FormProvider from 'src/components/hook-form/FormProvider'
import Stack from 'src/components/stack/Stack'
import { Typography } from 'src/components/typography'
import { useBusinessContext } from 'src/context/BusinessContext'
import { useModal } from 'src/hooks/useModal'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { Translation, useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { getDraftFromForm, getPublishErrors } from 'src/utils/contracts'
import { applyToEveryWord, capitalizeFirstLetter, threeDots } from 'src/utils/strings'
import { useContractSchema } from 'src/validations/contract'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import { ContractSchoolsAndAttachments } from './types'

const schoolsAndAttachmentsDefault: ContractSchoolsAndAttachments = {
  attachments: [],
  schools: [],
  contacts: [],
  contractTeam: []
}
interface Props {
  item: IDraft | null
  onClose: VoidFunction
  open: boolean
  isAutomatic?: boolean
}

export default function ContractDetailsDrawer({
  item: draft,
  open,
  onClose,
  isAutomatic = false
}: Props) {
  const navigate = useNavigate()
  const { spacing } = useTheme()
  const { translate, replaceTranslated } = useLocales()
  const { pushSuccess, pushError } = useSnackbar()
  const { schools: countrySchools, refetchCurrencies, refetchContracts } = useBusinessContext()
  const [activeStep, setActiveStep] = useState<ContractStep>(0)
  const [termsAndConditions, setTermsAndConditions] = useState(false)
  const methods = useContractSchema(activeStep, draft)
  const { watch, getValues, setValue, reset, handleSubmit, formState, trigger, setError } = methods
  const [currencies, setCurrencies] = useState<ICurrency[]>([])

  const [contract, setContract] = useState<ContractSchoolsAndAttachments>(
    schoolsAndAttachmentsDefault
  )

  const notCreated = useModal()
  const unsaved = useModal()
  const saved = useModal()
  const published = useModal()

  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [created, setCreated] = useState(Boolean(draft))
  const [saving, setSaving] = useState(false)

  const [addedContacts, setAddedContacts] = useState<ContactPersonForm[]>([])
  const [contactsToDelete, setContactsToDelete] = useState<ContactPersonForm[]>([])

  const [addedTeamMembers, setAddedTeamMembers] = useState<ContractTeamMemberForm[]>([])
  const [teamMembersToDelete, setTeamMembersToDelete] = useState<ContractTeamMemberForm[]>([])

  const [uploadedAttachments, setUploadedAttachments] = useState<{ id: string; name: string }[]>([])
  const [attachmentsToDelete, setAttachmentsToDelete] = useState<{ id: string; name: string }[]>([])
  const [uploadErrorMessage, setUploadErrorMessage] = useState<Translation | ''>('')

  const currencyId = watch().currency

  useEffect(() => {
    refetchCurrencies(isAutomatic)?.then((rs) => {
      if (rs instanceof Error) throw rs
      setCurrencies(rs)
      if (!currencyId) setValue('currency', rs[0]?.id)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutomatic])

  useEffect(() => {
    if (!open) return
    if (!draft) return
    getDraft(draft.id).then((res) => setValue('name', res.name))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (uploadErrorMessage.length > 0) setTimeout(() => setUploadErrorMessage(''), 5000)
  }, [uploadErrorMessage])

  useEffect(() => {
    if (!draft) return
    setContract((prev) => ({
      ...prev,
      schools:
        draft?.schools?.map(({ external_id, budget }: { external_id: string; budget: string }) => ({
          id: external_id,
          budget
        })) ?? []
    }))
    draft.attachments.forEach((a) => {
      const attachment = uploadedAttachments.find((ca) => a.name === ca.name)
      if (attachment) return
      setUploadedAttachments((prev) => [...prev, { name: a.name, id: a.id }])
      setContract((prev) => ({
        ...prev,
        attachments: [
          ...prev.attachments,
          { name: a.name, file: '', type: 'draft', typeId: draft.id }
        ]
      }))
    })
    if (draft.contactPeople)
      draft.contactPeople.forEach((p) => {
        const person = addedContacts.find((ac) => p.email === ac.email)
        if (person) return
        setAddedContacts((prev) => [...prev, p])
        setContract((prev) => ({
          ...prev,
          contacts: [...prev.contacts, p]
        }))
      })
    if (draft.contractTeam)
      draft.contractTeam.forEach((p) => {
        const person = addedTeamMembers.find((atm) => p.email === atm.email)
        if (person) return
        setAddedTeamMembers((prev) => [...prev, p])
        setContract((prev) => ({
          ...prev,
          contractTeam: [...prev.contractTeam, p]
        }))
      })
  }, [draft, uploadedAttachments, addedContacts, addedTeamMembers])

  const handleUploadAttachments = (attachment: IFileUpload) => {
    const alreadyUploaded = uploadedAttachments.find((a) => a.name === attachment.name)
    const existingAttachment = contract.attachments.find((a) => a.name === attachment.name)
    const toDelete = attachmentsToDelete.find((a) => a.name === attachment.name)
    if (toDelete) {
      setAttachmentsToDelete((prev) => prev.filter((a) => a.name === attachment.name))
      setContract((c) => ({ ...c, attachments: [...c.attachments, attachment] }))
      return
    }
    if (alreadyUploaded || existingAttachment) {
      setUploadErrorMessage('upload_errors.distinct_name')
      return
    }
    setContract((c) => ({ ...c, attachments: [...c.attachments, attachment] }))
    setUnsavedChanges(true)
  }

  const handleAddContact = (contact: ContactPersonForm) => {
    const alreadyAdded = addedContacts.find((p) => p.email === contact.email)
    const existingPerson = contract.contacts.find((p) => p.email === contact.email)
    const toDelete = contactsToDelete.find((p) => p.email === contact.email)
    if (toDelete) {
      setContactsToDelete((prev) => prev.filter((p) => p.email === contact.email))
      setContract((c) => ({ ...c, contacts: [...c.contacts, contact] }))
      return
    }
    if (alreadyAdded || existingPerson) return

    setContract((c) => ({ ...c, contacts: [...c.contacts, contact] }))
    setUnsavedChanges(true)
  }

  const handleAddTeamMembers = (member: ContractTeamMemberForm) => {
    const alreadyAdded = addedTeamMembers.find((p) => p.email === member.email)
    const existingPerson = contract.contractTeam.find((p) => p.email === member.email)
    const toDelete = teamMembersToDelete.find((p) => p.email === member.email)
    if (toDelete) {
      setTeamMembersToDelete((prev) => prev.filter((p) => p.email === member.email))
      setContract((c) => ({ ...c, contractTeam: [...c.contractTeam, member] }))
      return
    }
    if (alreadyAdded || existingPerson) return

    setContract((c) => ({ ...c, contractTeam: [...c.contractTeam, member] }))
    setUnsavedChanges(true)
  }

  const handleDeleteAttachment = (attachmentName: string) => {
    const attachment = uploadedAttachments.find((a) => a.name === attachmentName)
    if (!attachment) return
    setAttachmentsToDelete((prev) => [...prev, attachment])
    setUnsavedChanges(true)
  }

  const handleDeleteContact = (email: string) => {
    const person = addedContacts.find((p) => p.email === email)
    if (!person) return
    setContactsToDelete((prev) => [...prev, person])
    setUnsavedChanges(true)
  }

  const handleDeleteTeamMember = (email: string) => {
    const person = addedTeamMembers.find((p) => p.email === email)
    if (!person) return
    setTeamMembersToDelete((prev) => [...prev, person])
    setUnsavedChanges(true)
  }

  const handlePost = async (contractForm: ContractForm) => {
    if (saving || !(await trigger()) || Object.keys(formState.errors).length > 0) return false
    const newDraft: Contract = getDraftFromForm(currencies, countrySchools, {
      ...contractForm,
      ...contract,
      automatic: isAutomatic
    })

    try {
      setSaving(true)
      if (draft || created) {
        await updateContractDraft(newDraft)
        if (contract.attachments.length > 0) {
          const result = await Promise.allSettled(
            contract.attachments
              .filter((a) => !uploadedAttachments.some((uploaded) => uploaded.name === a.name))
              .map((f) => uploadAttachment({ ...f, typeId: newDraft.id ?? '' }))
          )
          result.forEach((r) => {
            if (r.status === 'fulfilled')
              setUploadedAttachments((prev) => [...prev, { id: r.value.id, name: r.value.name }])
          })
        }
        if (contract.contacts.length > 0) {
          const result = await Promise.allSettled(
            contract.contacts
              .filter((p) => !addedContacts.some((added) => added.email === p.email))
              .map((p) => addNewContact(p, newDraft?.ispId ?? '', newDraft?.id ?? ''))
          )
          result.forEach((r) => {
            if (r.status === 'fulfilled') setAddedContacts((prev) => [...prev, r.value])
          })
        }
        if (contract.contractTeam.length > 0) {
          const result = await Promise.allSettled(
            contract.contractTeam
              .filter((p) => !addedTeamMembers.some((added) => added.email === p.email))
              .map((p) => addNewTeamMember(p, newDraft?.id ?? ''))
          )
          result.forEach((r) => {
            if (r.status === 'fulfilled') setAddedTeamMembers((prev) => [...prev, r.value])
          })
        }
      } else {
        const createdContract = await createContractDraft(newDraft)
        setCreated(true)
        if (contract.attachments.length > 0) {
          const result = await Promise.allSettled(
            contract.attachments.map((f) => uploadAttachment({ ...f, typeId: createdContract.id }))
          )
          result.forEach((r) => {
            if (r.status === 'fulfilled')
              setUploadedAttachments((prev) => [...prev, { id: r.value.id, name: r.value.name }])
          })
        }
        if (contract.contacts.length > 0) {
          const result = await Promise.allSettled(
            contract.contacts.map((p) =>
              addNewContact(p, 'createdContract.isp.id', createdContract.id)
            )
          )
          result.forEach((r) => {
            if (r.status === 'fulfilled') setAddedContacts((prev) => [...prev, r.value])
          })
        }
        if (contract.contractTeam.length > 0) {
          const result = await Promise.allSettled(
            contract.contractTeam.map((p) => addNewTeamMember(p, createdContract.id))
          )
          result.forEach((r) => {
            if (r.status === 'fulfilled') setAddedTeamMembers((prev) => [...prev, r.value])
          })
        }
        setValue('id', createdContract.id)
      }
      if (attachmentsToDelete.length > 0)
        await Promise.allSettled(attachmentsToDelete.map((a) => deleteAttachment(a.id)))
      if (contactsToDelete.length > 0)
        await Promise.allSettled(
          contactsToDelete.map((a) => deleteContact(a.email, getValues('id')))
        )
      if (teamMembersToDelete.length > 0)
        await Promise.allSettled(
          teamMembersToDelete.map((a) => deleteTeamMember(a.email, getValues('id')))
        )

      refetchContracts()
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
    const newContract: Contract = getDraftFromForm(currencies, countrySchools, {
      ...contractForm,
      schools: contract.schools,
      attachments: contract.attachments,
      automatic: isAutomatic,
      contacts: contract.contacts
    })
    if (getPublishErrors(newContract).length > 0) return
    saved.close()
    publishContractDraft(newContract, contractForm.id)
      .then((res) => {
        onClose()
        published.open()
        refetchContracts()
        pushSuccess('push.published_contract')
        setValue('id', res.id)
      })
      .catch(() => pushError('push.published_contract_error'))
  }

  const handleSaveAsDraft = () => {
    published.close()
    handlePost(getValues())
      .then((res) => {
        saved.open()
        refetchContracts()
        pushSuccess('push.saved_as_draft')
        onClose()
      })
      .catch(() => pushError('push.saved_as_draft_error'))
  }

  const stepComponents = [
    <Step1
      isAutomatic={isAutomatic}
      onChange={(c) => {
        setUnsavedChanges(true)
        setContract(c)
      }}
      handlePost={handlePost}
      fields={{
        contractTeam: contract?.contractTeam ?? [],
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
    <Step3 handlePost={handlePost} />,
    <Step4
      publishErrors={getPublishErrors(
        getDraftFromForm(currencies, countrySchools, {
          ...getValues(),
          ...contract
        })
      ).map((err) => replaceTranslated(err.message, '{{field}}', err.field as Translation))}
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
    setUploadedAttachments([])
    setAttachmentsToDelete([])
    setUploadErrorMessage('')
    onClose()
  }

  const handleCreateAnotherContract = () => {
    handleReset()
    saved.close()
    published.close()
    navigate('/dashboard/contract', { state: { new: true } })
  }

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(handleNext)}>
        <Drawer
          open={open}
          handleClose={handleCancel}
          header={
            <>
              <Stack
                orientation="vertical"
                justifyContent="center"
                alignItems="center"
                style={{
                  minHeight: '10dvh'
                }}
              >
                <h4 style={{ wordBreak: 'break-all' }}>
                  {watch().name.length > 0 && !watch().name.includes(' ')
                    ? threeDots(watch().name, 25)
                    : applyToEveryWord('new contract', (w) =>
                        capitalizeFirstLetter(translate(w as Translation))
                      )}
                </h4>
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
                renderIcon={PreviousOutline}
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
                  renderIcon={CheckmarkOutline}
                  iconDescription={capitalizeFirstLetter(translate('continue'))}
                  kind="primary"
                  type="submit"
                >
                  {capitalizeFirstLetter(translate('continue'))}
                </Button>
              ) : (
                <>
                  <Button
                    style={{ width: '33%' }}
                    renderIcon={Save}
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
                    renderIcon={CheckmarkOutline}
                    iconDescription={capitalizeFirstLetter(translate('publish'))}
                    disabled={
                      getPublishErrors(
                        getDraftFromForm(currencies, countrySchools, {
                          ...getValues(),
                          ...contract
                        })
                      ).length > 0 || !termsAndConditions
                    }
                    kind="primary"
                    onClick={() => handlePublish(getValues())}
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
            getDraftFromForm(currencies, countrySchools, {
              ...getValues(),
              ...contract
            })
          ).length > 0
        }
      >
        <Stack alignItems="center" justifyContent="center" gap={spacing.lg}>
          <Time width={84} height={84} />
          <Typography as="h4">{translate('contract_draft_modal.title')}</Typography>
          <Typography as="h6">{translate('contract_draft_modal.content')}</Typography>
        </Stack>
      </Modal>
      <Modal
        open={published.value}
        onRequestClose={() => {
          published.close()
          handleReset()
        }}
        onRequestSubmit={() => {
          navigate(
            isAutomatic ? '/dashboard/automatic-contract/view' : '/dashboard/contract/view',
            {
              state: { contractId: getValues('id'), contractStatus: ContractStatus.Sent }
            }
          )
          handleReset()
        }}
        onSecondarySubmit={handleCreateAnotherContract}
        primaryButtonText={capitalizeFirstLetter(translate('view_contract'))}
        secondaryButtonText={capitalizeFirstLetter(translate('create_another_contract'))}
      >
        <Stack alignItems="center" justifyContent="center" gap={spacing.lg}>
          <TransactionalTrust width={84} height={84} />
          <Typography as="h4">{translate('contract_published_modal.title')}</Typography>
          <Typography as="h6">{translate('contract_published_modal.content')}</Typography>
        </Stack>
      </Modal>
    </>
  )
}
