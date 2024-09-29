import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '../../../components/input/TextInput';
import { url } from '../../../config/url';
import styles from './BudgetForm.module.css';

const BudgetForm = forwardRef(function BudgetForm(props, ref) {
  const { addBudget, closeForm } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onAddBudget(data) {
    console.log(data);
    // addBudget(
    //   {
    //     url: url.addBudget,
    //     data,
    //   },
    //   {
    //     onSuccess: closeForm,
    //   },
    // );
  }

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit(onAddBudget),
  }));

  return (
    <form className={styles.form}>
      <TextInput
        theme='dark'
        name='budgetName'
        placeholder='Enter Budget Name'
        label='Name'
        error={errors.name?.message}
        {...register('name', {
          required: 'Budget Name is required',
        })}
      />
      <TextInput
        theme='dark'
        name='budgetMonth'
        placeholder='Enter Budget Month'
        label='Month'
        type='month'
        error={errors.month?.message}
        {...register('month', {
          required: 'Budget Month is required',
          validate: (value) => {
            const [year] = value.split('-');
            if (year.length > 4) return 'Enter valid date';
          },
        })}
      />
      <TextInput
        theme='dark'
        name='budgetAmount'
        placeholder='Enter Budget Amount'
        label='Amount'
        type='number'
        error={errors?.amount?.message}
        {...register('amount', {
          required: 'Budget Amount is required',
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
        error={errors?.description?.message}
        {...register('description', {
          required: 'Budget Description is required',
        })}
      />
    </form>
  );
});

export default BudgetForm;
