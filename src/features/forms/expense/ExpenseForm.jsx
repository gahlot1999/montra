import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import SelectInput from '../../../components/input/SelectInput';
import TextInput from '../../../components/input/TextInput';
import { url } from '../../../config/url';
import styles from './ExpenseForm.module.css';

const ExpenseForm = forwardRef(function ExpenseForm(props, ref) {
  const { addExpense, closeForm } = props;
  const [searchParam] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onAddExpense(data) {
    addExpense(
      {
        url: `${url.addExpense}/${searchParam.get('budgetId')}/expense`,
        data,
      },
      {
        onSuccess: closeForm,
      },
    );
  }

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit(onAddExpense),
  }));

  return (
    <form className={styles.form}>
      <TextInput
        theme='dark'
        label='Name'
        placeholder='Enter Expense Name'
        error={errors?.name?.message}
        {...register('name', {
          required: 'Expense Name is required',
        })}
      />

      <TextInput
        theme='dark'
        label='Amount'
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
        options={[
          { value: 'EMI', label: 'EMI' },
          { value: 'CC Bill', label: 'CC Bill' },
        ]}
        {...register('category', {
          required: 'Expense Category is required',
        })}
      />
    </form>
  );
});

export default ExpenseForm;
