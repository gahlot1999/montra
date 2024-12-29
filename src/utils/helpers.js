import toast from 'react-hot-toast';

export function toastError(err) {
  if (typeof err === 'string') {
    toast.error(err);
    return;
  }

  if (err?.response?.data?.response?.message) {
    toast.error(err.response.data.response.message);
  } else if (err?.message) {
    toast.error(err.message);
  } else {
    toast.error('An error occurred');
  }
}

export function toastSuccess(data) {
  if (typeof data === 'string') {
    toast.success(data);
    return;
  }

  if (data?.message) {
    toast.success(data.message);
  } else {
    toast.success('Action performed successfully');
  }
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function generateRandomNumber(digits) {
  if (digits < 1) {
    console.log('Please enter a positive number of digits.');
    return;
  }
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  const randomNumber = Math.floor(min + Math.random() * (max - min + 1));
  return randomNumber;
}

export function currentMonthYear() {
  const today = new Date();
  return new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1));
}
