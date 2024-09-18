'use client';
import styles from './Filter.module.scss';
import { useState } from 'react';

const Filter = () => {
  const [formActive, setFormActive] = useState(`${styles.filter}`);
  const handleTarget = (e) => {
    setFormActive(`${styles.filter} ${styles.active}`);
  };

  return (
    <div className={formActive}>
      <form className={styles.filter__box}>
        <div className={styles.filter__item}>
          <input
            onChange={handleTarget}
            type="text"
            className={styles.filter__input}
          />
        </div>

        <div className={styles.filter__item}>
          <input
            onChange={handleTarget}
            type="text"
            className={styles.filter__input}
          />
        </div>

        <div className={styles.filter__item}>
          <input
            onChange={handleTarget}
            type="text"
            className={styles.filter__input}
          />
        </div>
      </form>
      <button className={styles.filter__search}>
        <img
          className={styles.filter__img}
          src="/images/header/search.svg"
          alt="Search"
        />
      </button>
    </div>
  );
};

export default Filter;
