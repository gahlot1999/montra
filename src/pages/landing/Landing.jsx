import styles from './Landing.module.css';
import landingPageIcon from '../../assets/landing-page.svg';
import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import BtnGroup from '../../components/button/BtnGroup';

function Landing() {
  return (
    <div className={styles.container}>
      <img
        className={styles.heroImg}
        src={landingPageIcon}
        alt='Landing Page Icon'
      />
      <div className={styles.content}>
        <h2>You ought to know where your money goes</h2>
        <p className={styles.subText}>
          Get an overview of how you are performing and motivate yourself to
          achieve even more.
        </p>
        <BtnGroup>
          <Button variant='auth'>Login</Button>
          <Button variant='auth'>Signup</Button>
        </BtnGroup>
      </div>
    </div>
  );
}

export default Landing;
