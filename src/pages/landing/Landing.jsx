import styles from './Landing.module.css';
import Button from '../../components/button/Button';
import BtnGroup from '../../components/button/BtnGroup';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>
          You ought to know where your <span>money</span> goes
        </h2>
        <p className={styles.subText}>
          Get an overview of how you are performing and motivate yourself to
          achieve even more.
        </p>
        <BtnGroup>
          <Button variant='auth' onClick={() => navigate('login')}>
            Login
          </Button>
          <Button variant='auth' onClick={() => navigate('signup')}>
            Signup
          </Button>
        </BtnGroup>
      </div>
    </div>
  );
}

export default Landing;
