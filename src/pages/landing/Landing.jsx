import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import BtnGroup from '../../components/button/BtnGroup';
import Button from '../../components/button/Button';
import styles from './Landing.module.css';

function Landing() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: '500px' });

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
        <BtnGroup position={isMobile ? 'center' : 'left'}>
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
