'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Security.module.scss';

const Security = () => {
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();

  return <div>Security</div>;
};

export default Security;

