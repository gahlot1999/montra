import { format } from 'date-fns';
import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDeleteExpense, useEditExpense } from '../../api/useExpense';
import Modal from '../../components/modal/Modal';
import { url } from '../../config/url';
import { formatCurrency } from '../../utils/helpers';
import styles from './styles/ExpenseCard.module.css';

function ExpenseCard({ expense }) {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const budgetId = searchParam.get('budgetId');
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState('');
  const { status, deleteExpense } = useDeleteExpense(budgetId);
  const { status: editExpenseStatus, editExpense } = useEditExpense(budgetId);

  const isExpenseDeleting = status === 'pending';
  const isExpenseEditing = editExpenseStatus === 'pending';

  function onDeleteExpense() {
    if (!selectedExpenseId || selectedExpenseId === '') return;
    deleteExpense(
      {
        url: `${url.deleteExpense}/${budgetId}/expense/${selectedExpenseId}`,
      },
      {
        onSuccess: () => {
          setDeleteModal(false);
          setSelectedExpenseId('');
        },
      },
    );
  }

  function handleExpensePaid() {
    editExpense({
      url: `${url.editExpense}/${budgetId}/expense/${expense._id}`,
      data: {
        ...expense,
        paid: !expense.paid,
      },
    });
  }

  return (
    <>
      <div>
        <div
          className={`${styles.expenseCard} ${expense.isEmi && styles.emi} ${
            expense.paid && styles.paid
          }`}
        >
          <input
            type='checkbox'
            name='paid'
            className={styles.checkbox}
            checked={expense.paid}
            onChange={handleExpensePaid}
            disabled={isExpenseEditing}
          />
          <div className={styles.details}>
            <p className={styles.name}>{expense.name}</p>
            <p className={styles.category}>{expense.category}</p>
          </div>
          <p className={styles.amount}>{formatCurrency(expense.amount)}</p>
          <div className={styles.actions}>
            {!expense.isEmi && (
              <FiEdit
                size={18}
                className='editIcon'
                onClick={() => {
                  navigate(
                    `editExpense?budgetId=${budgetId}&expId=${expense._id}`,
                  );
                }}
              />
            )}
            <MdDeleteOutline
              size={21}
              className='deleteIcon'
              onClick={() => {
                setSelectedExpenseId(expense._id);
                setDeleteModal(true);
              }}
            />
          </div>
        </div>

        {expense?.isEmi && (
          <div className={styles.emiMetaData}>
            <p>
              Start:{' '}
              <span>
                {format(new Date(expense.emiMetaData.startMonth), 'MMM - yy')}
              </span>
            </p>

            <p>
              End:{' '}
              <span>
                {format(new Date(expense.emiMetaData.endMonth), 'MMM - yy')}
              </span>
            </p>
          </div>
        )}
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
