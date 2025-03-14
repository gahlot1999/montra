import { format } from 'date-fns';
import { useState } from 'react';
import { FcLineChart } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useGetBudgets } from '../../api/useBudget';
import BtnGroup from '../../components/button/BtnGroup';
import Button from '../../components/button/Button';
import AreaChartComponent from '../../components/charts/area/AreaChartComponent';
import Container from '../../components/container/Container';
import Message from '../../components/message/Message';
import Modal from '../../components/modal/Modal';
import PageTitle from '../../components/pageTitle/PageTitle';
import Spinner from '../../components/spinner/Spinner';
import { formatCurrency } from '../../utils/helpers';
import { BudgetCard } from './BudgetCard';

export default function Budgets() {
  const navigate = useNavigate();
  const { isLoading, budgets } = useGetBudgets();
  const [budgetsChartModel, setBudgetsChartModel] = useState(false);

  return (
    <>
      <Container>
        <PageTitle title='Budgets' navigateTo='/montra'>
          <BtnGroup>
            <Button
              variant='secondary'
              onClick={() => navigate('/montra/addBudget')}
            >
              Add Budget
            </Button>
            <Button
              variant='secondary'
              onClick={() => setBudgetsChartModel(true)}
            >
              <FcLineChart size={21} />
            </Button>
          </BtnGroup>
        </PageTitle>

        {isLoading ? (
          <Spinner />
        ) : !budgets?.length ? (
          <Message
            title='No budget found'
            message='Click below to get started'
            buttonText='Add Budget'
            buttonAction={() =>
              navigate('/montra/addBudget', { replace: true })
            }
          />
        ) : (
          budgets.map((budget) => (
            <BudgetCard key={budget._id} budget={budget} />
          ))
        )}
      </Container>

      <Modal
        open={budgetsChartModel}
        close={() => setBudgetsChartModel(false)}
        title='Budgets Overview'
        footerDisabled
      >
        <AreaChartComponent
          data={budgets
            ?.map((budget) => ({
              month: format(new Date(budget.month), 'MMM yyyy'),
              Budget: budget.amount,
              Expense: budget.totalExpenses,
            }))
            ?.sort((a, b) => new Date(a.month) - new Date(b.month))}
          xAxisKey='month'
          yAxisLabelFormat={(value) => formatCurrency(value)}
          area={[
            {
              dataKey: 'Budget',
              color: 'var(--clr-success)',
              fill: 'url(#green)',
            },
            {
              dataKey: 'Expense',
              color: 'var(--clr-danger-2)',
              fill: 'url(#red)',
            },
          ]}
        />
      </Modal>
    </>
  );
}
