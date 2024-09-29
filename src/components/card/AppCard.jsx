import { Link, useNavigate } from 'react-router-dom';
import styles from './AppCard.module.css';

function AppCard(props) {
  const {
    title = 'Enter title prop',
    description = 'Enter description prop',
    Icon,
    navigateTo,
  } = props;
  const navigate = useNavigate();

  return (
    <div className={styles.card} onClick={() => navigate(navigateTo)}>
      <div className={styles.icon}>
        <Icon />
      </div>
      <div className={styles.content}>
        <h5>{title}</h5>
        <p>{description}</p>
        <Link to={navigateTo}>Learn More</Link>
      </div>
    </div>
  );
}

export default AppCard;
