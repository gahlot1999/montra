import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function AreaChartComponent(props) {
  const {
    data = [],
    height = 300,
    width = '100%',
    xAxisKey = 'name',
    xAxisLabelFormat,
    yAxisLabelFormat,
    area = [],
  } = props;
  return (
    <ResponsiveContainer width={width} height={height}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id='red' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='var(--clr-danger)' stopOpacity={0.8} />
            <stop offset='95%' stopColor='var(--clr-danger)' stopOpacity={0} />
          </linearGradient>
          <linearGradient id='green' x1='0' y1='0' x2='0' y2='1'>
            <stop
              offset='5%'
              stopColor='var(--clr-success)'
              stopOpacity={0.8}
            />
            <stop offset='95%' stopColor='var(--clr-success)' stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey={xAxisKey}
          axisLine={false}
          tickFormatter={(value) =>
            xAxisLabelFormat ? xAxisLabelFormat(value) : value
          }
        />
        <YAxis
          tickFormatter={(value) =>
            yAxisLabelFormat ? yAxisLabelFormat(value) : value
          }
          axisLine={false}
        />
        <Legend />
        <CartesianGrid strokeDasharray='4' opacity={0.2} />
        <Tooltip />
        {area?.map((area, i) => (
          <Area
            key={i}
            type='monotone'
            dataKey={area.dataKey}
            stroke={area.color}
            fill={area.fill}
            fillOpacity={0.2}
            dot={{ stroke: area.color, strokeWidth: 2 }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default AreaChartComponent;
