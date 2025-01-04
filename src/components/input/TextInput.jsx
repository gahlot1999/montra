import styles from './TextInput.module.css';

function TextInput(props) {
  const {
    theme = 'dark',
    name = 'name',
    type = 'text',
    label = 'Provide label prop',
    placeholder,
    disabled = false,
    error,
    value,
    setValue = () => {},
    mandatory = true,
    ...rest
  } = props;

  const themeStyles = theme === 'dark' ? styles.dark : styles.light;

  return (
    <div className={`${styles.inputContainer} ${themeStyles}`}>
      <label htmlFor={name}>
        {label}
        {mandatory && <span>*</span>}
      </label>
      <input
        className={error && styles.errorOutline}
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        autoComplete='off'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        {...rest}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default TextInput;
