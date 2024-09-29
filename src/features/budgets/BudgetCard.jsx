import { format } from 'date-fns';
import { formatCurrency } from '../../utils/helpers';
import styles from './Budgets.module.css';

export function BudgetCard({ budget }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.budgetInfo}>
          <p>{budget.name}</p>
          <p>{budget.description}</p>
        </div>
        <div className={styles.budgetStats}>
          <p>{formatCurrency(budget.totalSavings)}</p>
          <p>{formatCurrency(budget.totalExpenses)}</p>
        </div>
      </div>
      <div className={styles.outsideCardContent}>
        <p>
          Month: <span>{format(new Date(budget.month), 'MMM - yy')}</span>
        </p>
        <p>
          Budget: <span>{formatCurrency(budget.amount)}</span>
        </p>
      </div>
    </div>
  );
}
