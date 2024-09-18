'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Account.module.scss';
import About from './About/About';
import Notifications from './Notifications/Notifications';
import Security from './Security/Security';
import Support from './Support/Support';

const ApplicantAccount = () => {
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();

  return (
    <form className={styles.form}>
      {page === 0 && <About />}
      {page === 1 && <Notifications />}
      {page === 2 && <Security />}
      {page === 3 && <Support />}
    </form>
  );
};

export default ApplicantAccount;
