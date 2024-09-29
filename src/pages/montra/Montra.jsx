import PageTitle from '../../components/pageTitle/PageTitle';
import Budgets from '../../features/budgets/Budgets';
import styles from './Montra.module.css';

function Montra() {
  return (
    <div className={styles.container}>
      <PageTitle title='Budgets' />
      <Budgets />
    </div>
  );
}

export default Montra;
