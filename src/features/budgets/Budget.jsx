import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetBudget } from '../../api/useBudget';
import BtnGroup from '../../components/button/BtnGroup';
import Button from '../../components/button/Button';
import Message from '../../components/message/Message';
import Modal from '../../components/modal/Modal';
import PageTitle from '../../components/pageTitle/PageTitle';
import Spinner from '../../components/spinner/Spinner';
import ExpenseCard from '../expenses/ExpenseCard';
import ExpenseForm from '../forms/expense/ExpenseForm';
import styles from './styles/Budget.module.css';

function Budget() {
  const [sParams] = useSearchParams();
  const budgetId = sParams.get('budgetId');

  const [expenseModal, setExpenseModal] = useState(false);

  const { isLoading, budget } = useGetBudget(budgetId);

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className={styles.container}>
        <PageTitle title={budget?.name}>
          <BtnGroup>
            <Button variant='secondary'>Delete Budget</Button>
            <Button variant='secondary'>Edit Budget</Button>
            <Button variant='secondary' onClick={() => setExpenseModal(true)}>
              Add Expense
            </Button>
          </BtnGroup>
        </PageTitle>

        {!budget?.expense?.length ? (
          <Message
            title='No expenses found'
            message='Click below to get started'
            buttonText='Add Expense'
          />
        ) : (
          budget.expense.map((expense) => (
            <ExpenseCard key={expense._id} expense={expense} />
          ))
        )}
      </div>

      <Modal
        open={true}
        close={() => setExpenseModal(false)}
        title='Add Expense'
      >
        <ExpenseForm />
      </Modal>
    </>
  );
}

export default Budget;
