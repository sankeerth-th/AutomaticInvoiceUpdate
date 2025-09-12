import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-headline text-2xl font-bold">Observability & Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle>Admin Control</CardTitle>
          <CardDescription>This section is for administrators only.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg min-h-[300px]">
            <BarChart className="h-12 w-12 text-muted-foreground" />
            <h2 className="mt-4 text-xl font-semibold">System Metrics & Logs</h2>
            <p className="mt-2 text-muted-foreground font-code">
              View structured logs, system metrics (OCR accuracy, latency), and export reports.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}