import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetCategories } from '../../../api/useCategory';
import {
  useAddExpense,
  useEditExpense,
  useGetExpense,
} from '../../../api/useExpense';
import BtnGroup from '../../../components/button/BtnGroup';
import Button from '../../../components/button/Button';
import SelectInput from '../../../components/input/SelectInput';
import TextInput from '../../../components/input/TextInput';
import Spinner from '../../../components/spinner/Spinner';
import { url } from '../../../config/url';
import styles from './ExpenseForm.module.css';

function ExpenseForm(props) {
  const { budgetId, isAddMode, isEditMode } = props;
  const [param] = useSearchParams();
  const expId = param.get('expId');
  const navigate = useNavigate();
  const { isLoading: isCategoriesLoading, categories } = useGetCategories();
  const { status, addExpense } = useAddExpense(budgetId);
  const { status: isExpenseEditing, editExpense } = useEditExpense(budgetId);
  const { isLoading, isRefetching, expense } = useGetExpense(
    expId,
    budgetId,
    isEditMode,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();

  useEffect(() => {
    if (isEditMode) {
      const data = {
        name: expense?.name,
        amount: expense?.amount,
        category: expense?.category,
      };

      reset(data);
    }
  }, [expense, isEditMode, reset]);

  function onSubmit(data) {
    function successCallback() {
      navigate(-1, { replace: true });
    }

    if (isAddMode) {
      addExpense(
        {
          url: `${url.addExpense}/${budgetId}/expense`,
          data,
        },
        {
          onSuccess: successCallback,
        },
      );
    } else if (isEditMode) {
      editExpense(
        {
          url: `${url.editExpense}/${budgetId}/expense/${expId}`,
          data,
        },
        {
          onSuccess: successCallback,
        },
      );
    }
  }

  const formProcessing = status === 'pending' || isExpenseEditing === 'pending';

  if (isLoading || isRefetching || isCategoriesLoading) return <Spinner />;

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        theme='dark'
        label='Name'
        disabled={formProcessing}
        placeholder='Enter Expense Name'
        error={errors?.name?.message}
        {...register('name', {
          required: 'Expense Name is required',
        })}
      />

      <TextInput
        theme='dark'
        label='Amount'
        disabled={formProcessing}
        placeholder='Enter Expense Amount'
        error={errors?.amount?.message}
        {...register('amount', {
          required: 'Expense Amount is required',
          min: {
            value: 1,
            message: 'Budget Amount must be at least $1',
          },
        })}
      />

      <SelectInput
        name='Category'
        label='Category'
        disabled={formProcessing}
        placeholder='Select Expense Category'
        error={errors?.category?.message}
        valueKey='name'
        labelKey='name'
        options={[...categories, { name: 'Other' }]}
        {...register('category', {
          required: 'Expense Category is required',
        })}
      />

      <BtnGroup position='right'>
        <Button
          variant='secondary'
          disabled={formProcessing}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1, { replace: true });
          }}
        >
          Cancel
        </Button>
        <Button type='submit' disabled={formProcessing || !isDirty}>
          {formProcessing ? 'Saving...' : 'Save'}
        </Button>
      </BtnGroup>
    </form>
  );
}

export default ExpenseForm;
