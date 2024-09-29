import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useSignup } from '../../../api/useAuth';
import Button from '../../../components/button/Button';
import TextInput from '../../../components/input/TextInput';
import { url } from '../../../config/url';
import styles from './LoginSignupForm.module.css';

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, status } = useSignup();
  const isSubmitting = status === 'pending';

  function handleSignup(data) {
    signup({
      url: url.signup,
      data,
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3>Create new account</h3>
        <p>Sign up with your email address to access</p>
        <form
          className={styles.form}
          onSubmit={handleSubmit(handleSignup)}
          autoComplete='off'
        >
          <TextInput
            name='name'
            label='Name'
            disabled={isSubmitting}
            error={errors?.name?.message}
            {...register('name', {
              required: {
                value: true,
                message: 'Name is required',
              },
            })}
          />
          <TextInput
            name='username'
            label='Username'
            disabled={isSubmitting}
            error={errors?.username?.message}
            {...register('username', {
              required: {
                value: true,
                message: 'Username is required',
              },
            })}
          />
          <TextInput
            name='email'
            label='Email'
            disabled={isSubmitting}
            error={errors?.email?.message}
            {...register('email', {
              required: {
                value: true,
                message: 'Email is required',
              },
              validate: {
                isValidEmail: (value) =>
                  validator.isEmail(value) || 'Enter valid email address',
              },
            })}
          />
          <TextInput
            name='password'
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
            variant='primary'
            style={{
              marginBlock: '.8rem -.6rem',
            }}
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Loading...' : 'Create Account'}
          </Button>
          <p>
            Already have an account? <Link to='/login'>Login</Link> here.
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
