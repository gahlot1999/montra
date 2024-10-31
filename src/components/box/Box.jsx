import styles from './Box.module.css';

function Box({
  children,
  variant = 'standard',
  padding = '1rem 1.5rem',
  radius = '8px',
  style = {},
}) {
  return (
    <>
      {variant === 'standard' && (
        <div
          className={styles.box}
          style={{
            padding,
            borderRadius: radius,
            ...style,
          }}
        >
          {children}
        </div>
      )}
    </>
  );
}

export default Box;
