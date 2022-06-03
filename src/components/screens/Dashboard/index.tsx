import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigation } from './Navigation';

const ADMIN_ROLE = 'Giga Admin';
const Dashboard: React.FC = () => {
  const [countryName, setCountryName] = useState('');
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [contractCounts, setContractCounts] = useState([]);

  useEffect(() => {
    const getProfile = async () => {
      const res = await axios.get(`http://127.0.0.1:3333/user/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('session')}` || '',
        },
      });
      if (role === ADMIN_ROLE) {
        setCountryName(res.data.country.name);
        setCountryCode(res.data.country.code);
      }
      setName(res.data.name);
      setRole(res.data.role);
    };
    const getContractsCount = async () => {
      const res = await axios.get(
        `http://127.0.0.1:3333/contract/count/status`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('session')}` || '',
          },
        }
      );
      setContractCounts(res.data.counts);
    };
    getProfile();
    getContractsCount();
  }, []);

  return (
    <Navigation
      admin={role === ADMIN_ROLE}
      countryName={countryName}
      role={role}
      countryPath={`./flags/${countryCode || 'AC'}.svg`}
      name={name}
      contractCounts={contractCounts}
    />
  );
};

export default Dashboard;
