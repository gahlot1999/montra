import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  useAddBudget,
  useEditBudget,
  useGetBudget,
} from '../../../api/useBudget';
import BtnGroup from '../../../components/button/BtnGroup';
import Button from '../../../components/button/Button';
import TextInput from '../../../components/input/TextInput';
import Spinner from '../../../components/spinner/Spinner';
import { url } from '../../../config/url';
import styles from './BudgetForm.module.css';

function BudgetForm(props) {
  const { budgetId, isAddMode, isEditMode } = props;
  const navigate = useNavigate();
  const [addEmi, setAddEmi] = useState(isEditMode ? false : true);
  const { isBudgetAdding, addBudget } = useAddBudget();
  const { editBudget, isBudgetEditing } = useEditBudget(budgetId);
  const { isLoading, budget } = useGetBudget(budgetId);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();

  useEffect(() => {
    if (isEditMode && budget) {
      reset({
        name: budget?.name,
        amount: budget?.amount,
        description: budget?.description,
        month: format(new Date(budget?.month), 'yyyy-MM'),
      });
    }
  }, [isEditMode, budget, reset]);

  function onSubmit(data) {
    function successCallback() {
      navigate(
        isAddMode
          ? '/montra/budgets'
          : `/montra/budgets/budget?budgetId=${budgetId}`,
        { replace: true },
      );
    }

    if (isAddMode) {
      addBudget(
        {
          url: `${url.addBudget}?addEmi=${addEmi}`,
          data,
        },
        {
          onSuccess: successCallback,
        },
      );
    } else if (isEditMode) {
      editBudget(
        {
          url: `${url.editBudget}/${budgetId}?addEmi=${addEmi}`,
          data,
        },
        {
          onSuccess: successCallback,
        },
      );
    }
  }

  const formProcessing = isBudgetAdding || isBudgetEditing;
  if (isLoading) return <Spinner height='15rem' />;

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
        <div className={styles.addEMI}>
          <input
            type='checkbox'
            name='emi'
            id='emi'
            checked={addEmi}
            onChange={(e) => {
              if (isEditMode && e.target.checked) {
                toast.success(
                  'This will delete existing EMIs and add eligible EMIs again.',
                  {
                    icon: 'ℹ️',
                    duration: 5000,
                  },
                );
              }
              setAddEmi(e.target.checked);
            }}
          />
          <label htmlFor='emi'>Add EMI?</label>
        </div>

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

        <Button
          type='submit'
          disabled={formProcessing || (isEditMode && !addEmi && !isDirty)}
        >
          {formProcessing ? 'Saving...' : 'Save'}
        </Button>
      </BtnGroup>
    </form>
  );
}

export default BudgetForm;
