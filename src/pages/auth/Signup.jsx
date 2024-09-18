import styles from './LoginSignup.module.css';
import AuthFormHeader from '../../components/authFormHeader/AuthFormHeader';

function Signup() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <AuthFormHeader
          title='Create new account'
          description='Sign up with your email address to access your Montra account'
        />
      </div>
    </div>
  );
}

export default Signup;
