import styles from './SelectInput.module.css';

function SelectInput(props) {
  const {
    name = 'name',
    label = 'Provide label prop',
    placeholder = 'Provide placeholder prop',
    options = [],
    disabled = false,
    error,
    value,
    setValue = () => {},
    mandatory = true,
    valueKey = 'value',
    labelKey = 'label',
    ...rest
  } = props;

  return (
    <div className={styles.selectContainer}>
      <label htmlFor={name}>
        {label}
        {mandatory && <span>*</span>}
      </label>
      <select
        className={error ? styles.errorOutline : ''}
        name={name}
        id={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        {...rest}
      >
        <option value='' selected hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option[valueKey]} value={option[valueKey]}>
            {option[labelKey]}
          </option>
        ))}
      </select>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default SelectInput;
