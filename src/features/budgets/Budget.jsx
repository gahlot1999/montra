import { format } from 'date-fns';
import { FaInfoCircle } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { IoMdAddCircle } from 'react-icons/io';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { useGetBudget } from '../../api/useBudget';
import BtnGroup from '../../components/button/BtnGroup';
import Button from '../../components/button/Button';
import SummaryCard from '../../components/card/SummaryCard';
import Container from '../../components/container/Container';
import Message from '../../components/message/Message';
import PageTitle from '../../components/pageTitle/PageTitle';
import Spinner from '../../components/spinner/Spinner';
import ExpenseCard from '../expenses/ExpenseCard';

function Budget() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const budgetId = searchParams.get('budgetId');
  const { isLoading, budget } = useGetBudget(budgetId);

  console.log(budget);

  if (isLoading) return <Spinner />;

  return (
    <Container>
      <PageTitle
        title={`${budget?.name} (${format(
          new Date(budget?.month),
          'MMM - yy',
        )})`}
        navigateTo='/montra/budgets'
        actions={
          <>
            <a className='budget-info'>
              <FaInfoCircle />
            </a>

            <FiEdit
              size={18}
              className='editIcon'
              onClick={() => {
                navigate(`/montra/editBudget?budgetId=${budgetId}`);
              }}
            />
          </>
        }
      >
        <BtnGroup>
          <Button
            variant='icon'
            onClick={() => {
              navigate(`addExpense?budgetId=${budgetId}`);
            }}
          >
            <IoMdAddCircle size={24} color='white' />
          </Button>
        </BtnGroup>
      </PageTitle>

      <SummaryCard
        total={budget?.amount}
        balance={budget?.totalSavings}
        expense={budget?.totalExpenses}
      />

      {!budget?.expense?.length ? (
        <Message
          title='No expenses found'
          message='Click below to get started'
          buttonText='Add Expense'
          buttonAction={() => navigate(`addExpense?budgetId=${budgetId}`)}
        />
      ) : (
        budget.expense.map((expense) => (
          <ExpenseCard key={expense._id} expense={expense} />
        ))
      )}

      <Tooltip anchorSelect='.budget-info'>
        <div style={{ maxWidth: '25rem' }}>{budget?.description}</div>
      </Tooltip>
    </Container>
  );
}
export default Budget;
