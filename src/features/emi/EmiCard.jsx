import { format, isBefore } from 'date-fns';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useDeleteEmi } from '../../api/useEmi';
import Modal from '../../components/modal/Modal';
import { url } from '../../config/url';
import { currentMonthYear, formatCurrency } from '../../utils/helpers';
import styles from './styles/EmiCard.module.css';

function EmiCard({ emi, selectedEmiIds, setSelectedEmiIds }) {
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedEmiId, setSelectedEmiId] = useState('');
  const { deleteEmi, isEmiDeleting } = useDeleteEmi();

  return (
    <>
      <div>
        <div className={`${styles.emiCard} ${emi.isActive && styles.active}`}>
          <input
            type='checkbox'
            name='paid'
            className={styles.checkbox}
            onChange={() => {
              const isEmiEnded = isBefore(emi.endMonth, currentMonthYear());

              if (isEmiEnded) {
                toast.error('EMI tenure is already completed.');
                return;
              }

              setSelectedEmiIds((prevState) =>
                prevState.includes(emi._id)
                  ? prevState.filter((id) => id !== emi._id)
                  : [...prevState, emi._id],
              );
            }}
            checked={selectedEmiIds.includes(emi._id)}
          />
          <div className={styles.details}>
            <p className={styles.name}>{emi.name}</p>
            <p className={styles.description}>{emi.description}</p>
          </div>
          <p className={styles.amount}>{formatCurrency(emi.amount)}</p>
          <div className={styles.actions}>
            <FiEdit
              size={18}
              className='editIcon'
              onClick={() => {
                navigate(`editEmi?emiId=${emi._id}`, {
                  state: emi,
                });
              }}
            />

            <MdDeleteOutline
              size={21}
              className='deleteIcon'
              onClick={() => {
                setSelectedEmiId(emi._id);
                setDeleteModal(true);
              }}
            />
          </div>
        </div>

        <div className={styles.emiMetaData}>
          <p>
            Start: <span>{format(new Date(emi.startMonth), 'MMM - yy')}</span>
          </p>

          <p>
            End: <span>{format(new Date(emi.endMonth), 'MMM - yy')}</span>
          </p>
        </div>
      </div>

      <Modal
        open={deleteModal}
        close={() => {
          setSelectedEmiId('');
          setDeleteModal(false);
        }}
        title='Delete EMI'
        confirmLabel={isEmiDeleting ? 'Deleting...' : 'Delete'}
        confirmAction={() => {
          const reqUrl = `${url.deleteEmi}/${selectedEmiId}`;
          deleteEmi({ url: reqUrl });
        }}
        confirmDisabled={isEmiDeleting}
      >
        Are you sure you want to delete this EMI?
      </Modal>
    </>
  );
}

export default EmiCard;
