import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import styles from './AppLayout.module.css';

function AppLayout() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.app}>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
