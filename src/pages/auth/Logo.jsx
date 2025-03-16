import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo2.jpeg';
import styles from './LoginSignup.module.css';

function Logo() {
  const navigate = useNavigate();
  return (
    <div
      className={styles.logoContainer}
      onClick={() => navigate('/', { replace: true })}
    >
      <img src={logo} alt='logo' />
    </div>
  );
}

export default Logo;
