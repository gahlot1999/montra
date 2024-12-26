import { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { useDeleteCategory } from '../../api/useCategory';
import Modal from '../../components/modal/Modal';
import { url } from '../../config/url';
import styles from './styles/CategoryCard.module.css';

function CategoryCard(props) {
  const { category } = props;
  const { deleteCategory, isCategoryDeleting } = useDeleteCategory();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  function onDeleteCategory() {
    if (!selectedCategoryId || selectedCategoryId === '') return;

    deleteCategory(
      {
        url: `${url.deleteCategory}/${selectedCategoryId}`,
      },
      {
        onSuccess: () => {
          setDeleteModal(false);
          setSelectedCategoryId('');
        },
      },
    );
  }

  return (
    <>
      <div className={styles.container}>
        <h5>{category.name}</h5>
        <MdDeleteOutline
          size={21}
          className='deleteIcon'
          onClick={() => {
            setSelectedCategoryId(category._id);
            setDeleteModal(true);
          }}
        />
      </div>

      <Modal
        open={deleteModal}
        close={() => {
          setSelectedCategoryId('');
          setDeleteModal(false);
        }}
        title='Delete Category'
        confirmLabel={isCategoryDeleting ? 'Deleting...' : 'Delete'}
        confirmAction={onDeleteCategory}
        confirmDisabled={isCategoryDeleting}
      >
        Are you sure you want to delete this category?
      </Modal>
    </>
  );
}

export default CategoryCard;
