import { object, string } from 'yup';

export const categorySchema = object({
  name: string()
    .required('Category name is required')
    .min(3, 'Category name must be at least 3 characters long')
    .max(20, 'Category name must be at most 20 characters long'),
});
