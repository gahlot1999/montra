import { differenceInCalendarMonths, format, isWithinInterval } from 'date-fns';
import { useMediaQuery } from 'react-responsive';
import { currentMonthYear } from '../../utils/helpers';
import EmiSummaryCard from './EmiSummaryCard';

function EmiSummary({ emis, selectedEmiIds }) {
  const isMobile = useMediaQuery({ maxWidth: '500px' });

  const emisWithSummary = emis
    ?.filter((emi) => selectedEmiIds.includes(emi._id))
    ?.map((emi) => {
      const { startMonth, endMonth, name, amount } = emi;

      const isEmiActive = isWithinInterval(currentMonthYear(), {
        start: startMonth,
        end: endMonth,
      });
      const duration = `${format(startMonth, 'MMM yyyy')} - ${format(
        endMonth,
        'MMM yyyy',
      )}`;
      const numOfEmis = differenceInCalendarMonths(endMonth, startMonth) + 1;
      const numOfEmisPaid = isEmiActive
        ? differenceInCalendarMonths(currentMonthYear(), startMonth)
        : 0;
      const numOfEmisLeft = numOfEmis - numOfEmisPaid;

      return {
        name,
        amount,
        duration,
        isEmiActive,
        numOfEmis,
        numOfEmisPaid,
        numOfEmisLeft,
        amountToBePaid: numOfEmis * amount,
        amountPaid: numOfEmisPaid * amount,
        amountLeft: numOfEmisLeft * amount,
        completed: ((numOfEmisPaid / numOfEmis) * 100).toFixed(2),
      };
    })
    ?.sort((a, b) => b.isEmiActive - a.isEmiActive);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `${isMobile ? '1fr' : '1fr 1fr'}`,
        gap: '1rem',
      }}
    >
      {emisWithSummary?.map((emi, i) => (
        <EmiSummaryCard key={i} emi={emi} />
      ))}
    </div>
  );
}

export default EmiSummary;
