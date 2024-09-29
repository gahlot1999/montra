import SignupForm from '../../features/forms/auth/SignupForm';
import styles from './LoginSignup.module.css';
import Logo from './Logo';

function Signup() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Logo />
        <SignupForm />
      </div>
    </div>
  );
}

export default Signup;
