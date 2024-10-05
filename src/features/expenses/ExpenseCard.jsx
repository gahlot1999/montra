import { FaEdit } from 'react-icons/fa';
import { RiDeleteBinFill } from 'react-icons/ri';
import { formatCurrency } from '../../utils/helpers';
import styles from './styles/ExpenseCard.module.css';

function ExpenseCard({ expense }) {
  return (
    <div className={styles.expenseCard}>
      <div className={styles.cardContent}>
        <input type='checkbox' name='paid' className={styles.checkbox} />
        <div className={styles.details}>
          <p className={styles.name}>{expense.name}</p>
          <p className={styles.category}>{expense.category}</p>
        </div>
        <p className={styles.amount}>{formatCurrency(expense.amount)}</p>
        <div className={styles.actions}>
          <FaEdit size={24} className='editIcon' />
          <RiDeleteBinFill size={24} className='deleteIcon' />
        </div>
      </div>
    </div>
  );
}

export default ExpenseCard;
