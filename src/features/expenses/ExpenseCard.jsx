import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBinFill } from 'react-icons/ri';
import { useSearchParams } from 'react-router-dom';
import { useDeleteExpense } from '../../api/useExpense';
import Modal from '../../components/modal/Modal';
import { url } from '../../config/url';
import { formatCurrency } from '../../utils/helpers';
import styles from './styles/ExpenseCard.module.css';

function ExpenseCard({ expense }) {
  const [searchParam] = useSearchParams();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState('');
  const { status, deleteExpense } = useDeleteExpense();

  const isExpenseDeleting = status === 'pending';

  function onDeleteExpense() {
    if (!selectedExpenseId || selectedExpenseId === '') return;
    deleteExpense(
      {
        url: `${url.deleteExpense}/${searchParam.get(
          'budgetId',
        )}/expense/${selectedExpenseId}`,
      },
      {
        onSuccess: () => {
          setDeleteModal(false);
          setSelectedExpenseId('');
        },
      },
    );
  }

  return (
    <>
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
            <RiDeleteBinFill
              size={24}
              className='deleteIcon'
              onClick={() => {
                setSelectedExpenseId(expense._id);
                setDeleteModal(true);
              }}
            />
          </div>
        </div>
      </div>

      <Modal
        open={deleteModal}
        close={() => {
          setSelectedExpenseId('');
          setDeleteModal(false);
        }}
        title='Delete Expense'
        confirmLabel={isExpenseDeleting ? 'Deleting...' : 'Delete'}
        confirmAction={onDeleteExpense}
        confirmDisabled={isExpenseDeleting}
      >
        Are you sure you want to delete this expense?
      </Modal>
    </>
  );
}

export default ExpenseCard;
