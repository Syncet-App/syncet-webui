import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Sample data
const data = [
  { name: "00:00", download: 2.4, upload: 1.2 },
  { name: "02:00", download: 1.3, upload: 0.8 },
  { name: "04:00", download: 0.5, upload: 0.2 },
  { name: "06:00", download: 0.8, upload: 0.4 },
  { name: "08:00", download: 2.2, upload: 1.7 },
  { name: "10:00", download: 4.5, upload: 2.8 },
  { name: "12:00", download: 6.8, upload: 3.2 },
  { name: "14:00", download: 5.2, upload: 2.5 },
  { name: "16:00", download: 7.1, upload: 3.8 },
  { name: "18:00", download: 4.2, upload: 2.1 },
  { name: "20:00", download: 3.1, upload: 1.5 },
  { name: "22:00", download: 2.8, upload: 1.1 },
];

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/90 border border-divider p-2 rounded-lg text-xs">
        <p className="font-medium">{label}</p>
        <p className="text-cyan-500">Download: {payload[0].value} MB/s</p>
        <p className="text-fuchsia-500">Upload: {payload[1].value} MB/s</p>
      </div>
    );
  }

  return null;
};

export const BandwidthChart = () => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="downloadGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="uploadGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#d946ef" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#d946ef" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
          <XAxis 
            dataKey="name"
            tick={{ fill: "#888" }}
            axisLine={{ stroke: "#333" }}
            tickLine={{ stroke: "#333" }}
          />
          <YAxis 
            tick={{ fill: "#888" }}
            axisLine={{ stroke: "#333" }}
            tickLine={{ stroke: "#333" }}
            tickFormatter={(value: any) => `${value} MB/s`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="download"
            name="Download"
            stroke="#06b6d4"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
            fillOpacity={1}
            fill="url(#downloadGradient)"
          />
          <Line
            type="monotone"
            dataKey="upload"
            name="Upload"
            stroke="#d946ef"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
            fillOpacity={1}
            fill="url(#uploadGradient)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};