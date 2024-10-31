import Box from '../../../components/box/Box';
import Container from '../../../components/container/Container';
import PageTitle from '../../../components/pageTitle/PageTitle';
import ExpenseForm from '../../../features/forms/expense/ExpenseForm';
import useFormMode from '../../../hooks/useFormMode';

function Expense() {
  const { id, isAddMode, isEditMode } = useFormMode('budgetId');
  return (
    <Container>
      <PageTitle title={`${isAddMode ? 'Add Expense' : 'Edit Expense'}`} />
      <Box>
        <ExpenseForm
          budgetId={id}
          isAddMode={isAddMode}
          isEditMode={isEditMode}
        />
      </Box>
    </Container>
  );
}

export default Expense;
