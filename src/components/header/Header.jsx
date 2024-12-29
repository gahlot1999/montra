import { FaCircleUser } from 'react-icons/fa6';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <h4 onClick={() => navigate('/home')}>/FinMate</h4>
      <div className={styles.navContainer}>
        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink to='/home'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/montra'>Montra</NavLink>
            </li>
          </ul>
        </nav>
        <FaCircleUser
          size={20}
          onClick={() => navigate('/login', { replace: true })}
        />
      </div>
    </header>
  );
}

export default Header;
