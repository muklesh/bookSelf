import React, {useEffect, useRef, useState} from 'react';
import style from './AdminLogin.module.css';
import {urlAdmin} from '../../Appurl';

function AdminLogin() {
  const [adminLoginData, setAdminLoginData] = useState({
    adminId: '',
    adminKey: '',
  });
  const [error, setError] = useState('');
  const adminRef = useRef();

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setAdminLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    setError('');
    try {
      const response = await fetch(`${urlAdmin}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(adminLoginData),
      });
      const result = await response.json();
      if (result.status === 0) {
        localStorage.setItem('adminToken', result.authtoken);
        if (adminRef.current) {
          adminRef.current.style.display = 'none';
        }
      } else {
        setError('Invalid Admin ID or Key');
      }
    } catch (error) {
      console.error('Login failed', error);
      setError('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('adminToken')) {
      if (adminRef.current) {
        adminRef.current.style.display = 'none';
      }
    }
  }, []);

  return (
    <div ref={adminRef} className={style.adminLoginContainer}>
      <div className={style.adminLoginForm}>
        <h1>Admin Panel Login</h1>
        {error && <p className={style.error}>{error}</p>}
        <div className={style.formGroup}>
          <label htmlFor="adminId">Admin ID</label>
          <input
            type="text"
            id="adminId"
            name="adminId"
            value={adminLoginData.adminId}
            placeholder="Enter Admin ID"
            onChange={handleInputChange}
          />
          <span>please enter : 1234</span>
        </div>
        <div className={style.formGroup}>
          <label htmlFor="adminKey">Admin Key</label>
          <input
            type="password"
            id="adminKey"
            name="adminKey"
            value={adminLoginData.adminKey}
            placeholder="Enter Admin Key"
            onChange={handleInputChange}
          />
          <span>please enter : eyJhbGciOiJIUzI1NiIsInR5c</span>
        </div>
        <button className={style.loginButton} onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default AdminLogin;
