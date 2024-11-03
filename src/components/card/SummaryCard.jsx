import { FcSimCardChip } from 'react-icons/fc';
import { formatCurrency, generateRandomNumber } from '../../utils/helpers';
import styles from './SummaryCard.module.css';

function SummaryCard(props) {
  const { total, balance, expense } = props;
  return (
    <div className={styles.container}>
      <p className={styles.total}>
        Total <span>{formatCurrency(total)}</span>
      </p>
      <div className={styles.icon}>
        <FcSimCardChip size={44} />
      </div>
      <p className={styles.number}>**** **** **** {generateRandomNumber(4)}</p>
      <p className={styles.balance}>
        Balance<span>{formatCurrency(balance)}</span>
      </p>
      <p className={styles.expense}>
        Expense<span>{formatCurrency(expense)}</span>
      </p>
    </div>
  );
}

export default SummaryCard;
