import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAddBudget } from '../../../api/useBudget';
import BtnGroup from '../../../components/button/BtnGroup';
import Button from '../../../components/button/Button';
import TextInput from '../../../components/input/TextInput';
import { url } from '../../../config/url';
import styles from './BudgetForm.module.css';

function BudgetForm() {
  const navigate = useNavigate();
  const { status, addBudget } = useAddBudget();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    function successCallback() {
      navigate('/montra/budgets', { replace: true });
    }
    addBudget(
      {
        url: url.addBudget,
        data,
      },
      {
        onSuccess: successCallback,
      },
    );
  }

  const formProcessing = status === 'pending';

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        placeholder='Enter Budget Name'
        label='Name'
        disabled={formProcessing}
        error={errors.name?.message}
        {...register('name', {
          required: 'Budget Name is required',
        })}
      />
      <TextInput
        placeholder='Enter Budget Month'
        label='Month'
        type='month'
        disabled={formProcessing}
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
        placeholder='Enter Budget Amount'
        label='Amount'
        type='number'
        inputMode='number'
        disabled={formProcessing}
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
        placeholder='Enter Budget Description'
        label='Description'
        disabled={formProcessing}
        error={errors?.description?.message}
        {...register('description', {
          required: 'Budget Description is required',
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
        <Button type='submit' disabled={formProcessing}>
          {formProcessing ? 'Saving...' : 'Save'}
        </Button>
      </BtnGroup>
    </form>
  );
}

export default BudgetForm;
