import React from 'react';
import { Link } from 'react-router-dom';
import './AccountButton.css';

const AccountButton = ({ togleChecked }) => {
  return (
    <Link
      onClick={togleChecked}
      to='/profile'
      className='profile-btn
      profile-btn_account
      links-hover'>
      <div className='profile-btn__icon-account'></div>
      Аккаунт
    </Link>
  );
}

export default AccountButton;