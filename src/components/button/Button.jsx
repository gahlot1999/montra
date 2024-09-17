import styles from './Button.module.css';

function Button(props) {
  const { children, onClick, variant = 'primary', disabled = false } = props;
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles[variant]}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
