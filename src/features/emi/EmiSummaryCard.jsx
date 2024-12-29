import { formatCurrency } from '../../utils/helpers';
import styles from './styles/EmiSummaryCard.module.css';

function EmiSummaryCard({ emi }) {
  return (
    <div className={styles.container}>
      <div className={styles.emiInfoContainer}>
        <div>
          <p className={styles.emiDuration}>{emi.duration}</p>
          <p className={styles.emiNameAmount}>
            {emi.name} - <span>{formatCurrency(emi.amount)}</span>
          </p>
        </div>
        <span
          className={`${styles.emiStatus} ${emi.isEmiActive && styles.active}`}
        ></span>
      </div>
      <div className={styles.emiAmountContainer}>
        <div className={styles.tagsContainer}>
          <p className={`${styles.primaryTag} ${styles.tag}`}>EMIs</p>
          <div className={styles.tags}>
            <p className={`${styles.secondaryTag} ${styles.tag}`}>
              Total - <span>{emi.numOfEmis}</span>
            </p>
            <p className={`${styles.secondaryTag} ${styles.tag}`}>
              Paid - <span>{emi.numOfEmisPaid}</span>
            </p>
            <p className={`${styles.secondaryTag} ${styles.tag}`}>
              Pending - <span>{emi.numOfEmisLeft}</span>
            </p>
          </div>
        </div>
        <div className={styles.tagsContainer}>
          <p className={`${styles.primaryTag} ${styles.tag}`}>Amount</p>
          <div className={styles.tags}>
            <p className={`${styles.secondaryTag} ${styles.tag}`}>
              Total - <span>{formatCurrency(emi.amountToBePaid)}</span>
            </p>
            <p className={`${styles.secondaryTag} ${styles.tag}`}>
              Paid - <span>{formatCurrency(emi.amountPaid)}</span>
            </p>
            <p className={`${styles.secondaryTag} ${styles.tag}`}>
              Pending - <span>{formatCurrency(emi.amountLeft)}</span>
            </p>
          </div>
        </div>
      </div>
      {emi.isEmiActive && (
        <span className={styles.progressBar}>
          <span
            className={styles.progress}
            style={{ width: `${emi.completed}%` }}
          ></span>
        </span>
      )}
    </div>
  );
}

export default EmiSummaryCard;
