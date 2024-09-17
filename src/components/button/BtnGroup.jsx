function BtnGroup(props) {
  const { children, gap = '1rem', position = 'left' } = props;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent:
          position === 'left'
            ? 'flex-start'
            : position === 'right'
            ? 'flex-end'
            : 'center',
        gap,
      }}
    >
      {children}
    </div>
  );
}

export default BtnGroup;
