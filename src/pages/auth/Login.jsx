import LoginForm from '../../features/forms/auth/LoginForm';
import styles from './LoginSignup.module.css';
import Logo from './Logo';

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Logo />
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
