import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigation } from './Navigation';

const Dashboard: React.FC = () => {
    const [countryName, setCountryName] = useState('')
    const [role, setRole] = useState('')
    const [name, setName] = useState('')
    useEffect(()=>{
        const getProfile = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/profile`, {headers: {
                'Authorization': `Bearer ${localStorage.getItem('session')}` || '',
            }})
            setCountryName(res.data.country);
            setName(res.data.name);
            setRole(res.data.role);
        }
        getProfile()
    }, [])
    return (
        <Navigation admin={false} countryName={countryName} role={role} name={name} />
    )
}
  
  export default Dashboard