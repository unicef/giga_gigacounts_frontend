import { ContactPersonForm } from 'src/@types'

export const addNewContact = (
  contactForm: ContactPersonForm,
  ispId: string,
  contractId: string
): Promise<ContactPersonForm> => {
  console.log(contactForm, ispId, contractId)
  return new Promise(() => {})
}

export const deleteContact = (email: string, contractId: string): Promise<ContactPersonForm> => {
  console.log(email, contractId)
  return new Promise(() => {})
}
