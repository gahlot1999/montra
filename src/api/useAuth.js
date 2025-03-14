import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getRequest, postRequest } from '../config/apiHelper';
import { url } from '../config/url';
import { toastError, toastSuccess } from '../utils/helpers';

export function useSignup() {
  const navigate = useNavigate();

  const { mutate, status } = useMutation({
    mutationFn: postRequest,
    onSuccess: (data) => {
      toastSuccess(data);
      if (data?.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('isAuthenticated', true);
        navigate('/home');
      }
    },
    onError: (err) => {
      localStorage.setItem('isAuthenticated', false);
      localStorage.removeItem('token');
      toastError(err);
    },
  });

  return {
    signup: mutate,
    status,
  };
}

export function useLogin() {
  const navigate = useNavigate();
  const { mutate, status } = useMutation({
    mutationFn: postRequest,
    onSuccess: (data) => {
      toastSuccess(data);
      if (data?.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('isAuthenticated', true);
        navigate('/home');
      }
    },
    onError: (err) => {
      localStorage.setItem('isAuthenticated', false);
      localStorage.removeItem('token');
      toastError(err);
    },
  });

  return {
    login: mutate,
    status,
  };
}

export function useValidateToken() {
  const reqUrl = url.validateToken;

  const { isLoading, data } = useQuery({
    queryKey: ['validateToken'],
    queryFn: () => getRequest({ url: reqUrl }),
    enabled: Boolean(
      localStorage.getItem('token') &&
        localStorage.getItem('isAuthenticated') === 'true',
    ),
    onSuccess: () => {
      localStorage.setItem('isAuthenticated', true);
      window.location = '/home';
    },
  });

  return { isLoading, message: data?.message };
}
