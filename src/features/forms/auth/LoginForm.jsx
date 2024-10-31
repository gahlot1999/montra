import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useLogin } from '../../../api/useAuth';
import Button from '../../../components/button/Button';
import TextInput from '../../../components/input/TextInput';
import { url } from '../../../config/url';
import styles from './LoginSignupForm.module.css';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, status } = useLogin();
  const isSubmitting = status === 'pending';

  function handleLogin(data) {
    login({ url: url.login, data });
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3>Welcome back</h3>
        <p>Please enter your details to sign in</p>
        <form
          className={styles.form}
          onSubmit={handleSubmit(handleLogin)}
          autoComplete='off'
        >
          <TextInput
            theme='light'
            label='Username or Email'
            disabled={isSubmitting}
            error={errors?.username?.message}
            {...register('username', {
              required: {
                value: true,
                message: 'Username or Email is required',
              },
            })}
          />

          <TextInput
            theme='light'
            label='Password'
            type='password'
            disabled={isSubmitting}
            error={errors?.password?.message}
            {...register('password', {
              required: {
                value: true,
                message: 'Password is required',
              },
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
          />

          <Button
            style={{
              marginBlock: '.8rem -.6rem',
            }}
            disabled={isSubmitting}
            type='submit'
          >
            {isSubmitting ? 'Loading...' : 'Login'}
          </Button>
          <p>
            Forgot your password? <Link>Reset it here</Link>
            <br />
            <br />
            Dont have an account? <Link to='/signup'>Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
