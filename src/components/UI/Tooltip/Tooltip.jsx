import styles from './Tooltip.module.scss';

const Tooltip = ({ text }) => {
  return (
    <div className={styles.tooltip}>
      <img
        className={styles.tooltip__img}
        src="/images/form/info_16_16.svg"
        alt="info"
      />
      <div className={styles.tooltiptext}>{text}</div>
    </div>
  );
};

export default Tooltip;
