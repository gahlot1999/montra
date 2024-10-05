import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import styles from './Message.module.css';

function Message({
  title,
  message,
  info,
  buttonText,
  buttonAction,
  variant,
  error = false,
}) {
  const navigate = useNavigate();

  const handleButtonClick =
    buttonAction || (() => navigate(-1, { replace: true }));

  return (
    <div className={`${styles.container} ${styles[variant] || ''}`}>
      <div
        className={`${styles.messageContainer} ${
          variant === 'full' ? styles.messageContainerFull : ''
        }`}
      >
        {title && <p className={styles.title}>{title}</p>}
        {message && (
          <p className={`${styles.message} ${error ? styles.error : ''}`}>
            {message}
          </p>
        )}
        {info && <p className={styles.info}>{info}</p>}
        {buttonText && (
          <Button variant='secondary' onClick={handleButtonClick}>
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Message;
