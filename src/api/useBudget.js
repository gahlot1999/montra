import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRequest, postRequest } from '../config/apiHelper';
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
    onError: (err) => {
      toastError(err);
    },
  });

  return {
    addBudget: mutate,
    status,
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

// {
//     "_id": "66ef036bae69cd45fc9788c9",
//     "user": "66ed85fc956ccffe56514876",
//     "name": "Sept - 24",
//     "month": "2024-09-21T17:33:31.231Z",
//     "amount": 40000,
//     "description": "40k(Salary)",
//     "__v": 0,
//     "expense": [
//         {
//             "_id": "66f798cd68cc0ef7c4b548bd",
//             "budget": "66ef036bae69cd45fc9788c9",
//             "name": "User Expense",
//             "amount": 17000,
//             "category": "User",
//             "paid": false
//         }
//     ],
//     "totalExpenses": 17000,
//     "totalSavings": 23000
// }