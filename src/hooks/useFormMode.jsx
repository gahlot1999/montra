import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

export default function useFormMode(paramName) {
  const { mode } = useParams();
  const [sParam] = useSearchParams();
  const id = sParam.get(paramName);
  const isAddMode = mode.includes('add');
  const isEditMode = mode.includes('edit');
  const isViewMode = mode.includes('view');

  return { isAddMode, isEditMode, isViewMode, id };
}
