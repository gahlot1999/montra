import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAddEmi, useEditEmi } from '../../../api/useEmi';
import Box from '../../../components/box/Box';
import BtnGroup from '../../../components/button/BtnGroup';
import Button from '../../../components/button/Button';
import Container from '../../../components/container/Container';
import TextInput from '../../../components/input/TextInput';
import PageTitle from '../../../components/pageTitle/PageTitle';
import { url } from '../../../config/url';
import useFormMode from '../../../hooks/useFormMode';
import { emiSchema } from '../schema/schema';
import styles from './EmiForm.module.css';

function EmiForm() {
  const { id, isAddMode, isEditMode } = useFormMode('emiId');
  const { addEmi, isEmiAdding } = useAddEmi();
  const { editEmi, isEmiEditing } = useEditEmi();
  const navigate = useNavigate();
  const { state: emi } = useLocation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(emiSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    if (isEditMode) {
      reset({
        name: emi?.name,
        description: emi?.description,
        amount: emi?.amount,
        startMonth: format(new Date(emi?.startMonth), 'yyy-MM'),
        endMonth: format(new Date(emi?.endMonth), 'yyy-MM'),
      });
    }
  }, [emi, isEditMode, reset]);

  function addEditEmi(data) {
    function successCallback() {
      navigate(-1, { replace: true });
    }

    if (isAddMode) {
      const reqUrl = url.addEmi;
      addEmi(
        { url: reqUrl, data },
        {
          onSuccess: successCallback,
        },
      );
    } else if (isEditMode) {
      const reqUrl = `${url.editEmi}/${id}`;
      editEmi(
        { url: reqUrl, data },
        {
          onSuccess: successCallback,
        },
      );
    }
  }

  const isFormProcessing = isEmiAdding || isEmiEditing;

  return (
    <Container>
      <PageTitle title={isAddMode ? 'Add EMI' : 'Edit EMI'} />
      <Box>
        <form className={styles.form} onSubmit={handleSubmit(addEditEmi)}>
          <TextInput
            label='Name'
            disabled={isFormProcessing}
            error={errors?.name?.message}
            {...register('name')}
          />

          <TextInput
            label='Description'
            disabled={isFormProcessing}
            error={errors?.description?.message}
            {...register('description')}
          />

          <TextInput
            label='Amount'
            type='number'
            disabled={isFormProcessing}
            error={errors?.amount?.message}
            {...register('amount')}
          />

          <TextInput
            placeholder='Enter Budget Month'
            label='Start Month'
            type='month'
            disabled={isFormProcessing}
            error={errors.startMonth?.message}
            {...register('startMonth', {
              required: 'Budget Month is required',
              validate: (value) => {
                const [year] = value.split('-');
                if (year.length > 4) return 'Enter valid date';
              },
            })}
          />

          <TextInput
            placeholder='Enter Budget Month'
            label='End Month'
            type='month'
            disabled={isFormProcessing}
            error={errors.endMonth?.message}
            {...register('endMonth', {
              required: 'Budget Month is required',
              validate: (value) => {
                const [year] = value.split('-');
                if (year.length > 4) return 'Enter valid date';
              },
            })}
          />

          <BtnGroup>
            <Button
              variant='secondary'
              disabled={isFormProcessing}
              onClick={(e) => {
                e.preventDefault();
                navigate(-1, { replace: true });
              }}
            >
              Cancel
            </Button>
            <Button disabled={isFormProcessing || !isDirty}>
              {isFormProcessing ? 'Saving...' : 'Save'}
            </Button>
          </BtnGroup>
        </form>
      </Box>
    </Container>
  );
}

export default EmiForm;
