import { DashboardCharts } from '@/components/dashboard/charts';
import { OverviewCards } from '@/components/dashboard/overview-cards';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-headline text-2xl font-bold">Dashboard</h1>
      <OverviewCards />
      <div className="mt-4">
        <DashboardCharts />
      </div>
    </div>
  );
}
