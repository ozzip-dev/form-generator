// import * as d3 from "d3";
// import { InputType } from "@/enums";
// import { isInputTypeCheckbox } from "@/helpers/inputHelpers";
// import { FormInput } from "@/types/input";

// type DataObject = { value: number; label?: string };
// type Props = {
//   data?: DataObject[];
//   width?: number;
//   height?: number;
//   type?: InputType;
// };

// const BarChart = ({ data = [], width = 350, height = 200, type }: Props) => {
//   const total = data.map((a) => a.value).reduce((a, b) => a + b, 0);

//   const isPercent = !isInputTypeCheckbox({ type } as FormInput);

//   const margin = { top: 16, right: 12, bottom: 36, left: 36 };
//   const innerWidth = Math.max(0, width - margin.left - margin.right);
//   const innerHeight = Math.max(0, height - margin.top - margin.bottom);

//   const x = d3
//     .scaleBand()
//     .range([0, innerWidth])
//     .domain(data.map(({ label }, idx) => label ?? String(idx)))
//     .padding(0.2);

//   const maxValue = d3.max(data, (d) => d.value) ?? 0;
//   const y = d3
//     .scaleLinear()
//     .domain([0, Math.max(maxValue, 1)])
//     .range([innerHeight, 0]);

//   const color = d3
//     .scaleOrdinal<string>()
//     .domain(data.map((_, idx) => String(idx)))
//     .range(d3.schemeTableau10 as string[]);

//   return (
//     <svg
//       width={width}
//       height={height}
//       viewBox={`0 0 ${width} ${height}`}
//       role="img"
//       aria-label="Bar chart"
//     >
//       <g transform={`translate(${margin.left}, ${margin.top})`}>
//         {y.ticks(4).map((tickValue) => (
//           <g key={tickValue} transform={`translate(0, ${y(tickValue)})`}>
//             <line x1={0} x2={innerWidth} stroke="#e6e6e6" />
//             <text x={-8} y={4} fontSize={10} textAnchor="end" fill="#666">
//               {tickValue}
//             </text>
//           </g>
//         ))}

//         {data.map((d, i) => {
//           const label = d.label ?? String(i);
//           const xPos = x(label) ?? 0;
//           const barHeight = innerHeight - y(d.value);
//           const barWidth = x.bandwidth();
//           const percent = total > 0 ? Math.round((d.value / total) * 100) : 0;
//           const text = `${percent}%`;
//           // const text = isPercent ? `${percent}%` : d.value; // TODO
//           return (
//             <g key={i} transform={`translate(${xPos}, 0)`}>
//               <rect
//                 x={0}
//                 y={y(d.value)}
//                 width={barWidth}
//                 height={barHeight}
//                 fill={color(String(i))}
//                 rx={4}
//               />
//               <text
//                 x={barWidth / 2}
//                 y={y(d.value) - 6}
//                 fontSize={11}
//                 textAnchor="middle"
//                 fill="#333"
//               >
//                 {text}
//               </text>
//               {/* <text
//                 x={barWidth / 2}
//                 y={innerHeight + 14}
//                 fontSize={11}
//                 textAnchor="middle"
//                 fill="#333"
//               >
//                 {label}
//               </text> */}
//             </g>
//           );
//         })}
//       </g>
//     </svg>
//   );
// };

// export default BarChart;

import * as d3 from "d3";

type DataObject = { value: number; label?: string };

type Props = {
  data?: DataObject[];
  width?: number;
  height?: number;
};

const HorizontalBarChart = ({
  data = [],
  width = 450,
  height = 250,
}: Props) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  const margin = { top: 16, right: 24, bottom: 32, left: 120 };
  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);

  const maxValue = d3.max(data, (d) => d.value) ?? 0;

  // 🔹 Skala X – wartości (poziomo)
  const x = d3
    .scaleLinear()
    .domain([0, Math.max(maxValue, 1)])
    .range([0, innerWidth]);

  // 🔹 Skala Y – kategorie (pionowo)
  const y = d3
    .scaleBand()
    .domain(data.map((d, i) => d.label ?? String(i)))
    .range([0, innerHeight])
    .padding(0.2);

  const color = d3
    .scaleOrdinal<string>()
    .domain(data.map((_, i) => String(i)))
    .range(d3.schemeTableau10 as string[]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Horizontal bar chart"
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {/* 🔹 Siatka pionowa */}
        {x.ticks(4).map((tickValue) => (
          <g key={tickValue} transform={`translate(${x(tickValue)}, 0)`}>
            <line y1={0} y2={innerHeight} stroke="#e6e6e6" />
            <text
              y={innerHeight + 14}
              fontSize={10}
              textAnchor="middle"
              fill="#666"
            >
              {tickValue}
            </text>
          </g>
        ))}

        {/* 🔹 Słupki */}
        {data.map((d, i) => {
          const label = d.label ?? String(i);
          const percent = total > 0 ? Math.round((d.value / total) * 100) : 0;

          return (
            <g key={i} transform={`translate(0, ${y(label) ?? 0})`}>
              {/* pasek */}
              <rect
                x={0}
                y={0}
                width={x(d.value)}
                height={y.bandwidth()}
                fill={color(String(i))}
                rx={4}
              />

              {/* procent */}
              <text
                x={x(d.value) + 6}
                y={y.bandwidth() / 2}
                dominantBaseline="middle"
                fontSize={11}
                fill="#333"
              >
                {percent}%
              </text>

              {/* etykieta po lewej */}
              <text
                x={-8}
                y={y.bandwidth() / 2}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize={11}
                fill="#333"
              >
                <div className="text-lg">{label}</div>
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default HorizontalBarChart;
