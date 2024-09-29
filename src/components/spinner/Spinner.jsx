import styles from './Spinner.module.css';
function Spinner({ height = '20rem' }) {
  return (
    <div
      className={styles.container}
      style={{
        minHeight: height,
      }}
    >
      <span className={styles.spinner}></span>
    </div>
  );
}

export default Spinner;
