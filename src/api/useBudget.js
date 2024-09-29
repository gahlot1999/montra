import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRequest, postRequest } from '../config/apiHelper';
import { url } from '../config/url';
import { toastError, toastSuccess } from '../utils/helpers';

export function useGetBudgets() {
  const { isLoading, data } = useQuery({
    queryKey: ['budgets'],
    queryFn: () => getRequest({ url: url.getBudget }),
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
    onError: (err) => {
      toastError(err);
    },
  });

  return {
    addBudget: mutate,
    status,
  };
}
