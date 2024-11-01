import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { IoMdAddCircle } from 'react-icons/io';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDeleteBudget, useGetBudget } from '../../api/useBudget';
import BtnGroup from '../../components/button/BtnGroup';
import Button from '../../components/button/Button';
import Message from '../../components/message/Message';
import Modal from '../../components/modal/Modal';
import PageTitle from '../../components/pageTitle/PageTitle';
import Spinner from '../../components/spinner/Spinner';
import ExpenseCard from '../expenses/ExpenseCard';
import styles from './styles/Budget.module.css';

function Budget() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const budgetId = searchParams.get('budgetId');
  const { isLoading, budget } = useGetBudget(budgetId);
  const { deleteBudget, status: deleteStatus } = useDeleteBudget(
    budgetId,
    navigate,
  );
  const [deleteModal, setDeleteModal] = useState(false);

  const isBudgetDeleting = deleteStatus === 'pending';

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className={styles.container}>
        <PageTitle
          title={budget?.name}
          actions={
            <>
              <FaInfoCircle />
              <FiEdit
                size={18}
                className='editIcon'
                // onClick={() => {
                //   navigate(
                //     `editExpense?budgetId=${budgetId}&expId=${expense._id}`,
                //   );
                // }}
              />
            </>
          }
        >
          <BtnGroup>
            <Button
              variant='icon'
              onClick={() => {
                navigate(`addExpense?budgetId=${budgetId}`);
              }}
            >
              <IoMdAddCircle size={24} color='white' />
            </Button>
          </BtnGroup>
        </PageTitle>

        {!budget?.expense?.length ? (
          <Message
            title='No expenses found'
            message='Click below to get started'
            buttonText='Add Expense'
            buttonAction={() => navigate(`addExpense?budgetId=${budgetId}`)}
          />
        ) : (
          budget.expense.map((expense) => (
            <ExpenseCard key={expense._id} expense={expense} />
          ))
        )}
      </div>

      <Modal
        open={deleteModal}
        close={() => {
          setDeleteModal(false);
        }}
        title='Delete Budget'
        confirmLabel={isBudgetDeleting ? 'Deleting...' : 'Delete'}
        confirmAction={deleteBudget}
        confirmDisabled={isBudgetDeleting}
      >
        Are you sure you want to delete this budget?
      </Modal>
    </>
  );
}

export default Budget;
