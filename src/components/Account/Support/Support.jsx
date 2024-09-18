'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Support.module.scss';

const Support = () => {
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();

  return <div>Support</div>;
};

export default Support;
