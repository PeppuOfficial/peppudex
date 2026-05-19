"use client";

/**
 * PublicationTrendsChart · client-only recharts wrapper.
 *
 * Recharts uses SVG + ResponsiveContainer which need the DOM, so the
 * chart itself is a Client Component. The host /reports page stays a
 * Server Component and passes the data down as a prop.
 */

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Series {
  slug: string;
  name: string;
  counts: number[];
}

interface Props {
  years: number[];
  series: Series[];
}

/** Hard-coded pixel palette so each compound has a stable color across
 *  renders. 17 entries · matches the order in research-trends.json. */
const PALETTE: string[] = [
  "#FF6B9D",
  "#4FC3F7",
  "#FBC02D",
  "#9CCC65",
  "#BA68C8",
  "#F06292",
  "#66BB6A",
  "#FFB74D",
  "#4FAEDE",
  "#FF7043",
  "#26A69A",
  "#7E57C2",
  "#FFCA28",
  "#42A5F5",
  "#8D6E63",
  "#EC407A",
  "#5C6BC0",
];

export default function PublicationTrendsChart({ years, series }: Props) {
  const rows = years.map((y, i) => {
    const row: Record<string, number | string> = { year: y };
    for (const s of series) {
      row[s.name] = s.counts[i] ?? 0;
    }
    return row;
  });

  return (
    <div
      style={{
        background: "var(--paper)",
        border: "4px solid var(--ink)",
        boxShadow: "6px 6px 0 var(--shadow)",
        padding: "14px 14px 6px",
        marginTop: 18,
      }}
    >
      <ResponsiveContainer width="100%" height={460}>
        <LineChart
          data={rows}
          margin={{ top: 8, right: 24, left: 0, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1A1A2E22" />
          <XAxis
            dataKey="year"
            tick={{
              fontFamily: "var(--font-pixel), monospace",
              fontSize: 9,
              fill: "#1A1A2E",
            }}
          />
          <YAxis
            tick={{
              fontFamily: "var(--font-pixel), monospace",
              fontSize: 9,
              fill: "#1A1A2E",
            }}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              background: "#FFF8DC",
              border: "2px solid #1A1A2E",
              fontFamily: "var(--font-body), monospace",
              fontSize: 14,
            }}
            labelStyle={{ color: "#1A1A2E", fontWeight: 700 }}
          />
          <Legend
            wrapperStyle={{
              fontFamily: "var(--font-pixel), monospace",
              fontSize: 8,
              letterSpacing: "0.08em",
              paddingTop: 8,
            }}
          />
          {series.map((s, i) => (
            <Line
              key={s.slug}
              type="monotone"
              dataKey={s.name}
              stroke={PALETTE[i % PALETTE.length]}
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
