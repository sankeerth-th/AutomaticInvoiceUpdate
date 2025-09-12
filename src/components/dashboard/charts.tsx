'use client';

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChartTooltipContent } from '../ui/chart';

const inventoryTrendData = [
  { date: 'Jan', value: 86000 },
  { date: 'Feb', value: 92000 },
  { date: 'Mar', value: 105000 },
  { date: 'Apr', value: 110000 },
  { date: 'May', value: 124580 },
  { date: 'Jun', value: 122000 },
];

const vendorFrequencyData = [
    { vendor: "Southern Glazer's", deliveries: 18 },
    { vendor: "RNDC", deliveries: 22 },
    { vendor: "Breakthru", deliveries: 15 },
    { vendor: "Other", deliveries: 8 },
]

export function DashboardCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Inventory Value Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={inventoryTrendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Vendor Delivery Frequency (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
          <BarChart data={vendorFrequencyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="vendor" />
            <YAxis />
            <Tooltip
              cursor={{ fill: 'hsl(var(--muted))' }}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="deliveries" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
