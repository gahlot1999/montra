import { FaHandHoldingDollar } from 'react-icons/fa6';
import { GiTimeSynchronization } from 'react-icons/gi';
import AppCard from '../../components/card/AppCard';
import styles from './Home.module.css';

const cards = [
  {
    title: 'Montra',
    description:
      'All the tools to manage your finances, from budgeting to EMIs.',
    icon: FaHandHoldingDollar,
    navigateTo: '/montra',
  },
  {
    title: 'Coming Soon',
    description: 'Work in progress until the next event.',
    icon: GiTimeSynchronization,
  },
  {
    title: 'Coming Soon',
    description: 'Work in progress until the next event.',
    icon: GiTimeSynchronization,
  },
];

function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.cardsContainer}>
        {cards.map((card, index) => (
          <AppCard
            key={index}
            title={card.title}
            description={card.description}
            Icon={card.icon}
            navigateTo={card.navigateTo}
          />
        ))}
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className={styles.header}>
      <h2>
        Get The <span>Application</span> You <br /> Want For Growth
      </h2>
      <span>Simplify your finances and secure your future.</span>
    </div>
  );
}

export default Home;
