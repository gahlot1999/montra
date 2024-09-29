import styles from './BtnGroup.module.css';

function BtnGroup(props) {
  const { children, gap = '1rem', position = 'left', style } = props;
  return (
    <div
      className={styles.btnGroup}
      style={{
        justifyContent:
          position === 'left'
            ? 'flex-start'
            : position === 'right'
            ? 'flex-end'
            : 'center',
        gap,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default BtnGroup;
