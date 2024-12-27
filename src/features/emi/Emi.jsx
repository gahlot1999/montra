import { useNavigate } from 'react-router-dom';
import { useGetEmis } from '../../api/useEmi';
import Button from '../../components/button/Button';
import Container from '../../components/container/Container';
import Message from '../../components/message/Message';
import PageTitle from '../../components/pageTitle/PageTitle';
import Spinner from '../../components/spinner/Spinner';
import EmiCard from './EmiCard';

function Emi() {
  const { isLoading, emis } = useGetEmis();
  const navigate = useNavigate();

  return (
    <Container>
      <PageTitle title='EMIs'>
        <Button variant='secondary' onClick={() => navigate('addEmi')}>
          Add EMI
        </Button>
      </PageTitle>

      {isLoading ? (
        <Spinner />
      ) : !emis?.length ? (
        <Message
          title='No EMI found'
          message='Click below to get started'
          buttonText='Add EMI'
          buttonAction={() => navigate('/montra/addEmi', { replace: true })}
        />
      ) : (
        emis.map((emi) => <EmiCard key={emi._id} emi={emi} />)
      )}
    </Container>
  );
}

export default Emi;
