import { useNavigate } from 'react-router-dom';
import { useGetBudgets } from '../../api/useBudget';
import Button from '../../components/button/Button';
import Message from '../../components/message/Message';
import PageTitle from '../../components/pageTitle/PageTitle';
import Spinner from '../../components/spinner/Spinner';
import { BudgetCard } from './BudgetCard';
import styles from './styles/Budgets.module.css';

export default function Budgets() {
  const navigate = useNavigate();
  const { isLoading, budgets } = useGetBudgets();

  return (
    <div className={styles.container}>
      <PageTitle title='Budgets'
        navigateTo='/montra'
      >
        <Button
          variant='secondary'
          onClick={() => navigate('/montra/addBudget')}
        >
          Add Budget
        </Button>
      </PageTitle>

      {isLoading ? (
        <Spinner />
      ) : !budgets?.length ? (
        <Message
          title='No budget found'
          message='Click below to get started'
          buttonText='Add Budget'
          buttonAction={() => navigate('/montra/addBudget', { replace: true })}
        />
      ) : (
        budgets.map((budget) => <BudgetCard key={budget._id} budget={budget} />)
      )}
    </div>
  );
}
