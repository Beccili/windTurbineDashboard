import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Typography } from "@mui/material";

function LineChart({ data }) {
  console.log("line chart data is ", data);
  data = data.map(r => r).sort((a, b) => a.ts.localeCompare(b.ts));
  console.log("after sort: ", data);
  /**
   * {"turbineId":"TURB-002",
   * ts":"2025-05-02T15:39:26.000Z",
   * "windSpeed":9.78,
   * "rpm":958,
   * "bearingTemp":56.5,
   * "vibration":1.34,
   * power":437
   * score: 0.0-1.0
   * severity: 1,2,3
   * fault: 0,1
   * }
   */
  return (
    <div style={{ height: "800px" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Sensor Data (Last 60s)
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="windSpeed"
            stroke="#8884d8"
            name="Wind Speed (m/s)"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="temperature"
            stroke="#82ca9d"
            name="Temperature (°C)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="vibration"
            stroke="#ffc658"
            name="Vibration (mm/s)"
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChart;
