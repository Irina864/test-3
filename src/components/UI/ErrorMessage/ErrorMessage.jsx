import styles from './ErrorMessage.module.scss';

const ErrorMessage = ({ noimg, text }) => {
  return (
    <div className={`${styles.errorbox} ${styles.errorMessage}`}>
      {noimg ? null : (
        <img
          className={styles.errorimg}
          src="/images/form/state-error.svg"
          alt="error"
        />
      )}
      <div className={styles.errortext}>{text}</div>
    </div>
  );
};

export default ErrorMessage;
