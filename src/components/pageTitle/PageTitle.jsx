import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import styles from './PageTitle.module.css';

function PageTitle(props) {
  const { title = 'Enter title prop', navigateTo, onClick, children } = props;
  const navigate = useNavigate();

  function handleBack() {
    if (onClick) {
      onClick();
      return;
    }

    if (navigateTo) {
      navigate(navigateTo);
      return;
    }

    navigate(-1);
    return;
  }

  return (
    <div className={styles.container}>
      <div className={styles.pageTitle}>
        <IoIosArrowBack size={22} onClick={handleBack} />
        <h5>{title}</h5>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default PageTitle;
