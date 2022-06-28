import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navigation from './Navigation/Navigation'
import Contracts from './Contracts'

import { DashboardContainer } from './styles'
import ContractGuide from './ContractGuide/ContractGuide'
import CreateContract from '../Dashboard/CreateContract/index'

const ADMIN_ROLE = 'Giga Admin'

const Dashboard: React.FC = () => {
  const [countryName, setCountryName] = useState('')
  const [role, setRole] = useState('')
  const [name, setName] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const [contractCounts, setContractCounts] = useState([])
  const [displayContractForm, setDisplayContractForm] = useState(false)

  const toggleCreateDraftForm = () => setDisplayContractForm((prevState) => !prevState)

  useEffect(() => {
    const getProfile = async () => {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('session')}` || '',
        },
      })
      if (res.data.role !== ADMIN_ROLE) {
        setCountryName(res.data.country.name)
        setCountryCode(res.data.country.code)
      }
      setName(res.data.name)
      setRole(res.data.role)
    }
    const getContractsCount = async () => {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/contract/count/status`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('session')}` || '',
        },
      })
      setContractCounts(res.data.counts)
    }
    getProfile()
    getContractsCount()
  }, [])

  return (
    <DashboardContainer>
      <Navigation
        admin={role === ADMIN_ROLE}
        countryName={countryName}
        role={role}
        countryPath={`./flags/${countryCode || ''}.svg`}
        name={name}
        contractCounts={contractCounts}
      />
      <Contracts />
      {displayContractForm ? <CreateContract /> : <ContractGuide createDraft={toggleCreateDraftForm} />}
    </DashboardContainer>
  )
}

export default Dashboard
