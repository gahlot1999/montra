import { format } from 'date-fns';
import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useDeleteEmi } from '../../api/useEmi';
import Modal from '../../components/modal/Modal';
import { url } from '../../config/url';
import { formatCurrency } from '../../utils/helpers';
import styles from './styles/EmiCard.module.css';

function EmiCard({ emi }) {
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedEmiId, setSelectedEmiId] = useState('');
  const { deleteEmi, isEmiDeleting } = useDeleteEmi();
  return (
    <>
      <div>
        <div className={`${styles.emiCard} ${emi.isActive && styles.active}`}>
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
