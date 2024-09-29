import { useMutation, useQuery } from '@tanstack/react-query';
import { getRequest } from '../config/apiHelper';
import { url } from '../config/url';

export function useGetBudgets() {
  const { isLoading, data } = useQuery({
    queryKey: ['budgets'],
    queryFn: () => getRequest({ url: url.getBudget }),
  });

  return { isLoading, budgets: data?.data?.budgets };
}

export function useAddBudget() {
  useMutation;
}
