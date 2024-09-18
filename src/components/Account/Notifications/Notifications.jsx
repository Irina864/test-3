'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Notifications.module.scss';

const Notifications = () => {
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();

  return <div>Notifications</div>;
};

export default Notifications;
