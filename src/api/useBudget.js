import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../config/apiHelper';
import { url } from '../config/url';
import { toastError, toastSuccess } from '../utils/helpers';

export function useGetBudgets() {
  const reqUrl = url.getBudgets;
  const { isLoading, data } = useQuery({
    queryKey: ['budgets'],
    queryFn: () => getRequest({ url: reqUrl }),
  });

  return { isLoading, budgets: data?.data?.budgets };
}

export function useAddBudget() {
  const client = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: postRequest,
    onSuccess: (data) => {
      client.invalidateQueries(['budgets']);
      toastSuccess(data);
    },
    onError: (err) => toastError(err),
  });

  return {
    addBudget: mutate,
    isBudgetAdding: status === 'pending',
  };
}

export function useEditBudget() {
  const { mutate, status } = useMutation({
    mutationFn: putRequest,
    onSuccess: (data) => {
      toastSuccess(data);
    },
    onError: (err) => toastError(err),
  });

  return {
    editBudget: mutate,
    isBudgetEditing: status === 'pending',
  };
}

export function useGetBudget(id) {
  const reqUrl = `${url.getBudget}/${id}`;

  const { isLoading, data } = useQuery({
    queryKey: ['budget', id],
    queryFn: () => getRequest({ url: reqUrl }),
    enabled: Boolean(id),
  });

  return { isLoading, budget: data?.data };
}

export function useDeleteBudget(id, navigate) {
  const reqUrl = `${url.deleteBudget}/${id}`;
  const client = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: () => deleteRequest({ url: reqUrl }),
    onSuccess: () => {
      client.resetQueries(['budgets']);
      toastSuccess('Budget deleted');
      navigate(-1, { replace: true });
    },
    onError: (err) => toastError(err),
  });

  return {
    deleteBudget: mutate,
    status,
  };
}
