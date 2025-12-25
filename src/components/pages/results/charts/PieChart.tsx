import * as d3 from "d3";

type DataObject = { value: number; label?: string };
type Props = {
  data?: DataObject[];
  width?: number;
  height?: number;
  innerRadius?: number;
};

const PieChart = ({
  data = [],
  width = 250,
  height = 250,
  innerRadius = 50,
}: Props) => {
  const radius = Math.min(width, height) / 2;
  const pie = d3.pie<DataObject>().value((d) => d.value);
  const pieData = pie(data);
  const arcGenerator = d3
    .arc<d3.PieArcDatum<DataObject>>()
    .innerRadius(innerRadius)
    .outerRadius(radius);

  const color = d3
    .scaleOrdinal<string>()
    .domain(pieData.map((_, i) => String(i)))
    .range(d3.schemeTableau10 as string[]);

  const total = data.map((a) => a.value).reduce((a, b) => a + b, 0);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Pie chart"
    >
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {pieData.map((d, i) => {
          const path = arcGenerator(d) ?? undefined;
          const [x, y] = arcGenerator.centroid(d);
          const { value, label } = d.data;
          const percentLabel =
            total > 0 ? `${Math.round((value / total) * 100)}%` : "0%";
          const text = label ? `${label}: ${percentLabel}` : percentLabel;

          return (
            <g key={i}>
              <path
                d={path}
                fill={color(String(i))}
                stroke="#fff"
                strokeWidth={1}
              />
              <text
                transform={`translate(${x}, ${y})`}
                fill="#fff"
                fontSize={12}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {text}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default PieChart;
