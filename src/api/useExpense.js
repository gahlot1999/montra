import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../config/apiHelper';
import { url } from '../config/url';
import { toastError, toastSuccess } from '../utils/helpers';

export function useAddExpense(budgetId) {
  const client = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: postRequest,
    onSuccess: (data) => {
      client.resetQueries({
        queryKey: ['budget', budgetId],
      });
      toastSuccess(data);
    },
    onError: (err) => {
      toastError(err);
    },
  });

  return {
    addExpense: mutate,
    status,
  };
}

export function useEditExpense(budgetId) {
  const client = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: putRequest,
    onSuccess: (data) => {
      client.resetQueries({
        queryKey: ['budget', budgetId],
      });
      toastSuccess(data);
    },
    onError: (err) => {
      toastError(err);
    },
  });

  return {
    editExpense: mutate,
    status,
  };
}

export function useDeleteExpense(budgetId) {
  const client = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: deleteRequest,
    onSuccess: () => {
      client.resetQueries({
        queryKey: ['budget', budgetId],
      });
      toastSuccess('Expense deleted successfully');
    },
    onError: (err) => {
      toastError(err);
    },
  });

  return {
    deleteExpense: mutate,
    status,
  };
}

export function useGetExpense(expId, budgetId, isEditMode) {
  const reqUrl = `${url.getExpense}/${budgetId}/expense/${expId}`;

  const { isLoading, isRefetching, data } = useQuery({
    queryKey: ['expense', expId],
    queryFn: () => getRequest({ url: reqUrl }),
    enabled: isEditMode,
  });

  return { isLoading, isRefetching, expense: data?.data };
}
