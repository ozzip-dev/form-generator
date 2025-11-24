import * as d3 from "d3";

type DataObject = { value: number; label?: string };
type Props = {
  data?: DataObject[];
  width?: number;
  height?: number;
};

const BarChart = ({
  data = [],
  width = 250,
  height = 250,
}: Props) => {
  const total = data.map((a) => a.value).reduce((a, b) => a + b, 0);

  // margins so labels/ticks fit
  const margin = { top: 16, right: 12, bottom: 36, left: 36 };
  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);

  // X axis - labels (use empty string for missing labels)
  const x = d3
    .scaleBand()
    .range([0, innerWidth])
    .domain(data.map(({ label }, i) => label ?? String(i)))
    .padding(0.2);

  // Y axis - domain from 0 to max value (or 1 to avoid zero range)
  const maxValue = d3.max(data, (d) => d.value) ?? 0;
  const y = d3.scaleLinear().domain([0, Math.max(maxValue, 1)]).range([innerHeight, 0]);

  const color = d3.scaleOrdinal<string>().domain(data.map((_, i) => String(i))).range(d3.schemeTableau10 as string[]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Bar chart"
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {/* Y axis ticks (simple) */}
        {y.ticks(4).map((tickValue) => (
          <g key={tickValue} transform={`translate(0, ${y(tickValue)})`}>
            <line x1={0} x2={innerWidth} stroke="#e6e6e6" />
            <text x={-8} y={4} fontSize={10} textAnchor="end" fill="#666">
              {tickValue}
            </text>
          </g>
        ))}

        {/* Bars */}
        {data.map((d, i) => {
          const label = d.label ?? String(i);
          const xPos = x(label) ?? 0;
          const barHeight = innerHeight - y(d.value);
          const barWidth = x.bandwidth();
          const percent = total > 0 ? Math.round((d.value / total) * 100) : 0;
          return (
            <g key={i} transform={`translate(${xPos}, 0)`}>
              <rect
                x={0}
                y={y(d.value)}
                width={barWidth}
                height={barHeight}
                fill={color(String(i))}
                rx={4}
              />
              <text x={barWidth / 2} y={y(d.value) - 6} fontSize={11} textAnchor="middle" fill="#333">
                {percent}%
              </text>
              <text x={barWidth / 2} y={innerHeight + 14} fontSize={11} textAnchor="middle" fill="#333">
                {label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default BarChart;