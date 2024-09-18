'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './About.module.scss';

const About = () => {
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();

  return <div>About</div>;
};

export default About;
