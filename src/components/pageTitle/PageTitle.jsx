import { IoIosArrowBack } from 'react-icons/io';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import styles from './PageTitle.module.css';

function PageTitle(props) {
  const {
    title = 'Enter title prop',
    navigateTo,
    onClick,
    actions,
    children,
  } = props;
  const isMobile = useMediaQuery({ maxWidth: '500px' });
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
        <h4>{isMobile && title?.length > 15 ? title.slice(0, 15) : title}</h4>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}

export default PageTitle;
