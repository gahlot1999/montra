import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRequest, postRequest } from '../config/apiHelper';
import { toastError, toastSuccess } from '../utils/helpers';

export function useAddExpense() {
  const client = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: postRequest,
    onSuccess: (data) => {
      client.invalidateQueries(['budget']);
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

export function useDeleteExpense() {
  const client = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: deleteRequest,
    onSuccess: () => {
      client.invalidateQueries(['budget']);
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
