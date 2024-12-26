import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAddCategory } from '../../../api/useCategory';
import Box from '../../../components/box/Box';
import BtnGroup from '../../../components/button/BtnGroup';
import Button from '../../../components/button/Button';
import Container from '../../../components/container/Container';
import TextInput from '../../../components/input/TextInput';
import PageTitle from '../../../components/pageTitle/PageTitle';
import { url } from '../../../config/url';
import { categorySchema } from '../schema/schema';
import styles from './CategoryForm.module.css';

function CategoryForm() {
  const navigate = useNavigate();
  const { addCategory, isCategoryAdding } = useAddCategory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categorySchema),
  });

  function onSubmit(data) {
    addCategory(
      {
        url: url.addCategory,
        data,
      },
      {
        onSuccess: () => navigate(-1, { replace: true }),
      },
    );
  }

  return (
    <Container>
      <PageTitle title='Add Category' />
      <Box>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label='Category Name'
            error={errors?.name?.message}
            {...register('name')}
          />

          <BtnGroup position='right'>
            <Button
              variant='secondary'
              disabled={isCategoryAdding}
              onClick={(e) => {
                e.preventDefault();
                navigate(-1, { replace: true });
              }}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={isCategoryAdding}>
              {isCategoryAdding ? 'Saving...' : 'Save'}
            </Button>
          </BtnGroup>
        </form>
      </Box>
    </Container>
  );
}

export default CategoryForm;
