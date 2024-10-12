import { useRef, useState } from 'react';
import { useAddBudget, useGetBudgets } from '../../api/useBudget';
import BtnGroup from '../../components/button/BtnGroup';
import Button from '../../components/button/Button';
import Message from '../../components/message/Message';
import Modal from '../../components/modal/Modal';
import PageTitle from '../../components/pageTitle/PageTitle';
import Spinner from '../../components/spinner/Spinner';
import BudgetForm from '../forms/budget/BudgetForm';
import { BudgetCard } from './BudgetCard';
import styles from './styles/Budgets.module.css';

export default function Budgets() {
  const formRef = useRef();
  const [isAddBudgetModalOpen, setIsAddBudgetModalOpen] = useState(false);

  const { isLoading, budgets } = useGetBudgets();
  const { status, addBudget } = useAddBudget();

  const isFormSubmitting = status === 'pending';

  return (
    <div className={styles.container}>
      <PageTitle title='Montra'>
        <BtnGroup gap='2rem'>
          <Button
            variant='secondary'
            onClick={() => setIsAddBudgetModalOpen(true)}
          >
            Add Budget
          </Button>
          <Button variant='secondary'>Configurations</Button>
        </BtnGroup>
      </PageTitle>

      {isLoading ? (
        <Spinner />
      ) : !budgets?.length ? (
        <Message
          title='No budget found'
          message='Click below to get started'
          buttonText='Add Budget'
          buttonAction={() => setIsAddBudgetModalOpen(true)}
        />
      ) : (
        budgets.map((budget) => (
          <BudgetCard key={budget._id} budget={budget} />
        ))
      )}

      <Modal
        open={isAddBudgetModalOpen}
        close={() => setIsAddBudgetModalOpen(false)}
        title='Add Budget'
        confirmLabel={isFormSubmitting ? 'Adding...' : 'Add'}
        confirmAction={() => formRef.current.submitForm()}
        confirmDisabled={isFormSubmitting}
      >
        <BudgetForm
          ref={formRef}
          addBudget={addBudget}
          closeForm={() => setIsAddBudgetModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
