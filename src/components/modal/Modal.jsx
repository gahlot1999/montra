import { createPortal } from 'react-dom';
import { IoIosCloseCircle } from 'react-icons/io';
import useClickOutside from '../../hooks/useClickOutside';
import BtnGroup from '../button/BtnGroup';
import Button from '../button/Button';
import styles from './Modal.module.css';

function Modal(props) {
  const {
    children,
    open = false,
    close = () => {},
    title = 'Enter title prop',
    description,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    confirmAction = () => {},
    cancelAction = close,
    confirmDisabled = false,
    footerDisabled = false,
  } = props;

  const ref = useClickOutside(close);

  return createPortal(
    <div className={`${styles.overlay} ${open ? styles.open : ''}`}>
      <div
        className={`${styles.container} ${open ? styles.open : ''}`}
        ref={ref}
      >
        <div className={styles.modal}>
          <div className={styles.header}>
            <div>
              <h5>{title}</h5>
              <p>{description}</p>
            </div>
            <IoIosCloseCircle size={26} onClick={close} />
          </div>
          <div className={styles.body}>{children}</div>
          {!footerDisabled && (
            <div className={styles.footer}>
              <BtnGroup position='right'>
                <Button variant='secondary' onClick={cancelAction}>
                  {cancelLabel}
                </Button>
                <Button
                  variant='secondary'
                  disabled={confirmDisabled}
                  onClick={confirmAction}
                >
                  {confirmLabel}
                </Button>
              </BtnGroup>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;