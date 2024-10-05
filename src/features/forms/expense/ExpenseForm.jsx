import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import SelectInput from '../../../components/input/SelectInput';
import TextInput from '../../../components/input/TextInput';
import styles from './ExpenseForm.module.css';

const ExpenseForm = forwardRef(function ExpenseForm(props, ref) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onAddExpense(data) {
    console.log(data);
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
      />
    </form>
  );
});

export default ExpenseForm;
