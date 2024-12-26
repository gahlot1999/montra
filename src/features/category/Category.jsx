import { IoMdAddCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useGetCategories } from '../../api/useCategory';
import Button from '../../components/button/Button';
import Container from '../../components/container/Container';
import Message from '../../components/message/Message';
import PageTitle from '../../components/pageTitle/PageTitle';
import Spinner from '../../components/spinner/Spinner';
import CategoryCard from './CategoryCard';

function Category() {
  const { isLoading, categories } = useGetCategories();
  const navigate = useNavigate();

  return (
    <Container>
      <PageTitle title='Categories'>
        <Button
          variant='icon'
          onClick={() => {
            navigate('addCategory');
          }}
        >
          <IoMdAddCircle size={24} color='white' />
        </Button>
      </PageTitle>
      {isLoading ? (
        <Spinner />
      ) : !categories?.length ? (
        <Message
          title='No category found'
          message='Click below to get started'
          buttonText='Add Category'
          // buttonAction={() => navigate('/montra/addBudget', { replace: true })}
        />
      ) : (
        categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))
      )}
    </Container>
  );
}

export default Category;
