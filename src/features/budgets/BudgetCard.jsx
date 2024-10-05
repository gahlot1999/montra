import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';
import styles from './styles/BudgetCard.module.css';

export function BudgetCard({ budget }) {
  const navigate = useNavigate();
  return (
    <div
      className={styles.card}
      onClick={() => navigate(`budget?budgetId=${budget._id}`)}
    >
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
