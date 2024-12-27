import { FaMoneyCheckAlt } from 'react-icons/fa';
import { GrConfigure } from 'react-icons/gr';
import { TbPigMoney, TbPremiumRights } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import Container from '../../components/container/Container';
import PageTitle from '../../components/pageTitle/PageTitle';
import styles from './Montra.module.css';

function Montra() {
  const navigate = useNavigate();
  return (
    <Container>
      <PageTitle title='Montra' navigateTo='/home' />
      <div className={styles.cardsContainer}>
        <Card
          title='Existing Budget'
          Icon={TbPigMoney}
          onClick={() => navigate('budgets')}
        />
        <Card
          title='Add Budget'
          Icon={FaMoneyCheckAlt}
          onClick={() => navigate('addBudget')}
        />
        <Card
          title='Categories'
          Icon={GrConfigure}
          onClick={() => navigate('category')}
        />
        <Card
          title='EMIs'
          Icon={TbPremiumRights}
          onClick={() => navigate('emi')}
        />
      </div>
    </Container>
  );
}

export default Montra;
