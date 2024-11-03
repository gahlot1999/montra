import Box from '../../components/box/Box';
import Container from '../../components/container/Container';
import PageTitle from '../../components/pageTitle/PageTitle';
import useFormMode from '../../hooks/useFormMode';
import BudgetForm from '../forms/budget/BudgetForm';

function AddEditBudget() {
  const { id, isAddMode, isEditMode } = useFormMode('budgetId');
  return (
    <Container>
      <PageTitle title={isAddMode ? 'Add Budget' : 'Edit Budget'} />
      <Box>
        <BudgetForm
          budgetId={id}
          isAddMode={isAddMode}
          isEditMode={isEditMode}
        />
      </Box>
    </Container>
  );
}

export default AddEditBudget;
