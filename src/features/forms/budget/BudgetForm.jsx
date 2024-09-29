import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '../../../components/input/TextInput';
import styles from './BudgetForm.module.css';

const BudgetForm = forwardRef(function BudgetForm(props, ref) {
  const { register, handleSubmit } = useForm();

  function addBudget(data) {
    // Add budget logic here
    console.log(data);
  }

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit(addBudget),
  }));

  return (
    <form className={styles.form}>
      <TextInput
        theme='dark'
        name='budgetName'
        placeholder='Enter Budget Name'
        label='Name'
        {...register('name', {
          required: {
            value: true,
            message: 'Budget Name is required',
          },
        })}
      />
      <TextInput
        theme='dark'
        name='budgetMonth'
        placeholder='Enter Budget Month'
        label='Month'
        type='month'
        {...register('month', {
          required: {
            value: true,
            message: 'Budget Month is required',
          },
        })}
      />
      <TextInput
        theme='dark'
        name='budgetAmount'
        placeholder='Enter Budget Amount'
        label='Amount'
        type='number'
        {...register('amount', {
          required: {
            value: true,
            message: 'Budget Amount is required',
          },
          min: {
            value: 1,
            message: 'Budget Amount must be at least $1',
          },
        })}
      />
      <TextInput
        theme='dark'
        name='budgetDescription'
        placeholder='Enter Budget Description'
        label='Description'
        {...register('description', {
          required: {
            value: true,
            message: 'Budget Description is required',
          },
        })}
      />
    </form>
  );
});

export default BudgetForm;
