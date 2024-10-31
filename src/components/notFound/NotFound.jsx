import { useNavigate } from 'react-router';
// import Button from '../Elements/Button/Button';
import Button from '../button/Button';
import styles from './NotFound.module.css';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>404</h1>
        <p className={styles.title}>Page not found</p>
        <p className={styles.message}>
          The page you are looking for does not exist.
        </p>
        <div className={styles.btnGroup}>
          <Button
            variant='secondary'
            onClick={() => navigate(-1, { replace: true })}
          >
            Go back
          </Button>
          <Button onClick={() => navigate('/home', { replace: true })}>
            Go to home page
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
