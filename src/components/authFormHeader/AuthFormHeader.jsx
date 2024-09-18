import styles from './AuthFormHeader.module.css';
import logo from '../../assets/images/logo.jpeg';
import { useNavigate } from 'react-router-dom';

function AuthFormHeader(props) {
  const { title = 'title', description = 'description' } = props;
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <img
        src={logo}
        alt='logo'
        onClick={() => navigate(-1, { replace: true })}
      />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default AuthFormHeader;
