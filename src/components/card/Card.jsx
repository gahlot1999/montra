import styles from './Card.module.css';

function Card(props) {
  const { title = 'Enter title prop', Icon, onClick = () => {} } = props;
  return (
    <div className={styles.card} onClick={onClick}>
      {Icon && (
        <div className={styles.icon}>
          <Icon />
        </div>
      )}
      <p className={styles.title}>{title}</p>
    </div>
  );
}

export default Card;
