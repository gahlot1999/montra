import { useRef, useState } from 'react';
import { useGetBudgets } from '../../api/useBudget';
import BtnGroup from '../../components/button/BtnGroup';
import Button from '../../components/button/Button';
import Modal from '../../components/modal/Modal';
import Spinner from '../../components/spinner/Spinner';
import BudgetForm from '../forms/budget/BudgetForm';
import { BudgetCard } from './BudgetCard';
import styles from './Budgets.module.css';

export default function Budgets() {
  const { isLoading, budgets } = useGetBudgets();
  const formRef = useRef();
  const [isAddBudgetModalOpen, setIsAddBudgetModalOpen] = useState(false);

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.container}>
      <BtnGroup
        gap='2rem'
        style={{
          position: 'absolute',
          top: '0',
          right: '0',
        }}
      >
        <Button
          variant='secondary'
          onClick={() => setIsAddBudgetModalOpen(true)}
        >
          Add Budget
        </Button>
        <Button variant='secondary'>Configurations</Button>
      </BtnGroup>

      {budgets?.map((budget) => (
        <BudgetCard key={budget._id} budget={budget} />
      ))}

      <Modal
        open={isAddBudgetModalOpen}
        close={() => setIsAddBudgetModalOpen(false)}
        title='Add Budget'
        confirmLabel='Add'
        confirmAction={() => formRef.current.submitForm()}
      >
        <BudgetForm ref={formRef} />
      </Modal>
    </div>
  );
}
