import logo from '../../assets/images/logo.jpeg';
import styles from './LoginSignup.module.css';

function Logo() {
  return (
    <div className={styles.logoContainer}>
      <img src={logo} alt='logo' />
    </div>
  );
}

export default Logo;
