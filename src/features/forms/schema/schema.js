import { object, string } from 'yup';

export const categorySchema = object({
  name: string()
    .required('Category name is required')
    .min(3, 'Category name must be at least 3 characters long')
    .max(20, 'Category name must be at most 20 characters long'),
});

export const emiSchema = object({
  name: string()
    .required('EMI name is required')
    .min(3, 'EMI name must be at least 3 characters long')
    .max(20, 'EMI name must be at most 20 characters long'),
  description: string()
    .required('Description is required')
    .min(3, 'Description must be at least 3 characters long')
    .max(100, 'Description must be at most 100 characters long'),
  amount: string()
    .required('EMI amount is required')
    .min(1, 'EMI amount must be at least 1'),
  startMonth: string()
    .required('Start month is required')
    .test('valid-date', 'Enter valid date', (value) => {
      const [year] = value.split('-');
      return year.length === 4 && year > 2000;
    })
    .test(
      'start-before-end',
      'Start month must be before end month',
      function (value) {
        const { endMonth } = this.parent;
        if (value && endMonth) {
          return new Date(value) <= new Date(endMonth);
        }
        return true;
      },
    ),
  endMonth: string()
    .required('End month is required')
    .test('valid-date', 'Enter valid date', (value) => {
      const [year] = value.split('-');
      return year.length === 4 && year > 2000;
    })
    .test(
      'end-after-start',
      'End month must be after start month',
      function (value) {
        const { startMonth } = this.parent;
        if (value && startMonth) {
          return new Date(value) >= new Date(startMonth);
        }
        return true;
      },
    ),
});