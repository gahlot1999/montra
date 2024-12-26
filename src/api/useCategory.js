import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteRequest, getRequest, postRequest } from '../config/apiHelper';
import { url } from '../config/url';
import { toastError, toastSuccess } from '../utils/helpers';

export function useGetCategories() {
  const reqUrl = url.getCategories;
  const { isLoading, data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getRequest({ url: reqUrl }),
  });

  return { isLoading, categories: data?.data };
}

export function useAddCategory() {
  const client = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: postRequest,
    onSuccess: (data) => {
      client.invalidateQueries(['categories']);
      toastSuccess(data);
    },
    onError: (err) => {
      toastError(err);
    },
  });

  return {
    addCategory: mutate,
    isCategoryAdding: status === 'pending',
  };
}

export function useDeleteCategory() {
  const client = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: deleteRequest,
    onSuccess: () => {
      client.invalidateQueries(['categories']);
      toastSuccess('Category deleted');
    },
    onError: (err) => {
      toastError(err);
    },
  });

  return {
    deleteCategory: mutate,
    isCategoryDeleting: status === 'pending',
  };
}
