import styles from './LoginSignup.module.css';
import AuthFormHeader from '../../components/authFormHeader/AuthFormHeader';

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <AuthFormHeader
          title='Welcome back'
          description='Please enter your details to sign in'
        />
      </div>
    </div>
  );
}

export default Login;
