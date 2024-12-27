import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../config/apiHelper';
import { url } from '../config/url';
import { toastError, toastSuccess } from '../utils/helpers';

export function useGetEmis() {
  const reqUrl = `${url.getEmis}?sort=-endMonth`;

  const { isLoading, data } = useQuery({
    queryKey: ['emis'],
    queryFn: () => getRequest({ url: reqUrl }),
  });

  return { isLoading, emis: data?.data };
}

export function useAddEmi() {
  const client = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: postRequest,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['emis'],
      });
      toastSuccess('EMI added successfully');
    },
    onError: (err) => {
      toastError(err);
    },
  });

  return {
    addEmi: mutate,
    isEmiAdding: status === 'pending',
  };
}

export function useEditEmi() {
  const client = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: putRequest,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['emis'],
      });
      toastSuccess('EMI updated successfully');
    },
    onError: (err) => {
      toastError(err);
    },
  });
  return {
    editEmi: mutate,
    isEmiEditing: status === 'pending',
  };
}

export function useDeleteEmi() {
  const client = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: deleteRequest,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['emis'],
      });
      toastSuccess('EMI deleted successfully');
    },
    onError: (err) => {
      toastError(err);
    },
  });

  return {
    deleteEmi: mutate,
    isEmiDeleting: status === 'pending',
  };
}
